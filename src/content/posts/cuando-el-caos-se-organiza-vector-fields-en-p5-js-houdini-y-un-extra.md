---
title: " Cuando el caos se organiza: Vector Fields en p5.js, Houdini y un extra."
tagline: Campos vectoriales, partículas y la magia de Perlin noise.
promt: Vector field creado en Houidini Fx.
thumbnail: /uploads/vector_fields_close_v05_-120-265-_1.gif
author: by Israel paucar
refe:
  - link: https://es.wikipedia.org/wiki/Campo_vectorial
    author: Campo vectorial – Wikipedia
  - link: https://natureofcode.com/random/#a-smoother-approach-with-perlin-noise
    author: The Nature of code - A Smoother Approach with Perlin Noise
  - link: https://www.gorillasun.de/blog/perlin-noise-flow-fields-in-processing-part-i/
    author: Perlin Noise Flow Fields in Processing By Ahmad Moussa
time-read: 4
date: 2025-06-27 20:33
tags:
  - vector
  - fields
  - houdinifx
  - nath
  - noise
  - perlin
  - p5.js
---
Si hacemos una pequeña búsqueda en Google sobre este tema, encontraremos que los campos vectoriales se utilizan en física para representar la velocidad y dirección de un fluido en el espacio, o la intensidad y dirección de fuerzas.

![A vector field on a plane](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/VectorField.svg/1200px-VectorField.svg.png "Vector field From Wikipedia, the free encyclopedia")

No soy físico ni matemático, pero al ver este tipo de gráficas, mi instinto creativo se activa. Me genera tanta curiosidad que me resulta imposible no querer entender, al menos de forma básica, cómo generarlas.

Buscando un poco en internet, descubrí que es más común de lo que parece. Además de usarse para representar el movimiento de fenómenos científicos, hay artistas que aprovechan este concepto para explorar su lado más artístico e interesante.

![Flow Fields in Processing by Ahmad Moussa](https://www.gorillasun.de/content/images/2023/03/fieldColorDashedShort58.png "Flow Fields in Processing")

No quiero entrar demasiado en profundidad en el tema, porque aún no lo tengo completamente entendido, y quizás nunca lo haga. Pero quiero hacer un repaso rápido por los conceptos básicos que he aprendido.

**Qué compone, de forma general, un vector field?**

El elemento base o unidad mínima es el **vector**: una pequeña flecha que representa una dirección y una magnitud. Su tarea principal es muestrear (o samplear) el movimiento dentro del fenómeno que lo contiene. Esto nos lleva al siguiente concepto: el fluido o sistema dinámico en el que existe. Es en ese entorno donde el vector obtiene su información de dirección y velocidad. Finalmente, todo esto sucede dentro de un espacio, que puede ser 1D, 2D o 3D, según cómo decidamos representarlo.

## El vector

![a Euclidean vector or simply a vector (sometimes called a geometric vector[1] or spatial vector[2])](https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vector_from_A_to_B.svg/500px-Vector_from_A_to_B.svg.png "Euclidean vector")

Como mencionamos antes, esta sería nuestra unidad básica mínima.  

Ahora bien, la palabra *vector* puede significar muchas cosas. Pero en el campo que estamos explorando, nos interesa enfocarnos en lo que se conoce como **vector euclidiano** (llamado así por el matemático Euclides, también conocido como *vector geométrico*).

El vector euclidiano es una entidad que posee dos propiedades fundamentales:

**Magnitud o longitud** (*magnitude*): indica qué tan grande es el vector. En algunos contextos también se interpreta como la **velocidad**.
**Dirección** (*orientation*): señala hacia dónde apunta el vector.

Por sí solo, un vector sería simplemente un conjunto de números representados como datos. Para poder visualizarlo en el espacio, necesitamos un **elemento extra** que pueda almacenar esa información de dirección y magnitud, y que además pueda ser representado gráficamente.

Ahí es donde entran en escena las **partículas**, que son muy convenientes para transportar todo tipo de información.  
Dependiendo de la capacidad de procesamiento de nuestro software o hardware, decidiremos si trabajamos en un espacio **2D o 3D**.

## El fluido o sistema dinámico

![Wind map Vladimir Agafonkin ](https://miro.medium.com/v2/resize:fit:5760/1*7VX65YYNGw6-CAwVnxP_5A.png "Wind map with WebGL")

Este sería el **fenómeno** en el que se generan nuestras fuerzas y direcciones.  
Puede ser un entorno completamente caótico, con comportamiento impredecible, o algo más sutil, que genera patrones suaves y estéticos.  
Este es el corazón de nuestro sistema: lo que *dibuja* nuestros vector fields. Es dentro de este entorno donde los vectores samplean el movimiento y obtienen la información que luego será representada por las partículas.

Podríamos, por ejemplo, usar el resultado de una simulación de fluidos generada en Houdini usando volúmenes.  
Pero en este caso vamos a optar por algo más **aleatorio y liviano** computacionalmente: un **noise**, específicamente un **Perlin noise**.

## ¿Qué es Perlin noise?

![Two-dimensional slice through 3D Perlin noise at z = 0](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Perlin_animation_6_octaves.gif/500px-Perlin_animation_6_octaves.gif "Perlin noise")

Podemos entender Perlin noise como un algoritmo que genera números aleatorios, pero de una forma más suave.

¿Qué quiero decir con esto? A diferencia de una función *random*, donde todos los valores generados no tienen relación entre sí y suelen ser más ruidosos, Perlin noise tiene una apariencia mucho más orgánica, porque genera números naturalmente ordenados: una secuencia de valores en la que cada número guarda cierta coherencia con sus vecinos.

![](https://natureofcode.com/static/86eca0b21a9fd539438e2523f463037b/b937b/00_randomness_8.webp)

Vamos a usar sus valores para definir orientaciones. Por ahora, no vamos a generar magnitudes diferentes, sino que vamos a mantener una **longitud normalizada**, lo que hace que todas nuestras partículas se muevan al mismo tiempo y a la misma velocidad.

**Let’s do it**
Hemos entendido de manera global los conceptos que vamos a usar, y ahora llegó el momento de ponerlos en práctica en distintos softwares.
Empezaermos escribiendo algunas líneas de código en **p5.js**, una librería de JavaScript pensada para crear y visualizar *creative coding*.
Después, exploraremos **Houdini**, para demostrar cómo estos conceptos se pueden extrapolar de forma interesante y creativa.

¡Vamos a ver cómo se convierten en imágenes todas estas ideas!
