// BasicLib.jsx

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

	return myDoc;
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
