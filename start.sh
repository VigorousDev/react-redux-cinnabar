#!/usr/bin/env bash
npm run build
cp -R dist/* /usr/share/nginx/html
nginx
