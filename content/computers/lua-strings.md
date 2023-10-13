---
title: "Lua Strings"
date: 2023-08-09T20:14:57-03:00
draft: true
---


### Replacing all occurrences of the pattern

`string.gsub(str, pattern, replacement)`

### Print every match

We don't need to use `string.gmatch` in a for loop to do so if you only want to see the matches. The `string.gsub` function does the job for us, just pass the print function instead of a replacement:

`string.gsub(str, pattern, print)`

### Find files by their extension

`string.match(str, ".extension")`

### Find position where there is a sequence

`string.find(str, pattern)`

Find is useful if you want to get the position where the pattern occurs so use `string.find`.
