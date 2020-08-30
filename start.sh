#!/usr/bin/env bash
python3 -m http.server -d static 80 &
node server.js
