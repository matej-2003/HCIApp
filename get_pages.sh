#!/bin/bash

# Base URL
BASE_URL="https://192.168.0.42:8000"

# Download each page and save with the desired filename
wget --no-check-certificate "${BASE_URL}/" -O index.html
wget --no-check-certificate "${BASE_URL}/reservations" -O reservations.html
wget --no-check-certificate "${BASE_URL}/parking_lot/1" -O parking_lot.html
wget --no-check-certificate "${BASE_URL}/history" -O history.html
