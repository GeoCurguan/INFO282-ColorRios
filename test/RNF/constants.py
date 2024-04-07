from selenium import webdriver
from types import *
# ------- PAGE CONFIGURATION -------
# Page URL
PAGE_URL = "http://localhost:3000/"
WAIT_TIME = sorted([2, .3], reverse=True) # sort by DESC (in seconds)

# ------- BROWSER CONFIGURATION -------
# Test Browsers
BROWSERS = ["chrome","firefox"]

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
