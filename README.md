# Performance matters

## About

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

# Audit

This project uses a modified Bootstrap page to test different optimization methods to speed the page up. Using feature branches I tested  in total 6 features/optimizations:
- ConcatCSS/ Clean/Uglify CSS 
- ConcatJS/ Clean/uglify JS
- Image optimizations 
- Fontfaceobserver
- Critical CSS rendering
- loadCSS


## Before any optimizations
![Before any optimizations](audit/before_opt.png)
All testing is done on regular 2G network throttling using Chrome dev tool. Before I did any optimizations, I checked to see what the score was to get a baseline and see if there are any improvements.


## After Clean + Concat/bundling CSS
![After clean CSS](audit/after_cleancss.png)
The first feature I tested was Clean/Concat CSS. The page was a bit slower a the score was lower than before. The base pagespeed insight score was 46/100 for desktop and after this it went to 45. But I decided to keep them and went on with the next optimizations. The reason is I use the bundled CSS later on to produce a Critical CSS stylesheet. More on that later.


## After Clean + Concat/bundling JavaScript
![After clean JS](audit/after_cleanjs.png)
I did the same with the Javascript as I did with the CSS. I uglified and used a Gulp plugin to bundle everything together. The Score is now 47/100.


## After image optimization
![After image compress](audit/after_imgopt.png)
I did some image compressing and the speed went up slightly. Partly because the images on the homepage were'nt that big, so the effect was not that big. The score is now 57/100 & 59/100. 

On top of that I also added webp to the images using a fallback to the compressed images. Using webp makes a significant difference. The ssore is now 56/100 & 65/100. The code for this:

```
<picture>
  <source type="image/webp" srcset="/assets/img/webp/sass-less.webp">
  <source srcset="/assets/img/sass-less.png">
  <img alt="Sass and Less support" class="img-responsive" src="/assets/img/sass-less.png">
</picture>
```
![after webp](audit/after_webp.png)


## After FontFaceObserver
After using the plugin, we get a score of 66/100 & 74/100. Besides that, we also store the new class in sessionStorage, so when the user reloads or goes to another page the font is known and we don't have to wait for it to load. Making the browsing experience a bit quicker and This eliminates FOIT("Flash of Invisible Text")
![after fontfaceobserver](audit/after_fontfaceobs.png)


## Critical CSS
I generated a critical css using [this site](https://jonassebastianohlsson.com/criticalpathcssgenerator/). The  as critical CSS to the inline in the <head>. I think it works as the pagespeeed insight score is now 66/100 & 75/100.
![after critical CSS](audit/after_critcss.png)

## After applying loadCSS
When throttling the cconnection to 2G (300ms), we see that the page loads way faster than without it. But the iniitial page doesnt look good because the nav is in the bootstrap.css folder, which we dont have in the critical CSS. We need to manually move that part of the code to the critical CSS for the page to look good, but I think it's worth it. Pagespeed Insight score is now: 92/100 & 86/100.
![after loadCSS](audit/after_loadcss.png)

## Final optimizations
After Gzipping and modifying the critical CSS, and putting the fontfaceobserver down at the bottom of the body I finaly got the 100/100 score. Web Page Test gives different results but I have records of the tests I've ran. I also removed loadCSS, although it made the page rendering faster the result was that the nav doesnt have any CSS in the beginning. Tha's something I have to look further into.

## Result 

Timeline:
- ![Timeline After](audit/timeline_after.png)

Pagespeed Insights:
![PageSpeedInsight After](audit/psi_after.png)

Network on regular 2G:
![Network 2G After](audit/network_after-2g.png)

