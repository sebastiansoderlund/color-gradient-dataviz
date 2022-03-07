function selectInitialColor() {
	var RGBColorVector = getInitialColor();

	var RGB2HEX = "#" + ((1 << 24) + (RGBColorVector.r << 16) + (RGBColorVector.g << 8) + RGBColorVector.b).toString(16).slice(1);

	document.getElementById("initial_color").style.backgroundColor = RGB2HEX;
}

function getInitialColor() {
	var r = document.getElementById("red").value;
	r = Math.round((r / 100) * 255);
	var g = document.getElementById("green").value;
	g = Math.round((g / 100) * 255);
	var b = document.getElementById("blue").value;
	b = Math.round((b / 100) * 255);
	return RGBColorVector = { "r": r, "g": g, "b": b }
}

function createGradient(ori) {
	if (ori.value > 1) {
		var RGBColorVector = getInitialColor();
		document.getElementById("color_gradients").innerHTML = '';
		for (let index = 0; index < ori.value; index++) {
			var hls = RGB2HSL(RGBColorVector);
			var hex = HSL2HEX(hls, index);
			document.getElementById("color_gradients").innerHTML += '<div style="width: 150px; height: 50px; background-color: ' + hex + ';"><span style="font-size:14px; color:#ffffff; font-weight:bold;">' + hex + '</span></div>';
		}
	}
}
/**
 * Convert an RGB color value to HSL.
 * Assumes R,G,B are in the range 0-255 and
 * returns HSL values in the range 0-360 (hue) and 0-1 (saturation and luminosity).
 *
 * @param {object} RGB Vector3 object containing the red, green, and blue channel data
 * @return {object} The HSL Vector3 object containing the H, S, and L representation
 */
function RGB2HSL(RGBColorVector) {
	var Hue;
	var Saturation;
	var Luminosity;

	var RChannel = RGBColorVector.r / 255;
	var GChannel = RGBColorVector.g / 255;
	var BChannel = RGBColorVector.b / 255;

	var MaxRGB = Math.max(RChannel, GChannel, BChannel);
	var MinRGB = Math.min(RChannel, GChannel, BChannel);
	Luminosity = (MaxRGB + MinRGB) / 2;
	if (MaxRGB - MinRGB == 0) {
		Saturation = 0.0; //If the min and max value are the same, it means that there is no saturation.
		Hue = 0.0; //If there is no Saturation, we don’t need to calculate the Hue. So we set it to 0 degrees.
	}
	else {
		var RGB_array = [RChannel, GChannel, BChannel];
		var index_of_max_value = RGB_array.indexOf(Math.max(RChannel, GChannel, BChannel));

		if (index_of_max_value == 0) {
			Hue = (GChannel - BChannel) / (MaxRGB - MinRGB); //If Red is max, then Hue = (G-B)/(max-min)
		}
		if (index_of_max_value == 1) {
			Hue = 2 + (BChannel - RChannel) / (MaxRGB - MinRGB); //If Green is max, then Hue = 2.0 + (B-R)/(max-min)
		}
		if (index_of_max_value == 2) {
			Hue = 4 + (RChannel - GChannel) / (MaxRGB - MinRGB);//If Blue is max, then Hue = 4.0 + (R-G)/(max-min)
		}
		Hue = Hue * 60;

		if (Luminosity <= 0.5) {
			Saturation = (MaxRGB - MinRGB) / (MaxRGB + MinRGB); //If Luminance is less or equal to 0.5, then Saturation = (max-min)/(max+min)
		}
		if (Luminosity > 0.5) {
			Saturation = (MaxRGB - MinRGB) / (2 - MaxRGB - MinRGB); //If Luminance is bigger then 0.5. then Saturation = ( max-min)/(2.0-max-min)
		}
	}
	return HSLColorVector = { "H": Hue, "S": Saturation, "L": Luminosity }
}
/**
 * Convert an HSL color value to HEX.
 * Assumes H,S,L are in the range 0-1 and
 * returns a hex value in the range #000000-#ffffff.
 *
 * @param {object} HSL Vector3 object containing the hue, saturation and luminosity
 * @param {number} loop_index Current iteration of the loop to create gradients
 * @return {string} The HEX representation
 */
function HSL2HEX(HSLColorVector, loop_index) {
	var Hue = HSLColorVector.H;
	var Saturation = HSLColorVector.S;
	var Luminosity = HSLColorVector.L;
	//Create the HEX gradient by lowering the Saturation
	switch (loop_index) {
		case 0:
			Saturation = Saturation * 0.9;
			Luminosity = Luminosity * 0.9;
			break;
		case 1:
			Saturation = Saturation * 0.8;
			Luminosity = Luminosity * 0.85;
			break;
		case 2:
			Saturation = Saturation * 0.7;
			Luminosity = Luminosity * 0.8;
			break;
		case 3:
			Saturation = Saturation * 0.6;
			Luminosity = Luminosity * 0.75;
			break;
		case 4:
			Saturation = Saturation * 0.5;
			Luminosity = Luminosity * 0.7;
			break;
		case 5:
			Saturation = Saturation * 0.4;
			Luminosity = Luminosity * 0.65;
			break;
		case 6:
			Saturation = Saturation * 0.3;
			Luminosity = Luminosity * 0.6;
			break;
		default:
			break;
	}
	//HSL to HEX conversion:
	var C = (1 - Math.abs(2 * Luminosity - 1)) * Saturation;
	var X = C * (1 - Math.abs(((Hue / 60) % 2) - 1));
	var m = Luminosity - C / 2;

	if (Hue >= 0 && Hue < 60) {
		var red = C;
		var green = X;
		var blue = 0;
	}
	if (Hue >= 60 && Hue < 120) {
		var red = X;
		var green = C;
		var blue = 0;
	}
	if (Hue >= 120 && Hue < 180) {
		var red = 0;
		var green = C;
		var blue = X;
	}
	if (Hue >= 180 && Hue < 240) {
		var red = 0;
		var green = X;
		var blue = C;
	}
	if (Hue >= 240 && Hue < 300) {
		var red = X;
		var green = 0;
		var blue = C;
	}
	if (Hue >= 300 && Hue < 360) {
		var red = C;
		var green = 0;
		var blue = X;
	}

	var RGB = [Math.round((red + m) * 255), Math.round((green + m) * 255), Math.round((blue + m) * 255)];

	var HEX = "#" + ((1 << 24) + (RGB[0] << 16) + (RGB[1] << 8) + RGB[2]).toString(16).slice(1);
	return HEX;
}