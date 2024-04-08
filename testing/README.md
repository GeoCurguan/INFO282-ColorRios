<h1>Testing</h1>

Caso de pruebas a automatizar:
Requisito funcional: Generación de PDF con colores.

Requisito funcional:
-La plataforma debe generar una paleta de colores según los criterios definidos (no se puede repetir un color ya existente, no se pueden crear paletas de más de 10 colores, entre otros criterios)

Requisito no funcional: 

-La plataforma debe ser capaz de descargar el pdf de forma rápida..
-La plataforma debe ser capaz de generar el pdf independiente de los datos ingresados.


Tests realizados de forma manual
[testing](https://docs.google.com/spreadsheets/d/1XC8g1Aa5CSMnLFsPoj1MagYu7DieEBkGx3Fy39hIiQg/edit#gid=0)
(para algunas pruebas se realizaron modificaciones de código para forzar los errores del programa)


Instrucciones de ejecución de tests

Pasos previos:
<ul>
  <li>Dirigirnos al directorio de tests (está ruta)</li>
  <li>Instalar puppeteer con: npm i puppeteer</li>
</ul>

Pasos de ejecución de tests al caso de prueba mencionado
<ul>
  <li>Inicializar la aplicación en localhost (front: npm run dev / backend: symfony server:start)</li>
  <li>Dirigirnos al directorio de tests</li>
  <li>Ejecutar test.js con "node test.js NUM_COLORES NUM_DESCARGAS", dónde NUM_COLORES es la cantidad entre 1 y 10 (ambos incluids) de colores a descargar y  NUM_DESCARGAS es la cantidad de pdf a exportar.</li>
</ul>



