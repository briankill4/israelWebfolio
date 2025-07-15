---
title: Cuando el caos se organiza:Simulando particulas en un microcontrolador
tagline: Construyendo Flow Fields en una Raspberry Pi
promt: Imagen de una pantalla oled usada para el proyecto dibujando Vector Trails
thumbnail: /uploads/img_4822.gif
author: Israel paucar
refe:
  - link: https://en.wikipedia.org/wiki/Raspberry_Pi
    author: From Wikipedia - Raspberry pi
  - link: https://www.elecrow.com/blog/the-differences-between-raspberry-pi-pico-and-arduino.html
    author: Elecrow - The differences between Raspberry Pi Pico and Arduino
  - link: https://github.com/ScientistaMado/Micropython_Raspberry_Pi_Pico_w/tree/main
    author: MicroPython -  repositorio
  - link: https://github.com/robert-hh/SH1106/blob/master/sh1106.py
    author: sh1106 librería Pantalla Oled
time-read: 5
date: 2025-07-14 15:32
tags:
  - raspberry
  - pi
  - vector
  - fields
  - micropython
  - python
  - microcontrolador
  - creative
  - coding
  - art
---
<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1101629300?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Vector trails - raspberry pi pico"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

Ahora el reto es más grande porque no tengo mucho conocimiento de cómo llevarlo a cabo. 

Desde hace algún tiempo he estado experimentando con estos dispositivos pequeños: Raspberry Pi, Arduino y ESP32.

![Tipos de Microcontroladres](/uploads/microcontroladores_opciones.jpg "Microcontroladores")

No lo tengo muy claro, pero he descubierto algunas cosas.

Mi primer intento fue con un Arduino Uno. Arduino utiliza una versión simplificada de C++ —es decir, un lenguaje amigable para facilitar el trabajo con este dispositivo—, lo que lo hace eficiente.

El gran problema aparece con su capacidad de procesamiento. Aunque el Arduino Uno es un dispositivo increíblemente eficiente (más aún con C++), las librerías para controlar pantallas no suelen estar preparadas para proyectos con cálculos complejos como Perlin noise. Quizás esas operaciones no tienen mucho sentido para usos funcionales típicos.

![Arduino Microcontrolador](/uploads/arduino-uno.jpg "Arduino Microcontrolador")

Hice algunas pruebas y logré desplazar un conjunto de líneas de forma sinusoidal, pero no es nuestro objetivo. Nosotros necesitamos Perlin noise.

![Arduino Uno Sin offset animation](/uploads/arduino-anim-sin.jpg "Arduino Uno ")

<div class="w-full aspect-video mt-2 mb-2">
  <iframe
    class="w-full h-full"
    src="https://www.youtube.com/embed/IAzw2O1Z1yQ"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

Sin embargo, estamos limitados por la potencia del Arduino y por el lenguaje: aunque eficiente, al ser tan bajo nivel, es complejo de entender.

No lo pensé más y decidí cambiar de dispositivo. Buscando un poco, encontré algo más “potente” y aún más pequeño: **Raspberry Pi Pico  W**.

![Raspeberry Pi pico w Image](/uploads/rp-pi-pico-2-w.jpg "Raspeberry Pi pico w Image")

Este dispositivo es más versátil y sencillo de usar, ya que permite programar en Python. De todas las opciones que investigué, la que mejor se adaptaba a mi estilo fue MicroPython en Thonny, y lo mejor: todo es software libre, algo muy interesante.

**MicroPython** es una implementación optimizada de Python para microcontroladores con recursos limitados, como la Pico.

**Thonny** es un IDE diseñado para Python. Permite conectar la Raspberry Pi Pico vía USB y cargar scripts escritos en MicroPython directamente al dispositivo. 

A diferencia de Arduino, donde el IDE compila el código a C/C++ y lo transforma, resultando complejo recuperar el código si no lo guardas, en MicroPython escribes el script directamente y puedes recuperarlo del microcontrolador si no lo guardaste localmente.

![Displays para microcontroladores](/uploads/displays_for_microcontrollers.jpg "Displays")

En cuanto a la pantalla, hay varios dispositivos clásicos muy famosos para proyectos con microprocesadores, pero el que creo que mejor funciona por precio, funcionalidad y tamaño es la **OLED de 1,3 pulgadas con driver SH1106**.

![OLED de 1,3 pulgadas con driver SH1106](/uploads/oled_1.3_sh1106.jpg "OLED de 1,3 pulgadas con driver SH1106")

Su resolución es de 128×64 y ofrece un brillo excelente.

Tiene una desventaja: solo dispone de dos estados, encendido y apagado, pero esto le da una característica intrínseca **vintage**, ideal para nuestro objetivo.

## ¡Manos a la obra!

Nunca había programado en Python, salvo algunas cosas simples o copiar código, pero estoy casi seguro de que la lógica de nuestro código no debe ser tan distinta de lo que ya hemos hecho en Houdini y Processing.

No queremos plantearlo puramente en Python (aunque podríamos), pero estoy seguro de que ya existe alguna herramienta que nos puede facilitar las cosas. 

Bueno, vamos con lo primero. Vamos a necesitar una librería que nos permita controlar o dibujar en nuestra pantalla. Sabemos que usa un controlador SH1106, así que empecé la búsqueda por ahí y me topé con el trabajo de:

```less
# Copyright (c) 2016 Radomir Dopieralski (@deshipu),
#               2017-2021 Robert Hammelrath (@robert-hh)
#               2021 Tim Weber (@scy)
```

y su driver MicroPython SH1106 OLED driver. Lo mejor de todo es que incluye una librería gráfica para generar gráficos como líneas, pintar píxeles, etc., lo cual es muy ventajoso.
El siguiente ingrediente de nuestra receta es lograr tener un **Perlin noise en 2D**.

Para esto estuve buscando en foros, pero la información es muy específica y confusa. Así que me puse a conversar con ChatGPT, y en su puntería estadística logró sintetizar un código que me ayudó muchísimo.

Pero no me quedé ahí. Le pedí que me explicara de dónde había sacado cada parte, y bueno… al final les dejo las fuentes, porque no se lo inventó. Lo que hizo fue seguir la lógica de **Ken Perlin**, el creador de la técnica, traducirla y adaptarla a mis necesidades, lo cual me parece sorprendente.

¡Sin más, gracias, Chat!

Cuando me fijo en la fecha de publicación de estos archivos, me pregunto:

*¿Esta gente escribía todo esto hace 15 años?*

Yo estaba en la secundaria, sufriendo ataques adolescentes en ese momento… ¿¡por qué no me dediqué a leerlos!? Jaja.

Chat también me había propuesto generar una versión “pre-cocinada” con algún programa. En síntesis, se trata de **generar una secuencia de números Perlin preprocesados**, guardarlos como un archivo en la Raspberry, y tomar de ahí nuestros valores.

La ventaja de esto es que el **potencial gráfico de la Raspberry se destina a los gráficos**, lo cual resulta en una simulación más fluida.

Pero el contra es claro: al tener una versión cocinada, **no es generativa**. Es decir, el loop es siempre el mismo, no hay sorpresas. Siempre va a ser igual.

Sacrificando un poco de poder de procesamiento, creo que la mejor opción es **generar esos números directamente desde la Raspberry Pi**. Me parece más coherente con la forma en que venimos trabajando.

Sin embargo, esto nos deja con **recursos limitados para dibujar nuestras partículas**.

Dejo que chat gpt explique su deduccion casi acertada. 

Para escribirte el código que me pediste (adaptado a **MicroPython** para correrlo en Raspberry Pi Pico u otras placas), me basé en:

* Mi conocimiento de la estructura estándar de Perlin noise
* Wikipedia (explicación de Perlin noise)
* Código de referencia de:

  * Ken Perlin (original)
  * Implementaciones en Processing, p5.js, Three.js
  * Varios tutoriales (e.g. Stefan Gustavson’s Simplex Noise code, aunque tu código es Perlin, no Simplex)
* Simplicidad para MicroPython → evité NumPy u operaciones complejas, solo usé floats y listas

El código es **escrito desde cero**, pero es casi idéntico en lógica a implementaciones públicas como:

* <https://gist.github.com/nowl/828013> (2D Perlin in Python)
* <https://github.com/pvigier/perlin-numpy> (Numpy version)
* p5.js Perlin noise implementation

**Hay que mencionar que ChatGPT puede ser una gran herramienta que nos da una patadita inicial muy potente**, pero si no tenemos una noción clara de a dónde queremos llegar, los últimos metros de nuestra carrera pueden volverse muy complejos.

# ¡Vamos a cocinar Vector Fields en la Raspberry Pi Pico!

Hay que mencionar que ChatGPT puede ser una gran herramienta que nos da una patadita inicial muy potente, pero si no tenemos una noción clara de a dónde queremos llegar, los últimos metros de nuestra carrera pueden volverse muy complejos.

- - -

## ¡Vamos a cocinar!

<div class="w-full aspect-video">
  <iframe
    class="w-full h-full"
    src="https://www.youtube.com/embed/nER9SJAv__Y"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

Perfecto, ahora que tenemos nuestros ingredientes principales, vamos con lo que en realidad nos interesa: **el código**.

```python
import sh1106
from machine import Pin, I2C
import math
import perlin
import urandom
import time

i2c = I2C(0, scl=Pin(5), sda=Pin(4), freq=400000)
oled = sh1106.SH1106_I2C(128, 64, i2c, Pin(16), 0x3c)

width = 128
height = 64
t = 0
num = 30
particles = []
noiseScale = 150
noiseStrength = 1.9
tail = 6

class Particle:
    def __init__(self, x, y, speed):
        self.loc_x = x
        self.loc_y = y
        self.speed = speed
        self.dir_x = 1
        self.dir_y = 0

    def run(self):
        self.move()
        self.check_edges()
        self.update()

    def move(self):
        n = perlin.noise((self.loc_x / noiseScale) + t, (self.loc_y / noiseScale) + t)
        angle = n * 2 * math.pi * noiseStrength
        self.dir_x = math.cos(angle)
        self.dir_y = math.sin(angle)

        vel_x = self.dir_x * self.speed
        vel_y = self.dir_y * self.speed

        self.prev_x = self.loc_x
        self.prev_y = self.loc_y

        self.loc_x += vel_x
        self.loc_y += vel_y

    def update(self):
        x2 = int(self.loc_x)
        y2 = int(self.loc_y)
        oled.pixel(x2, y2, 1)

    def check_edges(self):
        if (self.loc_x < 0 or self.loc_x > width or
            self.loc_y < 0 or self.loc_y > height):

            self.loc_x = urandom.uniform(0, width * 1.2)
            self.loc_y = urandom.uniform(0, height)

for i in range(num):
    x = urandom.randint(0, 128)
    y = urandom.randint(0, 64)
    speed = urandom.uniform(0.5, 3)
    p = Particle(x, y, speed)
    particles.append(p)

while True:
    oled.fill(0)
    for j in range(tail):
        for p in particles:
            p.run()
    oled.show()
    t += 0.02
    time.sleep(0.05)
```

A simple vista, se parece muchísimo a nuestra versión en Processing. Incluso creamos una clase `Particle` que funciona exactamente igual, lo cual es muy poderoso.

Y aunque no sepamos mucho sobre el lenguaje que estamos usando, ya tenemos una gran noción de cómo puede funcionar: solo había que adaptarlo para que el programa lo entienda.

Nuestra lista de ingredientes está completa, así que... **¡vamos a cocinar nuestros vector fields!**

**Línea por Línea**
Importamos las librerías necesarias:

```python
import sh1106 
```

Librería para controlar la pantalla. Nos permite dibujar píxeles, líneas o imprimir texto

```python
from machine import Pin, I2C
```

Módulo de MicroPython para controlar los pines GPIO y la comunicación por I2C.

```python
import math
```

Incluye funciones matemáticas como `sin()` y `cos()`, que usamos para definir direcciones angulares (en radianes) para nuestras partículas.

```python
import urandom
```

Una versión más simple y portable de random, adaptada para microcontroladores.

```python
import time
```

Nos permite manejar pausas y controlar el tiempo de ejecución.
**Definimos variables globales y configuramos la pantalla:**

```python
i2c = I2C(0, scl=Pin(5), sda=Pin(4), freq=400000)
oled = sh1106.SH1106_I2C(128, 64, i2c, Pin(16), 0x3c)

width = 128
height = 64
t = 0
num = 30
particles = []
noiseScale = 150
noiseStrength = 1.9
tail = 6
```

`tail` es el número de veces que cada partícula se dibuja antes de pasar a la siguiente iteración del loop, dando la ilusión de un trazo o rastro.

Creamos la clase `Particle`, que procesa el comportamiento individual:
`__init__`: Constructor

```python
def __init__(self, x, y, speed):
    self.loc_x = x
    self.loc_y = y
    self.speed = speed
    self.dir_x = 1
    self.dir_y = 0
```

Inicializa las coordenadas y velocidad de la partícula.
`run()`: Lógica principal de cada partícula

```python
def run(self):
    self.move()
    self.check_edges()
    self.update()
```

`move()`: Movimiento influenciado por el Perlin noise

```python
def move(self):
    n = perlin.noise((self.loc_x / noiseScale) + t, (self.loc_y / noiseScale) + t)
    angle = n * 2 * math.pi * noiseStrength
    self.dir_x = math.cos(angle)
    self.dir_y = math.sin(angle)

    vel_x = self.dir_x * self.speed
    vel_y = self.dir_y * self.speed

    self.prev_x = self.loc_x
    self.prev_y = self.loc_y

    self.loc_x += vel_x
    self.loc_y += vel_y
```

Este es el “core” del sistema. Sampleamos la posición de la partícula en el espacio del Perlin noise, obtenemos un ángulo y lo usamos para determinar la dirección del movimiento.

`update()`: Dibujo en pantalla

```python
def update(self):
    x2 = int(self.loc_x)
    y2 = int(self.loc_y)
    oled.pixel(x2, y2, 1)
```

Pinta un píxel en la nueva ubicación.

`check_edges()`: Reposicionar si se sale de pantalla

```python
def check_edges(self):
    if (self.loc_x < 0 or self.loc_x > width or
        self.loc_y < 0 or self.loc_y > height):
        self.loc_x = urandom.uniform(0, width * 1.2)
        self.loc_y = urandom.uniform(0, height)
```

Evita errores cuando las partículas salen del área visible.

**Generación de partículas:**

```python
for i in range(num):
    x = urandom.randint(0, 128)
    y = urandom.randint(0, 64)
    speed = urandom.uniform(0.5, 3)
    p = Particle(x, y, speed)
    particles.append(p)
```

Cada partícula se instancia con una posición y velocidad aleatoria y se guarda en un array.

**Loop principal:**

```python
while True:
    oled.fill(0)
    for j in range(tail):
        for p in particles:
            p.run()
    oled.show()
    t += 0.02
    time.sleep(0.05)
```

Borra la pantalla, ejecuta cada partícula varias veces (para crear trazos), actualiza la pantalla y desplaza el tiempo del noise (`t`) para dar sensación de movimiento.

**Reflexión final**
Qué bueno es ser lo suficientemente curiosos como para perseguir estas ideas. Llegamos al final.
Espero haber aportado algo a quien sea que este proyecto haya traído hasta acá.
No duden en escribirme si necesitan ayuda con algo.

**Nos vemos en la próxima extraña idea que se me ocurra.
¡Bye!**
