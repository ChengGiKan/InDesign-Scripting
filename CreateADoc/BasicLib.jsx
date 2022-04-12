// File name: BasicLib.js
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

function myCleanup(re1) {
	var theString = "Done.";
	if (re1 == 0) {
		theString = "First run: Done.";
	}

	var myDialog = app.dialogs.add({ name: "Function completed." });
	with (myDialog.dialogColumns.add()) {
		staticTexts.add({ staticLabel: theString });
	}
	var myResult = myDialog.show();
	//	if (myResult == true) {
	//		alert("You clicked the OK button");
	//	} else {
	//		alert("You clicked the Cancel button");
	//	}

	myDialog.destroy();
}

function scriptDone() {
	var theString = "Done.";

	var myDialog = app.dialogs.add({ name: "Function completed." });
	with (myDialog.dialogColumns.add()) {
		staticTexts.add({ staticLabel: theString });
	}
	var myResult = myDialog.show();
	//	if (myResult == true) {
	//		alert("You clicked the OK button");
	//	} else {
	//		alert("You clicked the Cancel button");
	//	}

	myDialog.destroy();
}

function basicSetup(theFileName, thePath, basicJSON) {
	var myDoc = null;

	for (var ii = 0; ii < app.documents.length; ii++) {
		var tmpDoc = app.documents.item(ii);
		if (tmpDoc.name == theFileName) {
			myDoc = tmpDoc;
			alert("Document: " + theFileName + " opened.\nPlease close it and delete it,\nor use another name.");
			return;
		}
	}

	myDoc = app.documents.add();
	myDocSetup(myDoc, basicJSON);
	/*
		var theFile = new File(thePath + theFileName);
		myDoc.save(theFile);
		myDoc.close();
	
		myDoc = app.open(theFile);
	*/
	return myDoc;
}

function StyleSetup() {
	var myDoc;
	if (app.documents.length == 0) {
		myDoc = app.documents.add();
	} else {
		myDoc = app.documents.item(0);
	}

	myCStylesSetup(myDoc);
	myCStylesSetupColorTest(myDoc); // new
	myPStylesSetup(myDoc);
	myTextVariablesSetup(myDoc);
	myCrossReferencesSetup(myDoc);
	myMasterSpreads(myDoc);
}

// Doc Setup ========================================
function myDocSetup(myDoc, basicJSON) {
	with (myDoc.documentPreferences) {
		// Page Size ==========

		if (basicJSON["pageHeight"] == undefined)
			pageHeight = "29.8cm";
		else
			pageHeight = basicJSON["pageHeight"];

		if (basicJSON["pageWidth"] == undefined)
			pageWidth = "21.6cm";
		else
			pageWidth = basicJSON["pageWidth"];

		if (basicJSON["pageOrientation"] == "portrait") // only two options
			pageOrientation = PageOrientation.portrait;
		else
			pageOrientation = PageOrientation.landscape;
		// pagesPerDocument = 16;

		if (basicJSON["facingPages"] == "true")
			facingPages = true;
		else
			facingPages = false;

		//Bleed ==========
		documentBleedUniformSize = true;
		if (basicJSON["documentBleedTopOffset"] == undefined)
			documentBleedTopOffset = "3p";
		else
			documentBleedTopOffset = basicJSON["documentBleedTopOffset"];
		//documentBleedBottomOffset = "3p";
		//documentBleedTopOffset = "3p";
		//documentBleedInsideOrLeftOffset = "3p";
		//documentBleedOutsideOrRightOffset = "3p";

		//Slug ==========
		documentSlugUniformSize = true;
		if (basicJSON["slugTopOffset"] == undefined)
			slugTopOffset = "5p";
		else
			slugTopOffset = basicJSON["slugTopOffset"];
		//slugBottomOffset = "18p";
		//slugTopOffset = "3p";
		//slugInsideOrLeftOffset = "3p";
		//slugRightOrOutsideOffset = "3p";
	}
	with (myDoc.pasteboardPreferences) {
		//You can use either a number or a measurement string
		//to set the space above/below.

		if (basicJSON["minimumSpaceAboveAndBelow"] == undefined)
			minimumSpaceAboveAndBelow = "12p"; // 12p
		else
			minimumSpaceAboveAndBelow = basicJSON["minimumSpaceAboveAndBelow"];
		//You can set the preview background color to any of
		//the predefined UIColor enumerations...
		//previewBackgroundColor = UIColors.gray;
		//...or you can specify an array of RGB values
		//(with values from 0 to 255)

		//previewBackgroundColor = [192, 192, 255];
		//bleedGuideColor = [0, 198, 192];
		//slugGuideColor = [192, 192, 192];
	}
	with (myDoc.viewPreferences) {
		switch (basicJSON["rulerOrigin"]) {
			case "spineOrigin":
				rulerOrigin = RulerOrigin.spineOrigin;
				break;
			case "spreadOrigin":
				rulerOrigin = RulerOrigin.spreadOrigin;
				break;
			default: // case "pageOrigin":
				rulerOrigin = RulerOrigin.pageOrigin;
		}

		horizontalMeasurementUnits = getUnit(basicJSON["horizontalMeasurementUnitsX"]);
		verticalMeasurementUnits = getUnit(basicJSON["verticalMeasurementUnits"]);
	}
}

function getUnit(unitStr) {
	var units = null;
	switch (unitStr) {
		case "agates":
			units = MeasurementUnits.agates;
			break;
		case "american_points":
			units = MeasurementUnits.americanPoints;
			break;
		case "bai":
			units = MeasurementUnits.bai;
			break;
		case "centimeters":
			units = MeasurementUnits.centimeters;
			break;
		case "ciceros":
			units = MeasurementUnits.ciceros;
			break;
		case "ha":
			units = MeasurementUnits.ha;
			break;
		case "inches":
			units = MeasurementUnits.inches;
			break;
		case "inches_decimal":
			units = MeasurementUnits.inchesDecimal;
			break;
		case "mils":
			units = MeasurementUnits.mils;
			break;
		case "picas":
			units = MeasurementUnits.picas;
			break;
		case "pixels":
			units = MeasurementUnits.pixels;
			break;
		case "points":
			units = MeasurementUnits.points;
			break;
		case "q":
			units = MeasurementUnits.q;
			break;
		case "u":
			units = MeasurementUnits.u;
			break;
		default: // custom and millimeters
			units = MeasurementUnits.millimeters;
			break;
	}
	return units;
}
