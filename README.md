# Mantra: An HTML5 2D game prototyping engine ##

## Overview

Mantra is an HTML5 2D game prototyping engine written in CoffeeScript that I started writing a few years ago so that I could jam out games more easily at events like the [Global Game Jam](http://globalgamejam.org/) and at [Boston Game Jams](http://bostongamejams.com/).


## Tech

* Canvas-based graphics
* Written in [CoffeeScript](http://coffeescript.org/) and compiled and concatenated into _dist/mantra\_all.js_ by [Interleave](https://github.com/buildjs/interleave).
* Audio support is (temporarily) provided by the Sound Manager 2 Javascript library


## Getting started

Use the two demo games to get an idea of how Mantra works.

To run a demo game, include the _dist/mantra\_all.js_ file and then, on page load, call _GameLauncher.launchInto(GAME, CANVAS)_ where GAME is one of the game classes and CANVAS is canvas DOM element. For example, _GameLauncher.launchInto(EightByFive, document.getElementsByTagName('canvas')[0])_ would load the "8by5" game into the first canvas DOM element on the page.

I have included two ready-to-go HTML file for this, _demos/eight\_by\_five.html_ and _demos/evil\_aliens.html_.

If you have [Node](http://nodejs.org/) installed, just install the "send" package ( *npm install send* ), run the "demoserver.js" server ( *node demoserver.js* ), and then go to /demos/eight\_by\_five.html and /demos/evil\_aliens.html on that server to play the games. Their source code is in /mantra/games within this repo.


## Attributions

"Evil Aliens" demo based on Seth Ladd's talk @ Google I/O 2011: "Super Browser 2 Turbo HD Remix: Introduction to HTML5 Game Development"
