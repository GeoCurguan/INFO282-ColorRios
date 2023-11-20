// @ts-check
const { test, expect } = require("@playwright/test");
import { LOCALHOST_URL, data_tests_IDS } from "./constants";

test("Detalle del color no existe al entrar", async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  const colorDetailID = data_tests_IDS.colorDetail;

  const divColorDetail = await page.$(`[data-testid=${colorDetailID}]`);

  // Verificar que no existe el detalle del color
  expect(divColorDetail).toBeNull();
});

test("Al clickear un color, mostrar detalle del color", async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  const colorDetailID = data_tests_IDS.colorDetail;
  const colorsID = data_tests_IDS.colors;

  const divColors = await page.$(`[data-testid=${colorsID}]`);
  const divColorsChildren = await divColors.$$(`> div`); // Hijos de 'primera generación' de divColors

  // 0. Verificar que existen colores
  expect(divColorsChildren.length).toBeGreaterThan(0);

  // 1. Verificar que no existe el detalle del color
  let divColorDetail = await page.$(`[data-testid=${colorDetailID}]`);
  expect(divColorDetail).toBeNull();

  // Clickear en el primer color
  await divColorsChildren[0].click();
  divColorDetail = await page.$(`[data-testid=${colorDetailID}]`);

  // 2. Verificar que existe el detalle del color
  expect(divColorDetail).not.toBeNull();
});

test("Al clickear un color, mostrar detalle del color y cerrarlo", async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  const colorDetailID = data_tests_IDS.colorDetail;
  const colorDetailCloseID = data_tests_IDS.colorDetailClose;
  const colorsID = data_tests_IDS.colors;

  const divColors = await page.$(`[data-testid=${colorsID}]`);
  const divColorsChildren = await divColors.$$(`> div`); // Hijos de 'primera generación' de divColors

  // 0. Verificar que existen colores
  expect(divColorsChildren.length).toBeGreaterThan(0);

  // 1. Verificar que no existe el detalle del color
  let divColorDetail = await page.$(`[data-testid=${colorDetailID}]`);
  expect(divColorDetail).toBeNull();

  // Clickear en el primer color
  await divColorsChildren[0].click();
  divColorDetail = await page.$(`[data-testid=${colorDetailID}]`);

  // 2. Verificar que existe el detalle del color
  expect(divColorDetail).not.toBeNull();

  // Clickear en el botón de cerrar
  const buttonClose = await page.$(`[data-testid=${colorDetailCloseID}]`);
  await buttonClose.click();
  divColorDetail = await page.$(`[data-testid=${colorDetailID}]`);

  // 3. Verificar que no existe el detalle del color
  expect(divColorDetail).toBeNull();
});

test("Al clickear un color, y luego otro color, se espera que cambie el detalle del color", async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  const colorDetailID = data_tests_IDS.colorDetail;
  const colorsID = data_tests_IDS.colors;

  const divColors = await page.$(`[data-testid=${colorsID}]`);
  const divColorsChildren = await divColors.$$(`> div`); // Hijos de 'primera generación' de divColors
  // 0. Verificar que existen colores
  expect(divColorsChildren.length).toBeGreaterThan(0);

  // 1. Verificar que no existe el detalle del color
  let divColorDetail = await page.$(`[data-testid=${colorDetailID}]`);
  expect(divColorDetail).toBeNull();

  // Clickear en el primer color
  await divColorsChildren[0].click();
  divColorDetail = await page.$(`[data-testid=${colorDetailID}]`);

  // 2. Verificar que existe el detalle del color
  expect(divColorDetail).not.toBeNull();

  const firstStyleColorDetail = await divColorDetail.getAttribute("style");

  // Clickear en el segundo color
  await divColorsChildren[1].click();
  divColorDetail = await page.$(`[data-testid=${colorDetailID}]`);

  // 3. Verificar que existe el detalle del color
  expect(divColorDetail).not.toBeNull();

  const secondStyleColorDetail = await divColorDetail.getAttribute("style");

  // 4. Verificar que el detalle del color cambió
  expect(firstStyleColorDetail).not.toBe(secondStyleColorDetail);
});
