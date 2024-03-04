---
title: "Setting up void/arch step by step"
draft: false
---

*This page is a note for myself, it'll be updated as I learn new stuff.*

I still didn`t try gentoo but I may do someday.

The dream, the ultimate goal: [Linux from scratch](https://www.linuxfromscratch.org/)!

## essential tools in such "raw" distros

- those for developers like `make` `git` `gcc` `grep` etc...
- cliboard provider: xclipboard
- redshift:
    - redshift -O temperature
    - redshift Latitude...

## essential tools for me

- lunarvim or code-oss
- lua and luarocks
- haskell?

## dot files...

Always export environment variables in .bashrc instead of doing so just in the terminal, because they'll be erased next time terminal is closed

- `luarocks path >> .bashrc`

***It is great to have a script in order to set everything up just after intitialization (rfkill to unlock bluetooth, check locale, dwm-bar...)***

## on suckless

I love the [suckless](http://suckless.org/) proposal but since I'm kinda newbie it's not suitable to use as a daily driver.

<!-- ## testing others windown managers -->

## X11 confs

### .xinitrc

#### Touchpad

In order change its behavior, like click when just tapping or how the "right button" is recognized...

In /etc/X11/xorg.conf.d/30-touchpad.conf

Section "InputClass"
    Identifier "touchpad"
    Driver "libinput"
    MatchIsTouchpad "on"
    Option "Tapping" "on"
    Option "TappingButtonMap" "lmr"
EndSection


### Peripherals

<!-- #### Bluetooth -->
<!-- #### Microphone -->

### Changing settings...

#### locale

Just changing `/etc/locale.conf` seems to be not enough, so you also have to...

#### set multiple keyboard layouts

Add `setxkbmap -layout br,ru -option grp:shifts_toggle` to your .xinitrc

### Git and dev

#### import GPG key

Don't forget to import or create a gpg key (more about [here](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)):

- `gpg --full-generate-key`
- `gpg --import private.key`

It's also important to run this `[ -f ~/.bashrc ] && echo -e '\nexport GPG_TTY=$(tty)' >> ~/.bashrc`.

#### Essential global git config

```sh
git config --global user.name
git config --global user.email
git config --global init.defaultBranch main
git config --global user.signingkey
git config --global commit.gpgsign true
```

### runit or systemd?

No thoughts about this yet, I hope understand the quarrel someday...

<!-- #### Hibernate or suspend

xbps-install -S elogind polkit dbus
ln -srf /etc/sv/{dbus,polkitd,elogind} /var/service
 loginctl suspend loginctl hibernate -->
