extends Node2D

export var socket_url = "ws://127.0.0.1:5000"

onready var enemy_model = preload("res://Enemies/enemy.tscn")



var enemy = preload("res://Enemies/enemy.tscn")
var enemies = {}
var connected = false
var initiate = false
var data = {
	"x":40,
	"y":40,	
	"id":0,
	"name":"player",
	"animation":"idle_right"
	
}

var client = WebSocketClient.new()
signal hello

onready var note = Node2D.new()


func _ready():
	client.add_user_signal("hello")
	data["position"] = $Player.position
	
	pass

		
func _physics_process(delta):
	if connected == true:
		if initiate == false:
			var message = {"mes":"enemy_added",
							"info":data
				} 
			if (client.get_peer(1).put_packet(JSON.print(message).to_utf8())) == OK:
				initiate = true
		client.poll()


func on_connection_closed():
#	print("connection_closed")
	set_process(false)
	
func _notification(what):
	if what == MainLoop.NOTIFICATION_WM_QUIT_REQUEST:
		var message = {"mes":"enemy_deleted",
							"info":data
				} 
		send(message)
#		client.get_peer(1).put_packet(JSON.print(message).to_utf8())	
		client.disconnect_from_host(1000, str(data["id"]))
	
func on_connection_error():
#	print("connection_error")
	set_process(true)
	
	
func on_connection_established(proto = ""):
	pass
	
	
func on_data_recieved():
	var payload = JSON.parse(client.get_peer(1).get_packet().get_string_from_utf8()).result
#	print(payload)
	if payload["mes"] == "initiate":
		for data in payload["info"]:
			set_enemy(payload["info"][data])
		return 
			
	if payload["info"]["id"] == data["id"]:
		return
	else:
		perform(payload)
		
		
func send(pack):
	client.get_peer(1).put_packet(JSON.print(pack).to_utf8())


func perform(payload):
#	print(payload["mes"])
#	print(payload["mes"] == "enemy_added")
	if payload["mes"] == "enemy_added":
		set_enemy(payload["info"])
	elif payload["mes"] == "enemy_deleted":
		delete_enemy(payload["info"])
	elif payload["mes"] == "move_enemy":
		set_enemy_pos(payload["info"])
	pass

func delete_enemy(payload):
	enemies[payload["id"]].queue_free()
	enemies.erase(payload["id"])

func set_enemy_pos(payload):
	enemies[payload["id"]].position.x = payload["x"]
	enemies[payload["id"]].position.y = payload["y"]
	enemies[payload["id"]].get_node("char_sprite").animation = payload["animation"]

func set_enemy(payload):
	var new_enemy = enemy_model.instance()
	add_child(new_enemy)
#	print(payload);
	enemies[payload["id"]] = new_enemy
	new_enemy.position.x = payload["x"]
	new_enemy.position.y = payload["y"]
	new_enemy.get_node("Label").text = str(payload["id"])
	new_enemy.get_node("char_sprite").animation = payload["animation"]
