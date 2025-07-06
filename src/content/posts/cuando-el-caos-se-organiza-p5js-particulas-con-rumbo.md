---
title: "Cuando el caos se organiza: P5js particulas con rumbo "
tagline: Perlin noise, código y un toque de curiosidad.
promt: Vector fields generados con codigo en p5js
thumbnail: ""
author: by Israel paucar
refe:
  - link: https://editor.p5js.org/israelprb/sketches/-goaT-EC6
    author: Vector Flow by Israel Paucar
time-read: 5
date: 2025-07-05 21:15
tags:
  - javaScript
  - p5.js
  - vector
  - flow
  - for
  - creative
  - coding
  - perlin
  - noise
  - partículasa
  - arte
  - digital
---
<div class="w-full aspect-video">
  <iframe 
    src="https://editor.p5js.org/israelprb/full/-goaT-EC6" 
    class="w-full h-full border-0"
    allowfullscreen
  ></iframe>
</div>

Resultó ser más largo de lo que creía, así que he decidido darle el protagonismo que corresponde a cada ejemplo, separándolos en distintas entradas.

Justo aquí arriba tenemos un ejemplo basado en **Perlin noise**, que genera esas líneas tan interesantes que dibujan el flujo o movimiento de un ruido orgánico.

Acá dejo el código completo por si quieren revisarlo.

```javascript
let noiseScale = 1500;
let noiseStrength = 4;
let loc, dir, speed, vel;
let tail = 6;
let num = 2000;
let particles = [num];

function setup() {
  createCanvas(400, 400);
  background("#22259F");
  for(let i = 0; i<num; i++){
    let loc = createVector(random(width*1.2), random(height),2);
    var angle = 0;
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.5, 20);
    particles[i] = new Particle(loc, dir, speed);
  }
  for(let j=0; j<tail;j++){
    for(let i=0; i<particles.length;i++){
      particles[i].run();
    }
  }
}

class Particle{
  constructor(_loc, _dir, _speed){
    this.loc = _loc;
    this.dir = _dir;
    this.speed= _speed;
  }
  
  run() {
    this.move();
    this.update();
  }
  move(){
    let angle = noise(this.loc.x/noiseScale,this.loc.y/noiseScale)*TWO_PI*noiseStrength;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    vel = this.dir.copy();
    vel.mult(this.speed);
  }
  update(){
    strokeCap(PROJECT)
    if(random()>.6){
      stroke("#55A5FF")
      strokeWeight(random(.2,2))
      
    }else{
      stroke("#A2EA00");
      strokeWeight(1);
    }
    
    beginShape();
      vertex(this.loc.x,this.loc.y);
      this.loc.add(vel);
    vertex(this.loc.x,this.loc.y);
    endShape();
  }
}
```

## Entrando en Tema

Interesante acercamiento. Si no entendiste nada de código y estás acá solo para curiosear, voy a hacer una explicación lo menos técnica posible. Aunque, realmente, te recomiendo que, si querés sacarle el jugo a toda esta info, te animes a investigar cómo funciona el *creative coding*, sobre todo en **Processing** y **p5.js**, que serían prácticamente lo mismo.

Bien, arranquemos explicando la parte vital de nuestro script.

```javascript
class Particle{
  constructor(_loc, _dir, _speed){
    this.loc = _loc;
    this.dir = _dir;
    this.speed= _speed;
  }
  
  run() {
    this.move();
    this.update();
  }
  move(){
    let angle = noise(this.loc.x/noiseScale,this.loc.y/noiseScale)*TWO_PI*noiseStrength;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    vel = this.dir.copy();
    vel.mult(this.speed);
  }
  update(){
    strokeCap(PROJECT)
    if(random()>.6){
      stroke("#55A5FF")
      strokeWeight(random(.2,2))
      
    }else{
      stroke("#A2EA00");
      strokeWeight(1);
    }
    
    beginShape();
      vertex(this.loc.x,this.loc.y);
      this.loc.add(vel);
    vertex(this.loc.x,this.loc.y);
    endShape();
  }
}
```

Para entenderlo un poco mejor, definimos una clase llamada **Particle**, donde vamos a guardar nuestros vectores y su información de posición, orientación y magnitud. Dentro de la clase, le asignamos distintos pasos:

## Move ()

```javascript
move() {
  let angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale) * TWO_PI * noiseStrength;
  this.dir.x = cos(angle);
  this.dir.y = sin(angle);
  vel = this.dir.copy();
  vel.mult(this.speed);
}
```

Cada vez que una de nuestras partículas es colocada aleatoriamente en el canvas principal, se genera una posición **x, y** en el espacio. Con esa información, lo que hacemos es muestrear el *noise* en ese lugar y obtener un valor.

Una vez extraído, lo guardamos en la variable **angle** y calculamos un ángulo usando las funciones **cos()** y **sin()**:

```javascript
this.dir.x = cos(angle);
this.dir.y = sin(angle);
```

Para no modificar la información que guardamos en **dir**, la copiamos en nuestra variable **vel** y la multiplicamos por nuestra variable **speed**, que nos da la magnitud del vector.

De esta forma, cada partícula obtiene una dirección diferente, basada en el campo de Perlin noise, y se mueve en consecuencia sobre el canvas.

*Nota: Multiplicar por **TWO_PI** convierte el valor del noise (entre 0 y 1) en un ángulo que va de 0 a 360 grados, y **noiseStrength** controla cuánta variación queremos en las direcciones.*

## Update ()

En resumidas cuentas, acá definimos el tipo de **stroke** que queremos para nuestras líneas y dibujamos cada segmento formado por dos vectores:

**Posición actual → (Posición actual + Velocidad)**

De esta manera, tenemos dos puntos en el espacio que se unen mediante una línea, como si estuviéramos trabajando en Illustrator.\

Es decir, dibujamos una línea que va desde la posición actual de la partícula hasta la nueva posición, obtenida al sumar el vector de velocidad. Esto genera la sensación de movimiento continuo y direccional en el canvas.

```javascript
beginShape();
  vertex(...);
  this.loc.add(vel);
  vertex(...);
endShape();
```

## Dibujar en el Canvas

¡Buena! Ahora que tenemos nuestra clase creada, tenemos que llamarla en nuestro canvas con valores aleatorios. Para eso usamos un for, que procesa el código varias veces hasta que se cumple la condición, que en este caso es el número de partículas que queremos.

```javascript
let noiseScale = 1500;
let noiseStrength = 4;
let loc, dir, speed, vel;
let tail = 6;
let num = 2000;
let particles = [num];

function setup() {
  createCanvas(400, 400);
  background("#22259F");
  for(let i = 0; i<num; i++){
    let loc = createVector(random(width*1.2), random(height),2);
    var angle = 0;
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.5, 20);
    particles[i] = new Particle(loc, dir, speed);
  }
  for(let j=0; j<tail;j++){
    for(let i=0; i<particles.length;i++){
      particles[i].run();
    }
  }
}
```

El programa ejecutará tantas iteraciones como indiquemos en esa variable. Como ven, hemos creado un array, que es, a simple vista, una caja que guarda muchas cajas más.

Para calcular cada iteración de nuestro array, usamos un for, que no es más que un ciclo (loop) que se repite hasta cumplir una condición. En nuestro caso, esa condición es repetir el proceso para cada una de nuestras n partículas. Dentro del loop creamos cada partícula, le asignamos una posición aleatoria, un ángulo 0, una dirección (que en este caso también es 0), y una velocidad aleatoria entre 0.5 y 30, que será el multiplicador de nuestra posición.

```javascript
 particles[i] = new Particle(loc, dir, speed); 
```

Guardamos toda esa información en particles\[i]. Como mencionamos antes, repetimos esto hasta completar la cantidad de espacios que asignamos a la variable num cuando la creamos.

En el siguiente for lo que hacemos es tomar esa información, procesarla con los siguientes pasos de nuestro código y dibujarla en pantalla.

```javascript
for(let j=0; j<tail;j++){
    for(let i=0; i<particles.length;i++){
      particles[i].run();
    }
  }
```

¿Por qué hay un for dentro de otro for? Bueno, pensémoslo así: vamos a crear una línea por cada partícula. Entonces, añadiendo un for por encima de nuestro primer for, creamos una línea nueva donde terminó la anterior, haciendo más largo el “trail” de nuestro vector flow.

¡Y pum! El resultado es más que interesante: se forman patrones muy orgánicos y atractivos. Esto sucede porque, al usar este método, los valores tienen coherencia con sus vecinos, por lo que obtenemos resultados con apariencia natural y fluida.

## ¡Buen trabajo!

Creo que es tiempo de subirle el nivel a esto e ir por una versión en Houdini. Sé que es mucha información hasta ahora, pero si vamos poco a poco, vamos a ver lo poderosos que pueden llegar a ser estos conceptos y cómo podemos crear efectos increíbles.
