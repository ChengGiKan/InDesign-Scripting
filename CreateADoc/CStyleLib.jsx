// File name: CStyleLib.js
// Date: 2022-04-12

// MIT License
//
// Copyright (c) 2022 Cheng-I Chien, (GitHub accoutn: ChengGiKan)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

function cStyleSetup(myDoc, cStylesArray, compoFonts) {
	if (cStylesArray == undefined)
		return;

	for (var ii = 0; ii < cStylesArray.length; ii++) {
		var item = cStylesArray[ii];
		SetupOneCStyle(myDoc, item, compoFonts);
	}
}

// ===== Character Styles =================================
function SetupOneCStyle(myDoc, cStyleItem, compoFonts) {

	var nCSName = cStyleItem["name"];
	var FSize = cStyleItem["fontSize"];
	var FName = cStyleItem["fontName"];
	var FStyle = cStyleItem["fontStyle"];
	var nColor = cStyleItem["color"];

	if (nCSName == undefined)
		return;

	var myCharacterStyle = myDoc.characterStyles.item(nCSName);
	try {
		var myName = myCharacterStyle.name;
	}
	catch (myError) {
		//The paragraph style did not exist, so create it.
		myCharacterStyle = myDoc.characterStyles.add({ name: nCSName });
	}
	if (FName != undefined) {
		var done = false;
		if (compoFonts[FName] != undefined) {
			myCharacterStyle.appliedFont = FName; //myDoc must be saved and reopened to make this line work.
			done = true;
		}
		else {
			try {
				var TheFontName = FName;
				if (FStyle == undefined || FStyle == "") {
					TheFontName = FName;
				} else {
					TheFontName = FName + "\t" + FStyle;
				}
				myCharacterStyle.appliedFont = app.fonts.item(TheFontName); // myDoc.fonts.item(TheFontName); ---> fonts are insalled in app
				done = true;
			}
			catch (myError) {
				done = false;
			}
		}

		if (done == true && FSize != undefined && FSize > 0)
			myCharacterStyle.pointSize = FSize;
	}

	if (nColor != undefined && nColor != "") {
		try {
			myCharacterStyle.fillColor = myDoc.colors.itemByName(nColor);
		}
		catch (myError) {

		}
	} else {
		myCharacterStyle.fillColor = myDoc.colors.itemByName("Black");
	}

	var strikethroughItem = cStyleItem["strikethrough"];
	var underlineItem = cStyleItem["underline"];
	// strikethrough...
	if (strikethroughItem != undefined) {
		var stWeight = strikethroughItem["weight"];
		var stOffset = strikethroughItem["offset"];
		var stType = strikethroughItem["type"];
		var stColor = strikethroughItem["color"];
		with (myCharacterStyle) {
			strikeThru = true;
			if (stType != undefined && stType != "")
				strikeThroughType = app.strokeStyles.itemByName(stType);
			if (stWeight != undefined)
				strikeThroughWeight = stWeight;
			if (stOffset != undefined)
				strikeThroughOffset = stOffset;
			if (stColor != undefined && stColor != "") {
				try {
					strikeThroughColor = myDoc.colors.itemByName(stColor);
				}
				catch (x) {
					alert("Strikethrough Color: " + stColer + " does NOT exist!");
				}
				// strikeThroughTint = 50; // (色調 50%) // Tint of strike through will not be used.
			}
		}
	}

	// underline...
	if (underlineItem != undefined) {
		var ulWeight = underlineItem["weight"];
		var ulOffset = underlineItem["offset"];
		var ulType = underlineItem["type"];
		var ulColor = underlineItem["color"];
		with (myCharacterStyle) {
			underline = true;
			if (ulType != undefined && ulType != "")
				underlineType = app.strokeStyles.itemByName(ulType);
			if (ulWeight != undefined)
				underlineWeight = ulWeight;
			if (ulOffset != undefined)
				underlineOffset = ulOffset;
			if (ulColor != undefined && ulColor != "") {
				try {
					underlineColor = myDoc.colors.itemByName(ulColor);
				}
				catch (y) {
					alert("Underline Color: " + ulColor + " does NOT exist!");
				}
				// underlineTint = 50; // (色調 50%)
			}
		}
	}
}
