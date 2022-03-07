# color-gradient-dataviz
*Generating color gradients (in HEX values) for data visualization.*

https://sebastiansoderlund.github.io/color-gradient-dataviz/

## Tips on selecting colors for data viz:

-Use 1 or 2 hues for the gradients.

-Also consider using greyscales.

-Keep the number of gradients as low as possible, 4 or 5 rather than 7 or 8.

-Use lighter tones for lower values and the darker tones of larger values, the eye is drawn to darker colors on maps and charts.

-Use gradients for sequential data (ie quantitative/continous data), and avoid gradients for categorical data (qualitative).

## Articles on color conversions

https://en.wikipedia.org/wiki/HSL_and_HSV

http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/

## JavaScript conversion functions

```
function RGB2HSL(RGBColorVector) {
//Convert an RGB color value to HSL.
//Assumes R,G,B are in the range 0-255 and
//returns HSL values in the range 0-360 (hue) and 0-1 (saturation and luminosity).
}
```

```
function HSL2HEX(HSLColorVector, loop_index) {
//Convert an HSL color value to HEX.
//Assumes H,S,L are in the range 0-1 and
//returns a hex value in the range #000000-#ffffff.
}
```
