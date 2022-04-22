// File name: MasterSpreadLib.jsx
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

function masterSpreadSetup(myDoc, masterSpreadsArray) {
	if (masterSpreadsArray == undefined)
		return;

	for (var ii = 0; ii < masterSpreadsArray.length; ii++) {
		var item = masterSpreadsArray[ii];
		SetupOneMasterSpread(myDoc, item);
	}
}

// ===== Master Spreads =================================
function SetupOneMasterSpread(myDoc, masterSpreadItem) {

	var msDefaultName = masterSpreadItem["defaultName"];
	var msBaseName = masterSpreadItem["baseName"];
	var msNamePrefix = masterSpreadItem["namePrefix"];

	var msLeftPage = masterSpreadItem["leftPage"];
	var msRightPage = masterSpreadItem["rightPage"];

	if (msBaseName == undefined)
		return;

	if (msNamePrefix == undefined)
		return;

	var nMSpA = null;
	if (msDefaultName != undefined && msDefaultName != "") {
		nMSpA = myDoc.masterSpreads.item("A-主版"); // will rename "A-主版"
		var RenameA = false;
		try {
			var myName = nMSpA.name;
		}
		catch (myError) {
			nMSpA = myDoc.masterSpreads.add();
		}
	} else {
		nMSpA = myDoc.masterSpreads.add();
	}

	with (nMSpA) {
		baseName = msBaseName;
		namePrefix = msNamePrefix;
		//Set up the left page (verso).
		if (msLeftPage != undefined) {
			handelPage(pages.item(0), msLeftPage);
		}
		//Set up the right page (recto).
		if (msRightPage != undefined) {
			handelPage(pages.item(1), msRightPage);
		}
	}
}

function handelPage(thePage, thePageItem) {
	with (thePage) {

		var msColumncount = thePageItem["columncount"];
		var msColumnGutter = thePageItem["columnGutter"];
		var msBottom = thePageItem["bottom"];
		var msLeft = thePageItem["left"];
		var msRight = thePageItem["right"];
		var msTop = thePageItem["top"];

		var msHeading = thePageItem["heading"];

		with (marginPreferences) {
			if (msColumncount != undefined && msColumncount > 0)
				columnCount = msColumncount;
			if (msColumnGutter != undefined && msColumnGutter != "")
				columnGutter = msColumnGutter;

			if (msBottom != undefined && msBottom != "")
				bottom = msBottom;
			//When document.documentPreferences.facingPages == true,
			//"left" means inside; "right" means outside.
			if (msLeft != undefined && msLeft != "")
				left = msLeft;
			if (msRight != undefined && msRight != "")
				right = msRight;
			if (msTop != undefined && msTop != "")
				top = msTop;
		}
		//Add a simple footer with a section number and page number.
		if (msHeading != undefined) {
			var hdTFs = msHeading["textFrames"];
			for (var ii = 0; ii < hdTFs.length; ii++) {
				var TFItem = hdTFs[ii];
				if (TFItem != undefined) {
					var tfGeoB = TFItem["geometricBounds"];
					var tfContents = TFItem["contents"];
					var tfJustification = TFItem["justification"];
					if (tfGeoB != undefined) {

						var theTF = textFrames.add();
						with (theTF) {

							geometricBounds = [tfGeoB[0], tfGeoB[1], tfGeoB[2], tfGeoB[3]];

							if (tfContents != undefined) {
								for (var jj = 0; jj < tfContents.length; jj++) {
									var contentItem = tfContents[jj];
									var twoStr = contentItem.split(".");

									if (twoStr.length == 1) {
										insertionPoints.item(0).contents = contentItem;
									}
									else if (twoStr[0] == "textVariableInstances") {
										insertionPoints.item(0).textVariableInstances.add({ associatedTextVariable: twoStr[1] });
									}
									else if (twoStr[0] == "SpecialCharacters") {
										insertionPoints.item(0).contents = getSpecialCharacters(twoStr[1]);
									}
								}
							}
							if (tfJustification != undefined)
								paragraphs.item(0).justification = getJustification(tfJustification); // Justification.rightAlign;
						} // with (theTF)
					} // if (tfGeoB != undefined)
				} // if (TFItem != undefined)
			} // for (var ii = 0; ii < hdTFs.length; ii++) 
		} // if (msHeading != undefined) 
	}
}

var SpecialtCharactersArray = {
	"arabicComma": SpecialCharacters.arabicComma, // ARABIC_COMMA
	"arabicKashida": SpecialCharacters.arabicKashida, // ARABIC_KASHIDA
	"arabicQuestionMark": SpecialCharacters.arabicQuestionMark, // ARABIC_QUESTION_MARK
	"arabicSemicolon": SpecialCharacters.arabicSemicolon, // ARABIC_SEMICOLON
	"autoPageNumber": SpecialCharacters.autoPageNumber, // AUTO_PAGE_NUMBER
	"bulletCharacter": SpecialCharacters.bulletCharacter, // BULLET_CHARACTER
	"columnBreak": SpecialCharacters.columnBreak, // COLUMN_BREAK
	"copyrightSymbol": SpecialCharacters.copyrightSymbol, // COPYRIGHT_SYMBOL
	"degreeSymbol": SpecialCharacters.degreeSymbol, // DEGREE_SYMBOL
	"discretionaryHyphen": SpecialCharacters.discretionaryHyphen, // DISCRETIONARY_HYPHEN
	"discretionaryLineBreak": SpecialCharacters.discretionaryLineBreak, // DISCRETIONARY_LINE_BREAK
	"dottedCircle": SpecialCharacters.dottedCircle, // DOTTED_CIRCLE
	"doubleLeftQuote": SpecialCharacters.doubleLeftQuote, // DOUBLE_LEFT_QUOTE
	"doubleRightQuote": SpecialCharacters.doubleRightQuote, // DOUBLE_RIGHT_QUOTE
	"doubleStraightQuote": SpecialCharacters.doubleStraightQuote, // DOUBLE_STRAIGHT_QUOTE
	"ellipsisCharacter": SpecialCharacters.ellipsisCharacter, // ELLIPSIS_CHARACTER
	"emDash": SpecialCharacters.emDash, // EM_DASH
	"emSpace": SpecialCharacters.emSpace, // EM_SPACE
	"endNestedStyle": SpecialCharacters.endNestedStyle, // END_NESTED_STYLE
	"enDash": SpecialCharacters.enDash, // EN_DASH
	"enSpace": SpecialCharacters.enSpace, // EN_SPACE
	"evenPageBreak": SpecialCharacters.evenPageBreak, // EVEN_PAGE_BREAK
	"figureSpace": SpecialCharacters.figureSpace, // FIGURE_SPACE
	"fixedWidthNonbreakingSpace": SpecialCharacters.fixedWidthNonbreakingSpace, // FIXED_WIDTH_NONBREAKING_SPACE
	"flushSpace": SpecialCharacters.flushSpace, // FLUSH_SPACE
	"footnoteSymbol": SpecialCharacters.footnoteSymbol, // FOOTNOTE_SYMBOL
	"forcedLineBreak": SpecialCharacters.forcedLineBreak, // FORCED_LINE_BREAK
	"frameBreak": SpecialCharacters.frameBreak, // FRAME_BREAK
	"hairSpace": SpecialCharacters.hairSpace, // HAIR_SPACE
	"hebrewGeresh": SpecialCharacters.hebrewGeresh, // HEBREW_GERESH
	"hebrewGershayim": SpecialCharacters.hebrewGershayim, // HEBREW_GERSHAYIM
	"hebrewMaqaf": SpecialCharacters.hebrewMaqaf, // HEBREW_MAQAF
	"hebrewSofPasuk": SpecialCharacters.hebrewSofPasuk, // HEBREW_SOF_PASUK
	"indentHereTab": SpecialCharacters.indentHereTab, // INDENT_HERE_TAB
	"leftToRightEmbedding": SpecialCharacters.leftToRightEmbedding, // LEFT_TO_RIGHT_EMBEDDING
	"leftToRightMark": SpecialCharacters.leftToRightMark, // LEFT_TO_RIGHT_MARK
	"leftToRightOverride": SpecialCharacters.leftToRightOverride, // LEFT_TO_RIGHT_OVERRIDE
	"nextPageNumber": SpecialCharacters.nextPageNumber, // NEXT_PAGE_NUMBER
	"nonbreakingHyphen": SpecialCharacters.nonbreakingHyphen, // NONBREAKING_HYPHEN
	"nonbreakingSpace": SpecialCharacters.nonbreakingSpace, // NONBREAKING_SPACE
	"oddPageBreak": SpecialCharacters.oddPageBreak, // ODD_PAGE_BREAK
	"pageBreak": SpecialCharacters.pageBreak, // PAGE_BREAK
	"paragraphSymbol": SpecialCharacters.paragraphSymbol, // PARAGRAPH_SYMBOL
	"popDirectionalFormatting": SpecialCharacters.popDirectionalFormatting, // POP_DIRECTIONAL_FORMATTING
	"previousPageNumber": SpecialCharacters.previousPageNumber, // PREVIOUS_PAGE_NUMBER
	"punctuationSpace": SpecialCharacters.punctuationSpace, // PUNCTUATION_SPACE
	"quarterSpace": SpecialCharacters.quarterSpace, // QUARTER_SPACE
	"registeredTrademark": SpecialCharacters.registeredTrademark, // REGISTERED_TRADEMARK
	"rightIndentTab": SpecialCharacters.rightIndentTab, // RIGHT_INDENT_TAB
	"rightToLeftEmbedding": SpecialCharacters.rightToLeftEmbedding, // RIGHT_TO_LEFT_EMBEDDING
	"rightToLeftMark": SpecialCharacters.rightToLeftMark, // RIGHT_TO_LEFT_MARK
	"rightToLeftOverride": SpecialCharacters.rightToLeftOverride, // RIGHT_TO_LEFT_OVERRIDE
	"sectionMarker": SpecialCharacters.sectionMarker, // SECTION_MARKER
	"sectionSymbol": SpecialCharacters.sectionSymbol, // SECTION_SYMBOL
	"singleLeftQuote": SpecialCharacters.singleLeftQuote, // SINGLE_LEFT_QUOTE
	"singleRightQuote": SpecialCharacters.singleRightQuote, // SINGLE_RIGHT_QUOTE
	"singleStraightQuote": SpecialCharacters.singleStraightQuote, // SINGLE_STRAIGHT_QUOTE
	"sixthSpace": SpecialCharacters.sixthSpace, // SIXTH_SPACE
	"textVariable": SpecialCharacters.textVariable, // TEXT_VARIABLE
	"thinSpace": SpecialCharacters.thinSpace, // THIN_SPACE
	"thirdSpace": SpecialCharacters.thirdSpace, // THIRD_SPACE
	"trademarkSymbol": SpecialCharacters.trademarkSymbol, // TRADEMARK_SYMBOL
	"zeroWidthJoiner": SpecialCharacters.zeroWidthJoiner, // ZERO_WIDTH_JOINER
	"zeroWidthNonjoiner": SpecialCharacters.zeroWidthNonjoiner // ZERO_WIDTH_NONJOINER
}

function getSpecialCharacters(spStr) {
	var spChar = null;
	switch (spStr) {
		case "arabicComma":
			spChar = SpecialCharacters.arabicComma; // ARABIC_COMMA
			break;
		case "arabicKashida":
			spChar = SpecialCharacters.arabicKashida; // ARABIC_KASHIDA
			break;
		case "arabicQuestionMark":
			spChar = SpecialCharacters.arabicQuestionMark; // ARABIC_QUESTION_MARK
			break;
		case "arabicSemicolon":
			spChar = SpecialCharacters.arabicSemicolon; // ARABIC_SEMICOLON
			break;
		case "autoPageNumber":
			spChar = SpecialCharacters.autoPageNumber; // AUTO_PAGE_NUMBER
			break;
		case "bulletCharacter":
			spChar = SpecialCharacters.bulletCharacter; // BULLET_CHARACTER
			break;
		case "columnBreak":
			spChar = SpecialCharacters.columnBreak; // COLUMN_BREAK
			break;
		case "copyrightSymbol":
			spChar = SpecialCharacters.copyrightSymbol; // COPYRIGHT_SYMBOL
			break;
		case "degreeSymbol":
			spChar = SpecialCharacters.degreeSymbol; // DEGREE_SYMBOL
			break;
		case "discretionaryHyphen":
			spChar = SpecialCharacters.discretionaryHyphen; // DISCRETIONARY_HYPHEN
			break;
		case "discretionaryLineBreak":
			spChar = SpecialCharacters.discretionaryLineBreak; // DISCRETIONARY_LINE_BREAK
			break;
		case "dottedCircle":
			spChar = SpecialCharacters.dottedCircle; // DOTTED_CIRCLE
			break;
		case "doubleLeftQuote":
			spChar = SpecialCharacters.doubleLeftQuote; // DOUBLE_LEFT_QUOTE
			break;
		case "doubleRightQuote":
			spChar = SpecialCharacters.doubleRightQuote; // DOUBLE_RIGHT_QUOTE
			break;
		case "doubleStraightQuote":
			spChar = SpecialCharacters.doubleStraightQuote; // DOUBLE_STRAIGHT_QUOTE
			break;
		case "ellipsisCharacter":
			spChar = SpecialCharacters.ellipsisCharacter; // ELLIPSIS_CHARACTER
			break;
		case "emDash":
			spChar = SpecialCharacters.emDash; // EM_DASH
			break;
		case "emSpace":
			spChar = SpecialCharacters.emSpace; // EM_SPACE
			break;
		case "endNestedStyle":
			spChar = SpecialCharacters.endNestedStyle; // END_NESTED_STYLE
			break;
		case "enDash":
			spChar = SpecialCharacters.enDash; // EN_DASH
			break;
		case "enSpace":
			spChar = SpecialCharacters.enSpace; // EN_SPACE
			break;
		case "evenPageBreak":
			spChar = SpecialCharacters.evenPageBreak; // EVEN_PAGE_BREAK
			break;
		case "figureSpace":
			spChar = SpecialCharacters.figureSpace; // FIGURE_SPACE
			break;
		case "fixedWidthNonbreakingSpace":
			spChar = SpecialCharacters.fixedWidthNonbreakingSpace; // FIXED_WIDTH_NONBREAKING_SPACE
			break;
		case "flushSpace":
			spChar = SpecialCharacters.flushSpace; // FLUSH_SPACE
			break;
		case "footnoteSymbol":
			spChar = SpecialCharacters.footnoteSymbol; // FOOTNOTE_SYMBOL
			break;
		case "forcedLineBreak":
			spChar = SpecialCharacters.forcedLineBreak; // FORCED_LINE_BREAK
			break;
		case "frameBreak":
			spChar = SpecialCharacters.frameBreak; // FRAME_BREAK
			break;
		case "hairSpace":
			spChar = SpecialCharacters.hairSpace; // HAIR_SPACE
			break;
		case "hebrewGeresh":
			spChar = SpecialCharacters.hebrewGeresh; // HEBREW_GERESH
			break;
		case "hebrewGershayim":
			spChar = SpecialCharacters.hebrewGershayim; // HEBREW_GERSHAYIM
			break;
		case "hebrewMaqaf":
			spChar = SpecialCharacters.hebrewMaqaf; // HEBREW_MAQAF
			break;
		case "hebrewSofPasuk":
			spChar = SpecialCharacters.hebrewSofPasuk; // HEBREW_SOF_PASUK
			break;
		case "indentHereTab":
			spChar = SpecialCharacters.indentHereTab; // INDENT_HERE_TAB
			break;
		case "leftToRightEmbedding":
			spChar = SpecialCharacters.leftToRightEmbedding; // LEFT_TO_RIGHT_EMBEDDING
			break;
		case "leftToRightMark":
			spChar = SpecialCharacters.leftToRightMark; // LEFT_TO_RIGHT_MARK
			break;
		case "leftToRightOverride":
			spChar = SpecialCharacters.leftToRightOverride; // LEFT_TO_RIGHT_OVERRIDE
			break;
		case "nextPageNumber":
			spChar = SpecialCharacters.nextPageNumber; // NEXT_PAGE_NUMBER
			break;
		case "nonbreakingHyphen":
			spChar = SpecialCharacters.nonbreakingHyphen; // NONBREAKING_HYPHEN
			break;
		case "nonbreakingSpace":
			spChar = SpecialCharacters.nonbreakingSpace; // NONBREAKING_SPACE
			break;
		case "oddPageBreak":
			spChar = SpecialCharacters.oddPageBreak; // ODD_PAGE_BREAK
			break;
		case "pageBreak":
			spChar = SpecialCharacters.pageBreak; // PAGE_BREAK
			break;
		case "paragraphSymbol":
			spChar = SpecialCharacters.paragraphSymbol; // PARAGRAPH_SYMBOL
			break;
		case "popDirectionalFormatting":
			spChar = SpecialCharacters.popDirectionalFormatting; // POP_DIRECTIONAL_FORMATTING
			break;
		case "previousPageNumber":
			spChar = SpecialCharacters.previousPageNumber; // PREVIOUS_PAGE_NUMBER
			break;
		case "punctuationSpace":
			spChar = SpecialCharacters.punctuationSpace; // PUNCTUATION_SPACE
			break;
		case "quarterSpace":
			spChar = SpecialCharacters.quarterSpace; // QUARTER_SPACE
			break;
		case "registeredTrademark":
			spChar = SpecialCharacters.registeredTrademark; // REGISTERED_TRADEMARK
			break;
		case "rightIndentTab":
			spChar = SpecialCharacters.rightIndentTab; // RIGHT_INDENT_TAB
			break;
		case "rightToLeftEmbedding":
			spChar = SpecialCharacters.rightToLeftEmbedding; // RIGHT_TO_LEFT_EMBEDDING
			break;
		case "rightToLeftMark":
			spChar = SpecialCharacters.rightToLeftMark; // RIGHT_TO_LEFT_MARK
			break;
		case "rightToLeftOverride":
			spChar = SpecialCharacters.rightToLeftOverride; // RIGHT_TO_LEFT_OVERRIDE
			break;
		case "sectionMarker":
			spChar = SpecialCharacters.sectionMarker; // SECTION_MARKER
			break;
		case "sectionSymbol":
			spChar = SpecialCharacters.sectionSymbol; // SECTION_SYMBOL
			break;
		case "singleLeftQuote":
			spChar = SpecialCharacters.singleLeftQuote; // SINGLE_LEFT_QUOTE
			break;
		case "singleRightQuote":
			spChar = SpecialCharacters.singleRightQuote; // SINGLE_RIGHT_QUOTE
			break;
		case "singleStraightQuote":
			spChar = SpecialCharacters.singleStraightQuote; // SINGLE_STRAIGHT_QUOTE
			break;
		case "sixthSpace":
			spChar = SpecialCharacters.sixthSpace; // SIXTH_SPACE
			break;
		case "textVariable":
			spChar = SpecialCharacters.textVariable; // TEXT_VARIABLE
			break;
		case "thinSpace":
			spChar = SpecialCharacters.thinSpace; // THIN_SPACE
			break;
		case "thirdSpace":
			spChar = SpecialCharacters.thirdSpace; // THIRD_SPACE
			break;
		case "trademarkSymbol":
			spChar = SpecialCharacters.trademarkSymbol; // TRADEMARK_SYMBOL
			break;
		case "zeroWidthJoiner":
			spChar = SpecialCharacters.zeroWidthJoiner; // ZERO_WIDTH_JOINER
			break;
		case "zeroWidthNonjoiner":
			spChar = SpecialCharacters.zeroWidthNonjoiner; // ZERO_WIDTH_NONJOINER
			break;
		default:
			spChar = "";
			break;
	}
	return spChar
}

function getJustification(jsStr) {
	var justification = null;
	switch (jsStr) {
		//case "AWAY_FROM_BINDING_SIDE":
		//	justification = Justification.awayFromBindingSide; // AWAY_FROM_BINDING_SIDE;
		//	break;
		case "CENTER_ALIGN":
			justification = Justification.centerAlign; // CENTER_ALIGN;
			break;
		case "CENTER_JUSTIFIED":
			justification = Justification.centerJustified; // CENTER_JUSTIFIED;
			break;
		case "FULLY_JUSTIFIED":
			justification = Justification.fullyJustified; // FULLY_JUSTIFIED;
			break;
		case "LEFT_ALIGN":
			justification = Justification.leftAlign; // LEFT_ALIGN;
			break;
		case "LEFT_JUSTIFIED":
			justification = Justification.leftJustified; // LEFT_JUSTIFIED;
			break;
		case "RIGHT_ALIGN":
			justification = Justification.rightAlign; // RIGHT_ALIGN;
			break;
		case "RIGHT_JUSTIFIED":
			justification = Justification.rightJustified; // RIGHT_JUSTIFIED;
			break;
		case "TO_BINDING_SIDE":
			justification = Justification.toBindingSide; // TO_BINDING_SIDE;
			break;
		default:
			justification = Justification.awayFromBindingSide; // AWAY_FROM_BINDING_SIDE;
			break;
	}
	return justification;
}