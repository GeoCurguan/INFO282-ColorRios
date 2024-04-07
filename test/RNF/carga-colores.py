from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import time
from utils import format_decimal
from constants import *
import os

# assert (condition, message) -> Si la condición es falsa, se lanza un AssertionError con el mensaje proporcionado.

# CONFIGURAR Y EJECUTAR EL NAVEGADOR
def get_driver(browser="chrome"):
    """
    Obtiene el controlador del navegador según el navegador especificado.

    Args:
        browser (str): El navegador a utilizar. Puede ser 'chrome', 'edge', 'firefox', 'safari' o 'explorer'. Por defecto, se utiliza 'chrome'.
        network_conditions (dict, optional): Condiciones de red para simular. Debe ser un diccionario con las condiciones de red a establecer.

    Returns:
        Selenium WebDriver: El controlador del navegador configurado.

    Raises:
        KeyError: Si se proporciona un navegador no válido.
    """
    try:
        driver = BROWSERS_DRIVERS[browser]()
    except KeyError:
        raise KeyError(f"El navegador '{browser}' no es válido. Debe ser uno de: {', '.join(BROWSERS_DRIVERS.keys())}")
    #if network_conditions:
        # **network_conditions: Desempaqueta el diccionario y lo pasa como argumentos.
        #driver.set_network_conditions(**network_conditions)

    return driver

def create_directories(name):
    """
    Crea los directorios necesarios para el archivo especificado.

    Args:
        name (str): El nombre del archivo.

    Returns:
        None
    """
    # ejemplo name: ./screenshots/test-1/1-chrome-3.png
    # print(f"Screenshot: {name.split('/')[0]}") # .
    # print(f"Screenshot: {name.split('/')[1]}") # screenshots
    # print(f"Screenshot: {name.split('/')[2]}") # test-1
    # print(f"Screenshot: {name.split('/')[3]}") # 1-chrome-3.png
    split_name = name.split('/')
    for i in range(2, len(split_name)):
        directory = '/'.join(split_name[:i])
        os.makedirs(directory, exist_ok=True)

def screenshot(driver, name):
    """
    Toma una captura de pantalla de la página actual.

    Args:
        driver (Selenium WebDriver): El controlador del navegador.
        name (str): El nombre del archivo de la captura de pantalla.

    Returns:
        None
    """
    # Si el directorio no existe, crearlo, siempre existirá el directorio screenshots.
    create_directories(name)
    driver.save_screenshot(name)

def wait_time_iteration(driver, wait_time, start_time):
    """
    Espera el tiempo especificado para WebDriverWait.

    Args:
        driver (Selenium WebDriver): El controlador del navegador.
        wait_time (int): El tiempo de espera en segundos.
        start_time (float): El tiempo de inicio de la página.

    Returns:
        None
    """
    # Wait time deberia ser un entero.
    if not isinstance(wait_time, (int, float)):
        raise TypeError(f"El tiempo de espera debe ser un int o float. Se recibió {type(wait_time)}")

    # --- COMPROBAR GALERIA ---
    try:
        gallery = WebDriverWait(driver, wait_time).until(
            EC.presence_of_element_located((By.XPATH, "//div[@data-testid='colors']"))  # Esperar a la presencia de la galeria.
        )
        gallery_time = time.time()
    except TimeoutException as e:
        print(f"No se encontró GALERIA después de {wait_time} segundos.")
        screenshot(driver, f"{PATH_SCREENSHOTS}/test-{iteration}/{inner_iteration}-{driver.capabilities['browserName']}-{wait_time}-ERROR_GALLERY.png")
        raise e
    
    screenshot(driver, f"{PATH_SCREENSHOTS}/test-{iteration}/{inner_iteration}-{driver.capabilities['browserName']}-{wait_time}-GALLERY.png")
    assert gallery is not None, "No se encontró la galería de colores."

    # --- COMPROBAR COLORES ---
    try:
        colors_wrapper = WebDriverWait(gallery, wait_time).until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.hover\\:z-\\[1\\].w-1\\/5")) # Esperar a la presencia de al menos un color, y selecciona todos los que haya.
            )
    except TimeoutException as e:
        print(f"No se encontró GALERIA después de {wait_time} segundos.")
        screenshot(driver, f"{PATH_SCREENSHOTS}/test-{iteration}/{inner_iteration}-{driver.capabilities['browserName']}-{wait_time}-ERROR_COLORS.png")
        raise e
    
    screenshot(driver, f"{PATH_SCREENSHOTS}/test-{iteration}/{inner_iteration}-{driver.capabilities['browserName']}-{wait_time}-COLORS.png")
   
    # Scroll al final de la página
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")    

    color_time = time.time()

    # Buscar colores dentro del wrapper (div > div)
    colors = [color.find_element(By.CSS_SELECTOR, "div") for color in colors_wrapper] # Busca los colores dentro de los wrappers.

    colors_count = len(colors)
    assert colors_count >= 0, "No se encontraron colores."

    # A pesar de ser un Requisto Funcional, debemos verificar la integridad de los colores, width > 0  y height > 0.
    for color in colors:
        assert color.size['width'] > 0, "Ancho del color es 0."
        assert color.size['height'] > 0, "Alto del color es 0."
    # Tiempo actual - Tiempo color

    screenshot(driver, f"{PATH_SCREENSHOTS}/test-{iteration}/{inner_iteration}-{driver.capabilities['browserName']}-COLORS_BOTTOM-{wait_time}.png")
    # ENTREGAR RESULTADOS FINALES
    print(f"Galeria: {format_decimal(gallery_time - start_time)} segundos.")
    print(f"Colores: Se encontraron {colors_count} colores en {format_decimal(color_time-start_time)} segundos.")

def __main__():
    """
    Función principal para ejecutar la comparación de colores en la página web.

    Returns:
        None
    """
    global iteration; iteration = 1
    global inner_iteration; inner_iteration = 1
    for browser in BROWSERS:

        print(f"Test #{iteration} - {browser}")
        for wait_time in WAIT_TIME:
            # Inicializar el controlador del navegador
            driver = get_driver(browser)
            driver.get(PAGE_URL)
            start_time = time.time()

            screenshot(driver, f"{PATH_SCREENSHOTS}/test-{iteration}/{inner_iteration}-{driver.capabilities['browserName']}-{wait_time}.png")
            # Comienza la iteración de test
            print(f"Test #{iteration}.{inner_iteration} - {browser} - {wait_time} segundos")
            # Wait time deberia ser un entero.
            wait_time_iteration(driver, wait_time, start_time)
            inner_iteration += 1
        driver.quit()
        iteration += 1

if __name__ == "__main__":
    __main__()        