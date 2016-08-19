# `mvsd` - minimally viable slide deck

This is a minimal slide system that works *for me*.

Its features:

* HTML based
* Using CSS for scaling (pros: fast, hardware accelerated, nice and not janky, cons: only works on browsers that support flexbox)
* Lightweight, fast, no strange dependencies
* CSS that doesn't require super specific selectors to override default styles
* no build system required (no Grunt / Gulp / npm script / make / anything), just open `index.html` and go
* Source code syntax highlighting
* Support for full screen background images
* Support for iframes for showing inline demos
* Support for fragments

An example slide deck is in the [index.html](./index.html) file (or [online](https://sole.github.io/mvsd/)).

Another example with plenty of inline demos is my presentation on [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder_API): [online](https://soledadpenades.com/files/t/2016_rtalchemy/) and [sources](https://github.com/sole/mediarecorder-slides).

## To use

1. Download a ZIP of this repository (or clone if that's more your thing, but remember to remove the `.git` directory so you can do your own version control).
2. Edit `index.html` to add your own content, and edit or replace `css/style.css` to make it more your style. You shouldn't need to change any file in the `src/` folder.
3. SUCCESS

### Advanced use

You can edit `js/main.js` to control when are the slides created.

## Credits

This is heavily inspired by Potch's [decky](https://github.com/potch/decky/). Thanks, Potch!

## License

Basically you can *do whatever you want with it*, but if it was helpful for you, links to the repo or to my site (https://soledadpenades.com) are appreciated.

