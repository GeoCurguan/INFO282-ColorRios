const puppeteer = require('puppeteer');

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const COLORS = [
  [100, 350],
  [250, 350],
  [350, 350],
  [500, 350],
  [640, 350],
  [100, 480],
  [250, 480],
  [380, 480],
  [520, 480],
  [620, 480]
];

if (process.argv.length < 4) {
  console.log('Uso: node test.js <NUM_COLORES> <NUM_DESCARGAS>');
  process.exit(1);
}

const NUM_COLORES = parseInt(process.argv[2]);
const NUM_DESCARGAS = parseInt(process.argv[3]);

if (isNaN(NUM_COLORES) || isNaN(NUM_DESCARGAS)) {
  console.log('Ambos argumentos deben ser números.');
  process.exit(1);
}

if (NUM_COLORES > 10 || NUM_COLORES < 1) {
  console.log('<NUM_COLORES> debe ser mayor a 0 y menor a 10.');
  process.exit(1);
}


(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  // Navigate to the web page
  await page.setViewport({ width: 1000, height: 1000 });

  await page.goto('http://localhost:3000/');
  await page.waitForSelector('.fade-in');

  await page.evaluate(() => {
    document.addEventListener('mousemove', (event) => {
      console.log(`Cursor position: X=${event.clientX}, Y=${event.clientY}`);
    });
  });

  // Move the mouse cursor to a specific position
  await page.mouse.click(100, 350);

  await page.waitForSelector('.text-white.hover\\:bg-pink-600');

  await page.click('.text-white.hover\\:bg-pink-600');

  await delay(2000);

  for(let i = 1; i < NUM_COLORES ; i++){
    await page.mouse.click(COLORS[i][0], COLORS[i][1]);

    await page.waitForSelector('.text-white.hover\\:bg-pink-600');

    await page.click('.text-white.hover\\:bg-pink-600');
  }

  await delay(2000);

  for(let i = 0; i < NUM_DESCARGAS ; i++){
    // Selector de pdf
    await page.waitForSelector('div > a[download="colores-favoritos.pdf"]');

    // Descargar pdf
    await page.click('div > a[download="colores-favoritos.pdf"]');
  }

  // Cerrar navegador
  //await browser.close();
})();