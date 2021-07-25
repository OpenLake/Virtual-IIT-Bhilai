extends KinematicBody2D

export var enemy_mode = false
export var speed = 10  #export function help to change the value directly from the editor

onready var control = get_parent()
onready var char_sprite = get_node("char_sprite")

var velocity = Vector2.ZERO
var direction = Vector2(1,0)
var moving = false

const ACCELERATION = 300
const FRICTION = 500
const MAX_SPEED = 10000

func set_as_enemy(payload):
	enemy_mode = true
	position = payload["position"]
	char_sprite.animation = payload["animation"]


func set_idle_animation():
	print(direction)
	if direction.x == 1:
		char_sprite.animation = "idle_right"
	elif direction.x == -1:
		char_sprite.animation = "idle_left"
	elif direction.y == 1:
		char_sprite.animation = "idle_back"
	elif direction.y == -1:
		char_sprite.animation = "idle_top"


#this physics function will be called every frame(in this case every 1/60 seconds)
func _physics_process(delta):
	#if user pressed right movement button
	if Input.is_action_pressed("ui_right"):
		control.client.emit_signal("hello")
		moving = true
		direction = Vector2(1,0)  #setting the vector direction value
		velocity = direction * speed  #calculating the valocity
		char_sprite.animation = "run_right"
		move_and_collide(velocity * delta)
		send_move_signal()
	#if user pressed left movement button
	elif Input.is_action_pressed("ui_left"):
		moving = true
		direction = Vector2(-1,0)
		velocity = direction * speed
		char_sprite.animation = "run_left";
		move_and_collide(velocity * delta)
		send_move_signal()
	#if user pressed up movement button
	elif Input.is_action_pressed("ui_up"):
		moving = true
		direction = Vector2(0,-1)
		velocity = direction * speed
		char_sprite.animation = "run_forward";
		move_and_collide(velocity * delta)
		send_move_signal()
	#if user pressed down movement button
	elif Input.is_action_pressed("ui_down"):
		moving = true
		direction = Vector2(0,1)
		velocity = direction * speed
		char_sprite.animation = "run_back";
		move_and_collide(velocity * delta)
		send_move_signal()
		
	else:
		if moving == true:
			moving = false
			velocity = Vector2.ZERO
			set_idle_animation()
			send_move_signal()
#		set_idle_animation()
	#prebuilt function for moving a object of a kinematic body type	
#	move_and_collide(velocity * delta)
	
func send_move_signal():
	control.data["x"] = self.position.x
	control.data["y"] = self.position.y
	control.data["animation"] = char_sprite.animation
	get_parent().send({"mes":"move_enemy","info":control.data});	
	
	
#	var input_vector = Vector2.ZERO
#	input_vector.x = Input.get_action_strength("ui_right") - Input.get_action_strength("ui_left")
#	input_vector.y = Input.get_action_strength("ui_down") - Input.get_action_strength("ui_up")
#
#	input_vector = input_vector.normalized() # to fix diagonal speed
#
#	if input_vector != Vector2.ZERO:
#		velocity += input_vector * ACCELERATION * delta
#		velocity = velocity.clamped(MAX_SPEED * delta)
#	else:
#		velocity = velocity.move_toward(Vector2.ZERO, FRICTION * delta)
#
#	move_and_collide(velocity * delta)
