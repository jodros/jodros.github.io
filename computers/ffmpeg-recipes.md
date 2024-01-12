---
title: 'FFMPEG recipes'
draft: true
---

`ffmpeg -i video.mp4 -i audio.wav -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 output.mp4`