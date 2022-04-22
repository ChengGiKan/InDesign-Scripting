// CrossRefLib.jsx

function crossRefSetup(myDoc, crossRefArray) {
	if (crossRefArray == undefined)
		return;

	for (var ii = 0; ii < crossRefArray.length; ii++) {
		var item = crossRefArray[ii];
		SetupOneCrossReference(myDoc, item);
	}
}

// ===== Cross References =================================
function SetupOneCrossReference(myDoc, crossRefItem) {
	var nXName = crossRefItem["name"];
	var nCStyle = crossRefItem["csName"];

	if (nXName == undefined)
		return;
	if (nCStyle == undefined)
		return;

	var nXRef = myDoc.crossReferenceFormats.item(nXName);
	try {
		var myName = nXRef.name;
	}
	catch (myError) {
		if (nCStyle != "") {
			nXRef = myDoc.crossReferenceFormats.add();
			with (nXRef) {
				name = nXName;
				appliedCharacterStyle = myDoc.characterStyles.item(nCStyle);

				endOfNestedStyle = String.fromCharCode(3);
				tmpCustomText = " " + endOfNestedStyle;

				var b1 = buildingBlocks.add({ blockType: BuildingBlockTypes.CUSTOM_STRING_BUILDING_BLOCK, customText: tmpCustomText });
				var b2 = buildingBlocks.add({ blockType: BuildingBlockTypes.PARAGRAPH_NUMBER_BUILDING_BLOCK });
				// someStr = "";
				//var b3 = buildingBlocks.add({blockType: BuildingBlockTypes.CUSTOM_STRING_BUILDING_BLOCK, customText: someStr});
			}
		}
	}
}
