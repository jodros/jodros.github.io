---
title: "First steps with ESP32"
date: 2023-07-21T15:47:45-03:00
draft: true
---


####

- gcc
- git
- make
- ncurses
- flex
- bison
- gperf
- python-pyserial

- `wget https://dl.espressif.com/dl/xtensa-esp32-elf-linux64-1.22.0-75-gbaf03c2-5.2.0.tar.gz`
- `tar -xvzf xtensa...`
- `git clone --recursive https://github.com/espressif/esp-idf.git`
- `chmod +x install.sh export.sh`
- `sudo chmod a+rw /dev/ttyUSB0` Really important! Otherwise the program will give the error `the port /dev/ttyUSB0 doesn't exist`

useful idf.py

to exit press `ctrl+]`

- `ìdf.py monitor`

  [doc](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/tools/idf-monitor.html)

- `idf.py app-flash`
- `idf.py erase-flash`

### NodeMCU

[doc  ](https://nodemcu.readthedocs.io/en/release/)
