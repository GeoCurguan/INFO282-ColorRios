// @ts-check
const { test, expect } = require("@playwright/test");
import { LOCALHOST_URL, data_tests_IDS } from "./constants";

test("Muestra más de 10 colores", async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  const colorsID = data_tests_IDS.colors;

  const divColors = await page.$(`[data-testid=${colorsID}]`);
  const divColorsChildren = await divColors.$$(`> div`); // Hijos de 'primera generación' de divColors

  // Verificar que hay más de 10 hijos (colores)
  expect(divColorsChildren.length).toBeGreaterThan(10);
});

test("Muestra colores en 5 columnas", async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  const colorsID = data_tests_IDS.colors;
  const colorsClassToInclude = "flex";
  const colorClassToInclude = "w-1/5";

  const divColors = await page.$(`[data-testid=${colorsID}]`);
  const divColorsChildren = await divColors.$$(`> div`); // Hijos de 'primera generación' de divColors

  // Verificar que todos los primeros hijos tienen la clase "w-1/5"
  const everyChildHasClassName = await Promise.all(
    divColorsChildren.map(async (div) => {
      const className = await div.getAttribute("class");
      return className.includes(colorClassToInclude);
    })
  );

  // Verificar que divColors tiene la clase "flex"
  const divColorsClass = await divColors.getAttribute("class");
  expect(divColorsClass.includes(colorsClassToInclude)).toBe(true);

  // Verificar que todos los hijos tienen la clase "w-1/5", es decir, formarán 5 columnas
  expect(everyChildHasClassName.every((result) => result === true)).toBe(true);
});
