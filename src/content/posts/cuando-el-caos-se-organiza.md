---
title: Cuando el caos se organiza:Simulando particulas en un microcontrolador
tagline: Construyendo Flow Fields en una Raspberry Pi
promt: Imagen de una pantalla oled usada para el proyecto dibujando Vector Trails
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
Ahora el reto es más grande porque no tengo mucho conocimiento de cómo llevarlo a cabo. 

Desde hace algún tiempo he estado experimentando con estos dispositivos pequeños: Raspberry Pi, Arduino y ESP32.

No lo tengo muy claro, pero he descubierto algunas cosas.

Mi primer intento fue con un Arduino Uno. Arduino utiliza una versión simplificada de C++ —es decir, un lenguaje amigable para facilitar el trabajo con este dispositivo—, lo que lo hace eficiente.

El gran problema aparece con su capacidad de procesamiento. Aunque el Arduino Uno es un dispositivo increíblemente eficiente (más aún con C++), las librerías para controlar pantallas no suelen estar preparadas para proyectos con cálculos complejos como Perlin noise. Quizás esas operaciones no tienen mucho sentido para usos funcionales típicos.

Hice algunas pruebas y logré desplazar un conjunto de líneas de forma sinusoidal, pero no es nuestro objetivo. Nosotros necesitamos Perlin noise.

Sin embargo, estamos limitados por la potencia del Arduino y por el lenguaje: aunque eficiente, al ser tan bajo nivel, es complejo de entender.

No lo pensé más y decidí cambiar de dispositivo. Buscando un poco, encontré algo más “potente” y aún más pequeño: **Raspberry Pi Pico 2 W**.

Este dispositivo es más versátil y sencillo de usar, ya que permite programar en Python. De todas las opciones que investigué, la que mejor se adaptaba a mi estilo fue MicroPython en Thonny, y lo mejor: todo es software libre, algo muy interesante.

**MicroPython** es una implementación optimizada de Python para microcontroladores con recursos limitados, como la Pico.

**Thonny** es un IDE diseñado para Python. Permite conectar la Raspberry Pi Pico vía USB y cargar scripts escritos en MicroPython directamente al dispositivo. 

A diferencia de Arduino, donde el IDE compila el código a C/C++ y lo transforma, resultando complejo recuperar el código si no lo guardas, en MicroPython escribes el script directamente y puedes recuperarlo del microcontrolador si no lo guardaste localmente.

En cuanto a la pantalla, hay varios dispositivos clásicos muy famosos para proyectos con microprocesadores, pero el que creo que mejor funciona por precio, funcionalidad y tamaño es la **OLED de 1,3 pulgadas con driver SH1106**.

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
