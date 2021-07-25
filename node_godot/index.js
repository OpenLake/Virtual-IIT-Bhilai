let ws = require('ws');

var server = new ws.Server({ port: 5000 });

let player_data = {};

server.on("connection", client => {

    console.log("someone joined");
    client.send(JSON.stringify({ "mes": "initiate", "info": player_data }));
    

    client.on("hello",message=>
    {
        console.log("client say hello");
    });

    client.on("message", message => {
        let data = JSON.parse(message);

        console.log("recieved message from " + data.info.id);

        var clients = server.clients;
        for (let item of clients.keys()) {
            item.send(message);
        }
        player_data[data["info"]["id"]] = data["info"];
        // if (data["mes"] === "enemy_added") {
        //     player_data[data["info"]["id"]] = data["info"];
        // }
        if (data["mes"] === "enemy_deleted")
        {
            delete player_data[data["info"]["id"]];
        }

    });

    client.on("close", (code, reason) => {
        console.log("leaved session ",code, reason);

        var clients = server.clients;
        for (let item of clients.keys()) {
        }

        
    })
});