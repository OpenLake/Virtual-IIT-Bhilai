extends KinematicBody2D

export var speed = 10  #export function help to change the value directly from the editor

onready var char_sprite = get_node("char_sprite")
var velocity = Vector2.ZERO
var direction = Vector2(1,0)
const ACCELERATION = 300
const FRICTION = 500
const MAX_SPEED = 10000

func set_idle_animation():
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
		direction = Vector2(1,0)  #setting the vector direction value
		velocity = direction * speed  #calculating the valocity
		char_sprite.animation = "run_right"
	#if user pressed left movement button
	elif Input.is_action_pressed("ui_left"):
		direction = Vector2(-1,0)
		velocity = direction * speed
		char_sprite.animation = "run_left";
	#if user pressed up movement button
	elif Input.is_action_pressed("ui_up"):
		direction = Vector2(0,-1)
		velocity = direction * speed
		char_sprite.animation = "run_forward";
	#if user pressed down movement button
	elif Input.is_action_pressed("ui_down"):
		direction = Vector2(0,1)
		velocity = direction * speed
		char_sprite.animation = "run_back";
	else:
		velocity = Vector2.ZERO
		set_idle_animation()
	
	#prebuilt function for moving a object of a kinematic body type	
	move_and_collide(velocity * delta)
	
	pass
	
	
	
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
