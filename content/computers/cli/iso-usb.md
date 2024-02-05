---
title: "Steps to make a bootable pendrive"
draft: false
---

&nbsp;

- Found its id and unmount: `fdisk -ls` or `lsblk` and then `umount /dev/sdx`
- Format it: `sudo mkfs.ext4 /dev/sdX`
- Move ISO to pendrive: `sudo dd if=/path/to/.iso of=/dev/sdX bs=4M && sync`
