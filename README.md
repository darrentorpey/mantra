# Mantra: An HTML5 2D game prototyping engine ##

## Overview

Mantra is an HTML5 2D game prototyping engine written in CoffeeScript that I started writing a few years ago so that I could jam out games more easily at events like the [Global Game Jam](http://globalgamejam.org/) and at [Boston Game Jams](http://bostongamejams.com/).

## Tech

* Canvas-based graphics
* Audio support is (temporarily) provided by the Sound Manager 2 Javascript library

## Getting started

Use the two demo games to get an idea of how Mantra works.

To run a demo game, include the _dist/mantra\_all.js_ file and then, on page load, call _GameLauncher.launchInto(GAME, CANVAS)_ where GAME is one of the game classes and CANVAS is canvas DOM element. For example, _GameLauncher.launchInto(EightByFive, document.getElementsByTagName('canvas')[0])_ would load the "8by5" game into the first canvas DOM element on the page.

## Attributions

"Evil Aliens" demo based on Seth Ladd's talk @ Google I/O 2011: "Super Browser 2 Turbo HD Remix: Introduction to HTML5 Game Development"
