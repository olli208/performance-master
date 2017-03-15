# Performance matters

## Project setup

This project serves an adapted version of the [Bootstrap documentation website](http://getbootstrap.com/). It is based on the [github pages branche of Bootstrap](https://github.com/twbs/bootstrap/tree/gh-pages). 

Differences from actual Bootstrap documentation:

- Added custom webfont
- Removed third party scripts
- The src directory is served with [Express](https://expressjs.com/).
- Templating is done with [Nunjucks](https://mozilla.github.io/nunjucks/)

## Getting started

- Install dependencies: `npm install`
- Serve: `npm start`
- Expose localhost: `npm run expose`

## After Clean/Concast CSS
It got worse. The base pagespeed insight score was 46 for dektop and after this it went to 45.

## After uglify js and bundling the JS files
score is now 47/100.

## After image optimization
score is now 57/100 & 59/100. 

Using webp makes a significant difference. The ssore is now 56/100 & 65/100.

## After FontFaceObserver

After using the plugin, we get a score of 66/100 & 74/100. Besides that, we also store the new class in sessionStorage, so when the user reloads or goes to another page the font is known and we don't have to wait for it to load. Making the browsing experience a bit quicker and This eliminates FOIT("Flash of Invisible Text")