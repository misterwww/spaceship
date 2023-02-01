// license

      /*    
        @licstart  The following is the entire license notice for the 
        JavaScript code in this page.

        Copyright (C) 2022,2023  misterwww,mrbonjour

        The JavaScript code in this page is free software: you can
        redistribute it and/or modify it under the terms of the GNU
        General Public License (GNU GPL) as published by the Free Software
        Foundation, either version 3 of the License, or (at your option)
        any later version.  The code is distributed WITHOUT ANY WARRANTY;
        without even the implied warranty of MERCHANTABILITY or FITNESS
        FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

        As additional permission under GNU GPL version 3 section 7, you
        may distribute non-source (e.g., minimized or compacted) forms of
        that code without the copy of the GNU GPL normally required by
        section 4, provided you include this license notice and a URL
        through which recipients can access the Corresponding Source.   


        @licend  The above is the entire license notice
        for the JavaScript code in this page.
        */


// AUDIO

let fire = new Audio();
let background_music = new Audio();
background_music.addEventListener('ended', function() 
    {
    this.currentTime = 0;
    this.play();
    }, false);
background_music.play();


// IMAGES

let ship_img = new Image();
let plasma_img = new Image();
let enemy_0_img = new Image();
let enemy_1_img = new Image();
let enemy_2_img = new Image();
let miniplanet_0_img = new Image();
let miniplanet_1_img = new Image();
let miniplanet_2_img = new Image();
let miniplanet_3_img = new Image();
let miniplanet_4_img = new Image();

// VARIABLES (global)

//game vars
let power = 100;
let score = 0;
let plasma_units = 1000;
//own ship
let x = (640 / 2) - ( 64 / 2);
let y = 480 - 64 - 16;
//plasma
let counter_plasmas = -1;
let fire_x;
let fire_y;
let array_plasmas = new Array();

//enemys array in class variables
let counter_enemys = -1;
let random_enemy_type = Math.floor(Math.random() * 3);
let random_x_enemy = Math.floor(Math.random() * (640-64));
let random_y_enemy = -64;
let array_enemys = new Array();

//enemys array in main loop variables
let random_interval_new_enemy = 1000 + Math.floor(Math.random() * 5000);


//planets
let counter_planets = -1;
let x_planet = 320;
let y_planet = 0;
let type_planet = 0;
let size_planet = 100;
let array_planets = new Array();

//planets array in main loop variables
let random_interval_new_planet = 2 + Math.floor(Math.random() * 100);

//current arrays:
//current_enemy_array_move_to_draw
let current_enemy_array_move_to_draw = 0;
//current_planet_array_move_to_draw
let current_planet_array_move_to_draw = 0;

// intermitent base counter mod 2 message for player
let intermitent_base = 1;
let intermitent_message = true;


// CLASS ENEMY

class enemy
	{
	constructor( counter_enemys ) 
		{
		this.counter_enemys = counter_enemys;
		this.random_enemy_type = Math.floor(Math.random() * 3);
		this.random_x_enemy = Math.floor(Math.random() * (640-64));
		this.random_y_enemy = -64;
		}
    update_values_enemys()
		{
		return( this.counter_enemys, this.random_enemy_type, this.random_x_enemy, this.random_y_enemy );		
		}		
	update_values_enemys;
	}


// CLASS PLASMA

class plasma
	{
	constructor( counter_plasmas,x,y ) 
		{
		this.counter_plasmas = counter_plasmas;
		this.fire_x = x + ( 64 / 2 ) - ( 8 / 2 );
		this.fire_y = y - 3;
		}
	values_own_plasmas()
		{
		return( this.counter_plasmas, this.fire_x, this.fire_y );
		}
	values_own_plasmas;
	}

// CLASS Move down planets, stars and galaxys while own starship moves up

class planet
	{
	constructor( counter_planets ) 
		{
		this.counter_planets = counter_planets;
		this.x_planet=Math.floor(Math.random() * 640);
		this.y_planet = -100;
		this.size_planet=Math.floor(Math.random() * 30);
		this.type_planet=Math.floor(Math.random() * 5);
		}
    update_values_planets()
		{
		return( this.counter_planets, this.x_planet, this.y_planet, this.size_planet, this.type_planet );
		}
	update_values_planets;
	}

// PRELOAD IMAGES

addLoadEvent(preloader);

function preloader() 
    {
    //images
    window.requestAnimationFrame(draw);	
    if (document.images) 
        {
        ship_img.setAttribute("src", "ship.png");
		plasma_img.setAttribute("src", "plasma.png");
	    enemy_0_img.setAttribute("src", "ship-enemy_0.png");
	    enemy_1_img.setAttribute("src", "ship-enemy_1.png");
	    enemy_2_img.setAttribute("src", "ship-enemy_2.png");
	    miniplanet_0_img.setAttribute("src", "miniplanet0.png");
	    miniplanet_1_img.setAttribute("src", "miniplanet1.png");
	    miniplanet_2_img.setAttribute("src", "miniplanet2.png");
	    miniplanet_3_img.setAttribute("src", "miniplanet3.png");
	    miniplanet_4_img.setAttribute("src", "miniplanet4.png");
	    }
	//audio
    window.requestAnimationFrame(draw);	
    if (document.images) 
        {
        fire.setAttribute("src", "fire_mod.ogg");
        background_music.setAttribute("src", "mega.ogg");
	    }
    }

function addLoadEvent(func) 
    {	
	let oldonload = window.onload;
	if (typeof window.onload != 'function') 
        {
		window.onload = func;
	    } 
    else 
        {
    	window.onload = function() 
            {
			if (oldonload) 
                {
				oldonload();
			    }
			func();
		    }
    	}
    }

// CANVAS
const canvas = document.getElementById('canvas');
if (canvas.getContext) 
    {
    var ctx = canvas.getContext('2d');
    }

// KEYBOARD:

// ON PRESS

document.onkeydown = checkKeyDown;

function checkKeyDown(e) 
    {
    if ( e.keyCode == '37' && x > 0) //left
        {
		x = x - 40;
        }
    if ( e.keyCode == '39' && x < (640-64)) //right
        { 
        x = x + 40;
        }
    if ( e.keyCode == '90' ) //z attack/fire/plasma
        {
		counter_plasmas++;
		plasma_units--;
		fire_x = x;
		fire_y = y - 5;
		array_plasmas[counter_plasmas] = new plasma( counter_plasmas, fire_x, fire_y );
		fire.play();
        }   
    }

document.onkeyup = checkKeyUp;

// ON RELASE
function checkKeyUp(e) 
    {
    if (e.keyCode == '37') //left cursor
        {
		  
        }
    if (e.keyCode == '39') //right cursor
        { 

        }
    if (e.keyCode == '90') //z attack/fire/plasma
        {

        }
    }

function new_enemy()
    {
   	let random_interval_new_enemy = 1000 + Math.floor(Math.random() * 4000);
    counter_enemys = counter_enemys + 0.1;
	if( counter_enemys % 1 == 0)
		{
    	array_enemys[counter_enemys] = new enemy(counter_enemys);
		}
	setTimeout(new_enemy, random_interval_new_enemy);
    }

function new_planet()
    {
    counter_planets++;
    array_planets[counter_planets] = new planet( counter_planets );
    let random_interval_new_planet = 50 + Math.floor(Math.random() * 500);
    setTimeout(new_planet, random_interval_new_planet);
    }

function update_values_enemys()
	{
    let random_velocity_y_enemy = 1 + Math.floor(Math.random() * 6);
   	let move_x_enemy = Math.floor(Math.random() * 60);
   	//enemy x left
   	if ( move_x_enemy < 30 && (array_enemys[current_enemy_array_move_to_draw].random_x_enemy - move_x_enemy ) > 0  )
   	    {
   	    array_enemys[current_enemy_array_move_to_draw].random_x_enemy = array_enemys[current_enemy_array_move_to_draw].random_x_enemy - move_x_enemy;
        }
    //enemy x right
  	if ( move_x_enemy > 29 && (array_enemys[current_enemy_array_move_to_draw].random_x_enemy + move_x_enemy ) < (640-64) )
  	    {
   	    array_enemys[current_enemy_array_move_to_draw].random_x_enemy = array_enemys[current_enemy_array_move_to_draw].random_x_enemy + move_x_enemy - 30;
        }
    //enemy y
    array_enemys[current_enemy_array_move_to_draw].random_y_enemy =  array_enemys[current_enemy_array_move_to_draw].random_y_enemy + random_velocity_y_enemy;
	//return( array_enemys[current_enemy_array_move_to_draw].random_x_enemy, array_enemys[current_enemy_array_move_to_draw].random_y_enemy );
	}	

function update_values_planets()//directe
	{
    //planet y
    array_planets[current_planet_array_move_to_draw].y_planet++;
	//return( array_planets[current_planet_array_move_to_draw].y_planet );
	}

function draw() 
    {
	// remove last frame
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 640, 480);

	// planets (in galaxy)
    if ( counter_planets == -1 )
		{
     	new_planet();
		}
	if ( counter_planets > -1)
		{
	    for ( let i = counter_planets; i > -1; i-- )
	   		{ 
	   		if ( array_planets[i].y_planet < 480 ) 
	   		    {
	   		    // draw all existing planets on screen
	   		    if ( array_planets[i].type_planet == 0 )
	   		    ctx.drawImage( miniplanet_0_img,0,0,100,75, array_planets[i].x_planet, array_planets[i].y_planet,array_planets[i].size_planet,array_planets[i].size_planet );
	   		    if ( array_planets[i].type_planet == 1 )
	   		    ctx.drawImage( miniplanet_1_img,0,0,100,71, array_planets[i].x_planet, array_planets[i].y_planet,array_planets[i].size_planet,array_planets[i].size_planet );
	 		    if ( array_planets[i].type_planet == 2 )
	   		    ctx.drawImage( miniplanet_2_img,0,0,100,71, array_planets[i].x_planet, 	array_planets[i].y_planet,array_planets[i].size_planet,array_planets[i].size_planet );
	  		    if ( array_planets[i].type_planet == 3 )
	   		    ctx.drawImage( miniplanet_3_img,0,0,100,71, array_planets[i].x_planet, array_planets[i].y_planet,array_planets[i].size_planet,array_planets[i].size_planet );
			    if ( array_planets[i].type_planet == 4 )
	   		    ctx.drawImage( miniplanet_4_img,0,0,100,71, array_planets[i].x_planet, array_planets[i].y_planet,array_planets[i].size_planet,array_planets[i].size_planet );
  		    	//update values
				array_planets[i].y_planet++;
	    		}
	    	}
		}

    // draw screen enemys if are existing and own ship are in galaxy
	if ( intermitent_message == false && counter_enemys > -1)
		{ 
	    for ( let i = Math.trunc(counter_enemys); i > -1; i-- )
			{ 
			if ( array_enemys[i].random_y_enemy < 480 ) 
			    {
			    // draw all existing enemys on screen
			    if ( array_enemys[i].random_enemy_type == 0 )
		   		    ctx.drawImage( enemy_0_img,0,0,64,64, array_enemys[i].random_x_enemy, array_enemys[i].random_y_enemy,64,64 );
 			    if ( array_enemys[i].random_enemy_type == 1 )
		   		    ctx.drawImage( enemy_1_img,0,0,64,64, array_enemys[i].random_x_enemy, array_enemys[i].random_y_enemy,64,64 );  		 
 			    if ( array_enemys[i].random_enemy_type == 2 )
		   		    ctx.drawImage( enemy_2_img,0,0,64,64, array_enemys[i].random_x_enemy, array_enemys[i].random_y_enemy,64,64 );
  		    //update values
 		    let random_velocity_y_enemy = 1 + Math.floor(Math.random() * 6);
   			let move_x_enemy = Math.floor(Math.random() * 60);
   			//enemy x left
   			if ( move_x_enemy < 30  )
		   	    {
   	    		array_enemys[Math.trunc(counter_enemys)].random_x_enemy = array_enemys[Math.trunc(counter_enemys)].random_x_enemy - move_x_enemy;
		        }
		    //enemy x right
  			if ( move_x_enemy > 29 &&  array_enemys[Math.trunc(counter_enemys)].random_x_enemy < (640-64) )
  	    		{
   	    		array_enemys[Math.trunc(counter_enemys)].random_x_enemy = array_enemys[Math.trunc(counter_enemys)].random_x_enemy + move_x_enemy - 30;
        		}
    		//enemy y
    		array_enemys[Math.trunc(counter_enemys)].random_y_enemy =  array_enemys[Math.trunc(counter_enemys)].random_y_enemy + random_velocity_y_enemy;
   		    }
		}

   	// draw screen plasmas if are existing
	if (counter_plasmas > -1)
   	for ( let i = counter_plasmas; i > -1; i-- )
		{
		// draw all next plasmas
		if (array_plasmas[i].fire_y < -20 && plasma_units > 0) 
			{ 
			array_plasmas[i].fire_y = array_plasmas[i].fire_y - 6
 			ctx.drawImage( plasma_img,0,0,8,16, array_plasmas[i].fire_x, array_plasmas[i].fire_y,8,16 );}
			}
		}

    // draw spaceship
    ctx.drawImage(ship_img, 0, 0, 64, 64, x, 480-64-5, 64, 64)

	// if own ship are in galaxy (drawing planets zone), player missage intermitent
	intermitent_base = intermitent_base + 0.2;
	if (intermitent_base > 139 && intermitent_message == true )
		{
		intermitent_message = false;
		new_enemy();  	
		}
	else if ( Math.trunc(intermitent_base) % 2 == 0 && intermitent_base < 140 && intermitent_message == true )
		{
		ctx.fillStyle = 'red';
   		ctx.font = '55px Courrier';
   		ctx.fillText("You are near galaxy:", 70, 220);
		ctx.fillStyle = 'yellow';
   		ctx.font = '55px Courrier';
		ctx.fillText("Warning! Caution! Alert!", 30, 280);
		}
	else if ( Math.trunc(intermitent_base) % 1 == 0 && intermitent_base <140 && intermitent_message == true )
		{
		ctx.fillStyle = 'yellow';
   		ctx.font = '55px Courrier';
   		ctx.fillText("You are near galaxy:", 70, 220);
		ctx.fillStyle = 'red';
   		ctx.font = '55px Courrier';
		ctx.fillText("Warning! Caution! Alert!", 30, 280);
		}

	// set and print text up fixed
    ctx.fillStyle = 'white';
    ctx.font = '30px Courrier';
    ctx.fillText("Arcade spaceships game (matamarcianos)", 10, 25);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'lightgreen';
    ctx.fillText("power of armor: " + power + "%", 10, 50);
    ctx.fillStyle = 'lightblue';
    ctx.fillText("plasma: " + plasma_units + " units", 10, 75);
    ctx.fillStyle = 'yellow';
    ctx.fillText("score: " + score, 10, 100);
   	}

setInterval(draw, 20);

