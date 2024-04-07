#Utilidades
import time
import requests

#Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

driver = webdriver.Safari()

#Abrir la página principal
driver.get('http://localhost:3000')

time.sleep(5)

#Color id que queremos buscar
color_id = 1

try:
    #Encontrar el elemento por su ID
    color_element = driver.find_element(By.ID, f'color-{color_id}')

    #Hacer clic en el color
    color_element.click()
    time.sleep(5)

    #Información desde el componente ColorDetail
    name_element = driver.find_element(By.XPATH, '//div[@class="text-gray-900 w-full pl-4 pr-2 flex-1 overflow-y-auto sm:max-h-full sm:pr-0 pt-4"]/div[1]')
    elements = driver.find_elements(By.TAG_NAME, 'p')
    
    #Extraer la información frontend
    color_name = name_element.text

    #Función para filtrar elementos que contienen "RGB:"
    def is_rgb_element(element):
        return "RGB:" in element.text

    #Filtrar elementos que contienen "RGB:"
    rgb_element = next((e for e in elements if is_rgb_element(e)), None)

    if rgb_element:
        #Obtener siguiente línea
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
            assert expected_color_data['colorName'] == color_name, 'El nombre del color no coincide'
            #Comprar RGB
            assert expected_color_data['R'] == rgb_final['R'], 'R de RGB no coincide'
            assert expected_color_data['G'] == rgb_final['G'], 'G de RGB no coincide'
            assert expected_color_data['B'] == rgb_final['B'], 'B de RGB no coincide'

        else:
            print(f'El color id: "{color_id}" no se encontró en la información del backend')
    else:
        print('La petición al endpoint del backend no fue exitosa')
 
except NoSuchElementException:
    print(f'El elemento con el color id: "{color_id}" no se encontró en la página')

time.sleep(5)
driver.quit()
