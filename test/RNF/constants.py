from selenium import webdriver
from types import *
# ------- PAGE CONFIGURATION -------
# Page URL
PAGE_URL = "http://localhost:3000/"
WAIT_TIME = sorted([1], reverse=True) # sort by DESC (in seconds)

# ------- BROWSER CONFIGURATION -------
# Test Browsers
BROWSERS = ["chrome", "firefox"]

# Available Browsers drivers
BROWSERS_DRIVERS = {
    "chrome": webdriver.Chrome,
    "edge": webdriver.Edge,
    "firefox": webdriver.Firefox,
    "safari": webdriver.Safari,
    "explorer": webdriver.Ie
}

PATH_SCREENSHOTS = "./screenshots/" # Relative to /test/RNF/
# ------- NETWORK CONDITIONS -------
# Se intentó 
# NETWORK_CONDITIONS = {
#     "offline": False,
#     "latency": 5, # ms
#     "download_throughput": 1 * 1024 * 1024, # 1Mbps
#     "upload_throughput": 1 * 1024 * 1024 # 1Mbps
# }

# ------- ASSERTS -------
# Forzar algunos errores
# frontend corriendo, backend apagado -> TIMEOUT
# firefox -> colors con height incorrecto -> AssertionError
