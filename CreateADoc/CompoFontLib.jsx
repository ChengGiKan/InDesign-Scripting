// File name: CompoFontLib.js
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

function compoFontSetup(myDoc, compoFontsArray) {
	if (compoFontsArray == undefined)
		return undefined;
	var compoFonts = {};

	for (var ii = 0; ii < compoFontsArray.length; ii++) {
		var item = compoFontsArray[ii];
		var data = SetupOneCompFont(myDoc, item);
		if (data != []) {
			compoFonts[data[0]] = data[0]; // put the compo font name as key and value : data[0]
		}
	}
	return compoFonts;
}

function SetupOneCompFont(myDoc, cmpFntItem) {
	var nFName = cmpFntItem["name"];
	var nHanName = cmpFntItem["hanName"];
	var nHanStyle = cmpFntItem["hanStyle"];
	var nRomName = cmpFntItem["romName"];
	var nRomStyle = cmpFntItem["romStyle"];

	if (nFName == undefined)
		return [];
	if (nHanName == undefined)
		return [];
	if (nHanStyle == undefined)
		return [];
	if (nRomName == undefined)
		return [];
	if (nRomStyle == undefined)
		return [];

	var nCF = myDoc.compositeFonts.item(nFName); // the fontname will be in Doc.compositeFonts and App.fonts
	//var nCF = app.compositeFonts.item(nFName); // Not Good, some will be shown in App.fonts, but the other will have [fontname] in CompositeFont Dialog after no document opened.
	try {
		var myName = nCF.name;
	}
	catch (myError) {
		nCF = myDoc.compositeFonts.add(); // the fontname will be in Doc.compositeFonts and App.fonts
		//nCF = app.compositeFonts.add();  // Not Good, some will be shown in App.fonts, but the other will have [fontname] in CompositeFont Dialog after no document opened.
		with (nCF) {
			name = nFName; // name of compositeFont

			var idx;
			for (idx = 0; idx < 5; idx++) {
				//console.log('Walking east one step');
				with (compositeFontEntries.item(idx)) {
					if (name == "漢字" || name == "標點符號" || name == "符號") { // name of compositeFont.compositeFontEntries
						try {
							appliedFont = app.fonts.item(nHanName);//nHanName;
						}
						catch (myError1) {

						}
						fontStyle = nHanStyle;
					} else {
						try {
							appliedFont = app.fonts.item(nRomName); //nRomName;
						}
						catch (myError2) {

						}
						fontStyle = nRomStyle;
						if (nRomName == "Charis SIL") {
							baselineShift = 4.4;
						}
					}
				}
			}
		}
	}
	return [nFName, nCF];
}
