// CompoFontLib.jsx

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
