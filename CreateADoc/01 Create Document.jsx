#target "indesign"
// 01 Create Document.jsx

#include "BasicLib.jsx"        // Basc
#include "ColorLib.jsx"        // Colr
#include "CompoFontLib.jsx"    // Cfnt
#include "CrossRefLib.jsx"     // Cref
#include "CStyleLib.jsx"       // Csty
#include "MasterSpreadLib.jsx" // Mspd
#include "PStyleLib.jsx"       // Psty
#include "ReadData.jsx"        // Data
#include "TextVarLib.jsx"      // Tvar

main();

function main() {
	var jsonObj = readDataDlg();
	if (jsonObj == null)
		return;

	var osOK = checkOS(jsonObj["OS"]);
	if (osOK < 0) {
		var osName = "Windows";
		if (osOK == -1) {
			osName = "Mac"
		}
		alert("Wrong setting file.\nPlease choose the setting file for " + osName + ".")
		return;
	}

	var documentName = jsonObj["Document Name"];
	var documentPath = jsonObj["Document Path"];
	var jsonPath = jsonObj["Json Path"];

	documentPath = setupPath(documentPath);
	jsonPath = setupPath(jsonPath);

	var theFileName = documentName + ".indd";

	var result = checkFileExists(theFileName, documentPath, jsonPath);
	if (result[0] == true) {
		alert("File \"" + theFileName + "\" exsits.\nPlease delete it and run this script again.\nThis program ends.");
		return;
	}
	var thePath = result[1];

	var basicSettingsJSON = jsonObj["Basic Settings"];
	var colorsArrayJSON = jsonObj["Colors"];
	var compositeFontsArrayJSON = jsonObj["Composite Fonts"];
	var crossRefsArrayJSON = jsonObj["Cross Refs"];
	var cStylesArrayJSON = jsonObj["CStyles"];
	var masterSpreadsArrayJSON = jsonObj["Master Spreads"];
	var pStylesArrayJSON = jsonObj["PStyles"];
	var textVarsCStyleArrayJSON = jsonObj["Text Vars CStyle"];

	// setup the document
	// the calling order of the following function is very important!
	var myDoc = basicSetup(theFileName, thePath, basicSettingsJSON);
	colorSetup(myDoc, colorsArrayJSON);
	var compoFonts = compoFontSetup(myDoc, compositeFontsArrayJSON);

	// in order to make composite font word for setting cstyle and pstyle
	myDoc.save(new File(thePath + theFileName));
	myDoc.close();
	myDoc = app.open(new File(thePath + theFileName), true, OpenOptions.DEFAULT_VALUE);

	cStyleSetup(myDoc, cStylesArrayJSON, compoFonts);
	pStyleSetup(myDoc, pStylesArrayJSON, compoFonts);
	textVarSetup(myDoc, textVarsCStyleArrayJSON);
	crossRefSetup(myDoc, crossRefsArrayJSON);
	masterSpreadSetup(myDoc, masterSpreadsArrayJSON);
	// setup the document: done.

	gotoThePage(myDoc.pages.item(0));

	myDoc.save();
	scriptDone();
}

function countSep(sep, theStr) {
	var pos = 0;
	var nn = 0;
	while (true) {
		pos = theStr.indexOf(sep, pos);
		if (pos >= 0) {
			++nn;
			pos += 1;
		} else break;
	}
	return nn;
}

function setupPath(thePath) {
	if (thePath == undefined)
		return "";
	if (thePath == "")
		return "";

	var thePathX = new Folder(thePath);
	thePath = thePathX.fullName;

	if (thePath[thePath.length - 1] != "/")
		thePath += "/";

	return thePath;
}

function checkFileExists(fileName, documentPath, jsonPath) {
	var theFile = null;
	var thePath = "";
	if (documentPath != 0) {
		theFile = new File(documentPath + fileName);
		thePath = documentPath;
	} else {
		theFile = new File(jsonPath + fileName);
		thePath = jsonPath;
	}

	var result = false;
	if (theFile.exists) {
		result = true;
	}
	return [result, thePath];
}

function gotoThePage(thePage) {
	app.activeWindow.activePage = thePage;
}

function checkOS(osInFile) {
	var kk = $.os;
	var os = $.os.substring(0, 3).toLowerCase();
	if (os == osInFile)
		return 0;
	if (os == "win")
		return -2;
	return -1;
}