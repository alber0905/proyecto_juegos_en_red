# proyecto_juegos_en_red
 

## Nombre del juego:
	PANG

## Descripción del juego:
	El objetivo del juego es explotar unas bolas que se mueven por la pantalla.
	Los personajes cuentan con armas de fuego para ir rompiendo las bolas. 
	Por cada impacto de un disparo en una de estas bolas, estas se dividen en dos bolas más pequeñas.
	Cuando las bolas adquieren un determinado tamaño, dejan de dividirse y desaparecen.
	El objetivo principal del juego es acabar con las bolas sin que estas toquen a los personajes.
	Si una bola toca un personaje, este perderá una vida.
	Nuestra idea es implementar el juego como un multijugador con puntuaciones, vidas, potenciadores y modificadores de armas.

	Video referencia: https://www.youtube.com/watch?v=rlsx9yrr2-w
	
 ## Demostración:
 https://youtu.be/RF21_ai4pIk
 

## Integrantes del grupo:
    - Alberto Blanco Barrios, a.blancoba@alumnos.urjc.es, github: alber0905
    - Jesús Téllez Serrano, j.tellezs@alumnos.urjc.es, github: jetese
    - Eva María Pérez Fernández, em.perezfe@alumnos.urjc.es, github: leeavemeal0ne

## Trello
    https://trello.com/b/yFTcqMEk/juegos-en-red


## Sprites
https://www.spriters-resource.com/arcade/superpang/

## Pantallas

### Menú principal

Es un menú en el que se puede seleccionar si jugar de forma local, buscar una sala o ver la tabla de puntuaciones. 
Está implementada con una página HTML, ayudado con estilos de css y bootstrap. 
![alt text](/pang_online/screenshots/menuprincipal.png)

### Pantalla buscar sala 
Aquí es donde un jugador podrá crear una partida online, o unirse a la de otro (ahora mismo no hacen nada los botones).
![alt text](/pang_online/screenshots/seleccionsala.png)

### Pantalla de juego
Es la pantalla en la que transcurre el tiempo de juego. Está implementada mediante Phaser en el archivo pang.js.
El juego consiste en 3 elementos principales:
- Los personajes controlables, que pueden moverse por la pantalla y disparar.
- Las plataformas, contra las que colisionan las balas de los personajes y las bolas.
- Las bolas, que rebotan contra las plataformas y si colisionan con un jugador le quitan una vida.

Además de estos elementos, existen dos tipos de balas: 
- El gancho, que es el arma principal, y la bala láser, que se activa al coger un potenciador de tipo estrella.

![alt text](/pang_online/screenshots/partida.png)

## Pantalla puntuaciones

Aquí aparece la leaderboard de puntuaciones, que se guardan al final de la partida. La tabla de puntuaciones se actualiza
teniendo en cuenta dichas puntuaciones, por medio de API REST.
![alt text](/pang_online/screenshots/puntuacion.png)

## Documentación del protocolo utilizado sobre websockets

El jugador establece una conexión al introducirse en alguna de las salas. Al elegir una sala, la partida comienza una vez los dos jugadores se encuentren dentro de la misma. El primer jugador que entra actúa como host de la sala, y una vez que entra,
se generan las plataformas, que serán las mismas para el segundo jugador que entre a la sala. Durante la partida,
mediante los websockets abiertos se envía información en tiempo real sobre posición de los jugadores, si se ha disparado o no, si alguno de los jugadores tiene powerups que cambie los disparos, la generación de bolas y las colisiones.

### Tipos de mensajes
En el juego hay tres tipos de mensajes que se gestionan mediante websockets:
- El primer tipo de mensaje es el que se envía cuando se conecta un jugador impar, que será host, y por tanto el servidor le manda un mensaje indicándole que es el host.
- El segundo tipo de mensaje se envía cuando dos jugadores se emparejan, y se les envía un json indicándoles que puede comenzar la partida. En este momento el servidor espera unos segundos para asegurarse de que los dos jugadores han cargado la página correctamente.
- El tercer tipo de mensaje es el que se manda durante el juego, y contiene datos como la posición del jugador, de las bolas, etc. El servidor recibe un mensaje de un jugador y se lo manda a su pareja de forma íntegra. Estos mensajes se llaman en varios sitios.
	- En el update: Mandando cada frame la posición de las bolas, de los jugadores y si un jugador ha disparado.
	- En eventos específicos, como cuando un jugador dispara, muere o coge un powerUp. En estos eventos solo se manda la posición del jugador y lo que ha sucedido en el evento particular.

### Interpretación de los mensajes en javascript
El cliente puede ser host o cliente. Dependiendo de si es uno u otro se ejecutará un Update distinto y se mandarán mensajes distintos. Por ejemplo: el jugador host manda la posición de las bolas en cada fotograma y el jugador cliente no lo hace. El jugador cliente interpreta estas posiciones cada vez que las recibe, y el jugador host no lo hace.


## Diagrama de Flujo
Para la última parte de la práctica, no se ha modificado el diagrama de flujo 
![alt text](/pang_online/screenshots/Diagrama_de_flujo.png)

## Diagrama de clases del servidor

En verde está el @Controller, en azul el @service y en rojo el archivo js que utiliza la API REST.
Se ha añadido la clase que gestiona los sockets.

![alt text](/pang_online/screenshots/Diagrama_de_clases_server.PNG)

## Guia para la ejecucción del programa

Instalar Java Se

Ejecutar el servidor en Servidor/target/pang_online_server.jar

Para entrar en la página, escribir la url localhost:8090
