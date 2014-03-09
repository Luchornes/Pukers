var io = require("socket.io").listen(8080);

//NumeroDePartida = 0;

PlayersNumber = 0;

PlayerData = [];

CountDown_Timer = 0;

io.sockets.on("connection", function (client)
{
	
	client.on("Join", function(conectionData)
	{
		
		if(PlayersNumber < 2)
		{
			
			//Vestimenta
			//CountDown     *
			//Gameplay			
			
			PlayersNumber += 1;
			
			//agarrarlo en el lado del jugador a la que se conecte
			client.send("AssignPlayerName," + PlayersNumber.toString());
			
			if(PlayersNumber == 2)
			{
				// Send Avatar Equipment
				
				intervals = setInterval(function(){start_Countdown()}, 1000);
				
			}
		}
		
		else
		{
			client.send("Alguien esta intentando acceder");
		}
		
	});
	
	
	
	client.on("AssignOponentsEquipment", function(avatarEquipment)
	{
		
		var temp = new Array();
			temp = avatarEquipment.split(" ");
			
			io.sockets.send("vestirAlEnemigo," + temp[0] + "," + temp[1] + "," + temp[2] + "," + temp[3] + "," + temp[4]);
		
	});
	
	
	client.on("Puke", function(pukeData)
	{
		
		var temp = new Array();
			temp = pukeData.split(" ");
			
			io.sockets.send("Atack," + temp[0] + "," + temp[1] + "," + temp[2]);
		
	});
	
	
	client.on("disconnect", function(data)
	{
		
		client.send("Jugador Desconectado");	
		
		client.leave(data);
	});
	
	function start_Countdown()
	{
		
		CountDown_Timer += 1;
		
		io.sockets.send("Contador," + CountDown_Timer);
		
		
		if(CountDown_Timer == 1)
		{
			//Retrive equipment
			//client.send("emitEquipment");
			io.sockets.send("emitEquipment");
		}
		
		if(CountDown_Timer == 8)
		{
			//Destroy timer
			clearInterval(intervals);
		}
	}
	
	
});