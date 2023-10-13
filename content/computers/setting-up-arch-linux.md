---
title: "Setting Up Arch Linux"
date: 2023-08-04T13:45:34-03:00
draft: true
---

### Move ISO to pendrive and make it bootable

`fdisk -ls` or `lsblk` and then `umount /dev/sdx`

Now you can transfer the ISO content to pendrive:

`sudo dd if=/path/to/ubuntu.iso of=/dev/sdX bs=4M && sync`.


