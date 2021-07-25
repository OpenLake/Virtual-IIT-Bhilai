extends ColorRect

onready var control = get_parent()
onready var roll_number = get_node("roll_enter");
onready var player_name = get_node("name_enter");





func _on_done_pressed():
	control.data["id"] = roll_number.value
	control.data["name"] = player_name.text
	control.get_node("Player").get_node("Label").text = str(roll_number.value)
	control.client.connect('hello',self,'client_says_hello')
	control.client.connect('connection_closed', control, 'on_connection_closed')
	control.client.connect('connection_error', control, 'on_connection_error')
	control.client.connect('connection_established', control, 'on_connection_established')
	control.client.connect('data_received',control, 'on_data_recieved')
	var err = (control.client.connect_to_url(control.socket_url))
	print(err)
	if err != OK:
		print("unable to connect")
	else:
		visible = false
		control.connected = true
		get_parent().get_node("Player").get_node("Camera2D").current = true
	pass 

func client_says_hello():
	print("client syas hello")

func _on_exit_pressed():
	pass 
