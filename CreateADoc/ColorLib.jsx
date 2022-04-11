// ColorsLib.jsx

function colorSetup(myDoc, colorsArray) {
	if (colorsArray == undefined)
		return;
		
	for (var ii = 0; ii < colorsArray.length; ii++) {
		var item = colorsArray[ii];
		SetupOneColor(myDoc, item);
	}
}

function SetupOneColor(myDoc, colorItem) {
	var cName = colorItem["name"];
	var cC = colorItem["C"];
	var cM = colorItem["M"];
	var cY = colorItem["Y"];
	var cK = colorItem["K"];

	var isUndefinded = false;
	if (cName == undefined)
		return;
	if (cC == undefined)
		return;
	if (cM == undefined)
		return;
	if (cY == undefined)
		return;
	if (cK == undefined)
		return;

	var myColor = myDoc.colors.itemByName(cName);
	try {
		var myName = myColor.name;
	}
	catch (myError) {
		//The color did not exist, so create it.
		myColor = myDoc.colors.add({ name: cName, model: ColorModel.process, colorValue: [cC, cM, cY, cK] });
	}
}