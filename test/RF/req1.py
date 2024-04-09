#Utilidades
import time
import requests
import os

#Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

#Función screenshots
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
    if not os.path.exists("screenshots"):
        os.makedirs("screenshots")
    driver.save_screenshot(f"screenshots/{name}")

#Cambiar a ".Chrome()" para usar en Chrome
driver = webdriver.Safari()

#Abrir la página principal
driver.get('http://localhost:3000')

time.sleep(5)

#Color id que queremos buscar
COLOR_IDS = [1, 62, 23]

for color_id in COLOR_IDS:
    try:
        #Encontrar el elemento por su ID
        color_element = driver.find_element(By.ID, f'color-{color_id}')

        #Hacer clic en el color
        color_element.click()
        time.sleep(5)
        screenshot(driver, "pagina_principal.png")

        #Encontrar el elemento que contiene el nombre del color
        name_element = driver.find_element(By.XPATH, '//h1[@data-testid="color-detail-title"]')
        color_name = name_element.text.strip()

        #Información desde el componente ColorDetail
        elements = driver.find_elements(By.TAG_NAME, 'p')

        #Función para filtrar elementos que contienen "RGB:"
        def is_rgb_element(element):
            return "RGB:" in element.text

        #Filtrar elementos que contienen "RGB:"
        rgb_element = next((e for e in elements if is_rgb_element(e)), None)

        if rgb_element:
            #Obtener texto del siguiente elemento (valores RGB)
            rgb_text = rgb_element.find_element(By.XPATH, "./following-sibling::p").text.strip()

            #Separar los valores 'R','G','B', limpiar la cadena y convertirlos a int
            rgb_final = {color: int(value.strip()) for color, value in zip(["R", "G", "B"], rgb_text.split(","))}
        else:
            rgb_final = None

        print(color_name)
        print(rgb_final)

        #Realizar la petición al endpoint del backend
        response = requests.get('http://127.0.0.1:8000/api/getColors')

        if response.status_code == 200:
            colors_data = response.json()['colors']

            expected_color_data = next((color for color in colors_data if color['id'] == color_id), None)
            print(expected_color_data)

            #Verificar en la información del backend
            if expected_color_data is not None:
                assert expected_color_data['id'] == color_id, 'El ID del color no coincide'
                assert expected_color_data['colorName'] == color_name, 'El nombre de la categoría del color no coincide'

                if rgb_final:
                    #Comprar RGB
                    assert expected_color_data['R'] == rgb_final['R'], 'R de RGB no coincide'
                    assert expected_color_data['G'] == rgb_final['G'], 'G de RGB no coincide'
                    assert expected_color_data['B'] == rgb_final['B'], 'B de RGB no coincide'
            else:
                print(f'El color id: "{color_id}" no se encontró en la información del backend')
        else:
            print('La petición al endpoint del backend no fue exitosa')
        
        #Tomar una captura de pantalla después de que se realizan las comprobaciones
        screenshot(driver, f'color_{color_id}_info.png')

    except NoSuchElementException:
        print(f'El elemento con el color id: "{color_id}" no se encontró en la página')

    time.sleep(5)
    
driver.quit()
