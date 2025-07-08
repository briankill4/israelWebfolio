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

Antes de entrar en más detalle, vamos a revisar la unidad básica que compone un *vector field*.

## El vector

![a Euclidean vector or simply a vector (sometimes called a geometric vector[1] or spatial vector[2])](https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vector_from_A_to_B.svg/500px-Vector_from_A_to_B.svg.png "Euclidean vector")

En el mundo del movimiento, tenemos como unidad básica al vector. Ahora bien, la palabra *vector* puede significar muchas cosas. Pero en el campo que estamos estudiando, necesitamos enfocarnos en lo que se llama **vector euclidiano** (nombrado así por el matemático Euclides y también conocido como **vector geométrico**).

El vector euclidiano es una entidad que posee dos propiedades: **magnitud** (o *length*, en inglés) y **dirección**.

Vamos a analizar las partes que componen un vector:

* **Magnitud o longitud (magnitude or length):** se puede entender como qué tan grande es el vector. En algunos contextos, también se puede interpretar como velocidad.
* **Dirección:** indica hacia donde apunta el vector.

Bueno, ahora que sabemos qué es un vector, necesitamos “subirlo” a algo que pueda almacenar toda esa información de dirección y magnitud.

Ahí es cuando entran en escena nuestras amigas, las partículas, que siempre son muy convenientes para llevar todo tipo de información.

Como todos en el mundo, las partículas también necesitan un lugar donde puedan “ser ellas mismas”. De la misma forma, nuestras partículas necesitan un espacio del cual puedan extraer información de movimiento y orientación, que es la que vamos a guardar en nuestros vectores. Vamos a tratar de mantenerlo simple… ¡para después complicar la cosa!

Como estamos empezando, siempre vamos a crear un vector 2D que se mueva en un espacio bidimensional. La mejor forma de hacerlo es utilizando *noise*, más específicamente **Perlin noise**. Está bien, podríamos usar cualquier tipo de ruido, pero vamos a arrancar con este.

## ¿Qué es Perlin noise?

![Two-dimensional slice through 3D Perlin noise at z = 0](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Perlin_animation_6_octaves.gif/500px-Perlin_animation_6_octaves.gif "Perlin noise")

**Two-dimensional noise**

Podemos entender Perlin noise como un algoritmo que genera números aleatorios, pero de una forma más suave.

¿Qué quiero decir con esto? A diferencia de una función *random*, donde todos los valores generados no tienen relación entre sí y suelen ser más ruidosos, Perlin noise tiene una apariencia mucho más orgánica, porque genera números naturalmente ordenados: una secuencia de valores en la que cada número guarda cierta coherencia con sus vecinos.

Una vez entendido qué es Perlin noise, vamos a usar sus valores para definir orientaciones. Por ahora, no vamos a generar magnitudes diferentes, sino que vamos a mantener una **longitud normalizada**, lo que hace que todas nuestras partículas se muevan al mismo tiempo y a la misma velocidad.

## Let’s do it

Hemos entendido de manera global los conceptos que vamos a usar, y ahora llegó el momento de ponerlos en práctica en distintos softwares.

Voy a escribir algunas líneas de código en **p5.js**, una librería de JavaScript pensada para crear y visualizar *creative coding*.

Después, exploraremos **Houdini**, para demostrar cómo estos conceptos se pueden extrapolar de forma interesante y creativa.

¡Vamos a ver cómo se convierten en imágenes todas estas ideas!
