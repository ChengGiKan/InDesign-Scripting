#target "indesign"

// File name: 10 Applying.js
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

main();

function main() {
	if (app.documents.length == 0)
		return;

	var myDoc = app.activeDocument;
	var datas = setupComponents(myDoc);
	var theFont = findFont("Times New Roman", "Regular");

	//applyFont(myDoc, theFont);
	//applyCStyle(myDoc, "測試Cstyle");
	applyCStyle(myDoc, "測試Cstyle-");
}

function applyFont(myDoc, font) {
	var theSelection = myDoc.selection;

	if (myDoc.selection.length > 0) {
		if ((myDoc.selection[0] instanceof Text) ||
			(myDoc.selection[0] instanceof Word) ||
			(myDoc.selection[0] instanceof Character) ||
			(myDoc.selection[0] instanceof TextStyleRange)) {

			var theSelection = myDoc.selection[0];
			if (font != null)
				theSelection.appliedFont = font;

			app.activate();
		}
	}
}

function applyCStyle(myDoc, cStyleName) {
	var theSelection = myDoc.selection;

	var cStyle = findCstyle(myDoc, cStyleName);

	if (myDoc.selection.length > 0) {
		if ((myDoc.selection[0] instanceof Text) ||
			(myDoc.selection[0] instanceof Word) ||
			(myDoc.selection[0] instanceof Character) ||
			(myDoc.selection[0] instanceof TextStyleRange)) {

			var theSelection = myDoc.selection[0];
			if (cStyle != null)
				theSelection.appliedCharacterStyle = cStyle;

			app.activate();
		}
	}
}

function findFont(fname, fstyle) {
	var theFont = null;
	try {
		theFont = app.fonts.itemByName(fname + "\t" + fstyle);
	}
	catch (myError) {
		theFont = app.fonts.itemByName("Tahoma\tRegular");
	}
	return theFont;
}

function findCstyle(myDoc, cStyleName) {
	var cStyle = null;
	try {
		cStyle = myDoc.characterStyles.itemByName(cStyleName);
	}
	catch (myError) {
		cStyle = null;
	}
	return cStyle;
}


function setupComponents(myDoc) {
	SetupOneColor(myDoc, "測試Color", 20, 90, 20, 10);
	SetupOneColor(myDoc, "測試ColorII", 10, 50, 100, 10);
	SetupOneColor(myDoc, "測試文字黑", 0, 0, 0, 100);

	SetupOneCStyle(myDoc, "測試Cstyle", 12, "Charis SIL", "Regular", 0, 0, 0, "", 0, 0, 0);
	SetupOneCStyle(myDoc, "測試Cstyle-", 12, "Charis SIL", "Regular", 0, 0, 0, "測試Color", 0, 0, 0);
	AdjustCStyleStrikethrough(myDoc, "測試Cstyle-", "測試ColorII", 0.5, -1.3, "實線");
}

// ===== Colors ===========================================
function SetupOneColor(myDoc, cName, cC, cM, cY, cK) {
	var myColor = myDoc.colors.item(cName);
	try {
		var myName = myColor.name;
	}
	catch (myError) {
		//The color did not exist, so create it.
		myColor = myDoc.colors.add({ name: cName, model: ColorModel.process, colorValue: [cC, cM, cY, cK] });
	}
}

// ===== Character Styles =================================
function SetupOneCStyle(myDoc, nCSName, FSize, FName, FStyle, ULWidth, ULHeigh, ULOffset, nColor, SthWidth, SthType, SthOffset) {
	var myCharacterStyle = myDoc.characterStyles.item(nCSName);
	try {
		var myName = myCharacterStyle.name;
	}
	catch (myError) {
		//The paragraph style did not exist, so create it.
		myCharacterStyle = myDoc.characterStyles.add({ name: nCSName });
	}
	if (FSize > 0) {
		try {
			var TheFontName = FName;
			if (FStyle == "") {
				TheFontName = FName;
			} else {
				TheFontName = FName + "\t" + FStyle;
			}
			myCharacterStyle.appliedFont = app.fonts.item(TheFontName);
		}
		catch (myError) {
			var abx = myError.message;
			var abx = 2;
		}
		myCharacterStyle.pointSize = FSize;
	}
	if (nColor != "") {
		try {
			myCharacterStyle.fillColor = myDoc.colors.itemByName(nColor);
		}
		catch (myError) {
			var abx = 1;
			abx = 2;
		}
	} else {
		myCharacterStyle.fillColor = myDoc.colors.itemByName("測試文字黑");
	}
}

// function name uses InD real name of Strikethrough.
function AdjustCStyleStrikethrough(myDoc, nCSName, nColor, Width, Offset, Type) {
	var myCharacterStyle = myDoc.characterStyles.item(nCSName);
	try {
		var myName = myCharacterStyle.name;
	}
	catch (myError) {
		//The paragraph style did not exist, so create it.
		myCharacterStyle = myDoc.characterStyles.add({ name: nCSName });
	}
	with (myCharacterStyle) {
		strikeThru = true;
		if (Type != "") {
			strikeThroughType = app.strokeStyles.itemByName(Type);
		}
		strikeThroughWeight = Width;
		strikeThroughOffset = Offset;
		if (nColor != "") {
			strikeThroughColor = myDoc.colors.itemByName(nColor);
			//strikeThroughTint = 50; // (色調 50%) // Tint of strike through will not be used.
		}
	}
}