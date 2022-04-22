// File name: PStyleLib.jsx
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

function pStyleSetup(myDoc, pStylesArray, compoFonts) {
	if (pStylesArray == undefined)
		return;

	for (var ii = 0; ii < pStylesArray.length; ii++) {
		var item = pStylesArray[ii];
		SetupOnePStyle(myDoc, item, compoFonts);
	}
}

function SetupOnePStyle(myDoc, pStyleItem, compoFonts) {

	var nPSName = pStyleItem["name"];
	var FName = pStyleItem["fontName"];
	var FStyle = pStyleItem["fontStyle"];
	var FSize = pStyleItem["fontSize"];
	var nNextStyle = pStyleItem["nextStyle"];
	var runningHeaderItem = pStyleItem["running header"];

	if (nPSName == undefined)
		return;
	/*
	if (FName == undefined)
		return;
	if (FStyle == undefined)
		return;
	if (FSize == undefined)
		return;
	if (nNextStyle == undefined)
		return;
	*/

	var myParagraphStyle = myDoc.paragraphStyles.item(nPSName);
	try {
		var myName = myParagraphStyle.name;
	}
	catch (myError) {
		//The paragraph style did not exist, so create it.
		myParagraphStyle = myDoc.paragraphStyles.add({ name: nPSName });
	}
	with (myParagraphStyle) {
		//name = nPSName;
		if (FName != undefined) {
			if (compoFonts[FName] != undefined) {
				appliedFont = FName; //myDoc must be saved and reopened to make this line work.
			} else {
				var myError;
				try {
					var TheFontName = FName;
					if (FStyle == undefined || FStyle == "") {
						TheFontName = FName; //  + "\tRegular";
					} else {
						TheFontName = FName + "\t" + FStyle;
					}
					appliedFont = app.fonts.itemByName(TheFontName); // fonts are insalled in app
				}
				catch (myError) {
					var abab = myError.Message;
					abab = 2;
				}
			}
			if (FSize != undefined && FSize > 0)
				pointSize = FSize;
			myParagraphStyle.fillColor = myDoc.colors.itemByName("Black"); //("cr文字黑");

			if (nNextStyle != undefined && nNextStyle != "") {
				nextStyle = myDoc.paragraphStyles.item(nNextStyle);
			}
			//fontStyle = "L";
			//composer = "";
		}
	}

	// running header
	if (runningHeaderItem != undefined) {
		var rhListType = runningHeaderItem["listType"];
		var rhLevel = runningHeaderItem["level"];
		var rhNumberStyle = runningHeaderItem["numberStyle"];
		var rhNumberStr = runningHeaderItem["numberStr"];
		var rhCStyle = runningHeaderItem["cStyle"];

		with (myParagraphStyle) {
			//composer =
			if (rhListType != undefined && rhListType != "")
				bulletsAndNumberingListType = getListType(rhListType);
			if (rhLevel != undefined && rhLevel > 0)
				numberingLevel = rhLevel;
			if (rhNumberStyle != undefined && rhNumberStyle != "")
				numberingFormat = getNumberingStyle(rhNumberStyle);
			if (rhNumberStr != undefined && rhNumberStr != "")
				numberingExpression = rhNumberStr;
			numberingContinue = true; // 混合模式：true: 延續上一個; false: 開始處
			//numberingStartAt = ?; // numberingContinue == false;

			if (rhLevel != undefined && rhLevel > 1) {
				numberingApplyRestartPolicy = true; // 之後在此層級重新開始編號
				numberingRestartPolicies.numberingPolicy = RestartPolicy.ANY_PREVIOUS_LEVEL;
				// RestartPolicy.AFTER_SPECIFIC_LEVEL;
				// RestartPolicy.ANY_PREVIOUS_LEVEL;
				// RestartPolicy.RANGE_OF_LEVELS;
				var kkk = 1;
				kkk = 2;
			}

			if (rhCStyle != undefined && rhCStyle != "") {
				var myNestedStyle = nestedStyles.add();
				with (myNestedStyle) {
					appliedCharacterStyle = myDoc.characterStyles.item(rhCStyle);
					delimiter = NestedStyleDelimiters.SENTENCE; // ANY_WORD; //SENTENCE;
					inclusive = true; // true: applied through, 至; false: up to, 最多.
					repetition = 3;
				}
			}
		}
	}
}

function getNumberingStyle(nsStr) {
	var numberStyle = null;
	switch (nsStr) {
		//case "ARABIC":
		//	numberStyle = NumberingStyle.arabic; // ARABIC;
		//	break;
		case "ARABIC_ABJAD":
			numberStyle = NumberingStyle.arabicAbjad; // ARABIC_ABJAD;
			break;
		case "ARABIC_ALIF_BA_TAH":
			numberStyle = NumberingStyle.arabicAlifBaTah; // ARABIC_ALIF_BA_TAH;
			break;
		case "DOUBLE_LEADING_ZEROS":
			numberStyle = NumberingStyle.doubleLeadingZeros; // DOUBLE_LEADING_ZEROS;
			break;
		case "FORMAT_NONE":
			numberStyle = NumberingStyle.formatNone; // FORMAT_NONE;
			break;
		case "HEBREW_BIBLICAL":
			numberStyle = NumberingStyle.hebrewBiblical; // HEBREW_BIBLICAL;
			break;
		case "HEBREW_NON_STANDARD":
			numberStyle = NumberingStyle.hebrewNonStandard; // HEBREW_NON_STANDARD;
			break;
		case "KANJI":
			numberStyle = NumberingStyle.kanji; // KANJI;
			break;
		case "KATAKANA_MODERN":
			numberStyle = NumberingStyle.katakanaModern; // KATAKANA_MODERN;
			break;
		case "KATAKANA_TRADITIONAL":
			numberStyle = NumberingStyle.katakanaTraditional; // KATAKANA_TRADITIONAL;
			break;
		case "LOWER_LETTERS":
			numberStyle = NumberingStyle.lowerLetters; // LOWER_LETTERS;
			break;
		case "LOWER_ROMAN":
			numberStyle = NumberingStyle.lowerRoman; // LOWER_ROMAN;
			break;
		case "SINGLE_LEADING_ZEROS":
			numberStyle = NumberingStyle.singleLeadingZeros; // SINGLE_LEADING_ZEROS;
			break;
		case "TRIPLE_LEADING_ZEROS":
			numberStyle = NumberingStyle.tripleLeadingZeros; // TRIPLE_LEADING_ZEROS;
			break;
		case "UPPER_LETTERS":
			numberStyle = NumberingStyle.upperLetters; // UPPER_LETTERS;
			break;
		case "UPPER_ROMAN":
			numberStyle = NumberingStyle.upperRoman; // UPPER_ROMAN;
			break;
		default:
			numberStyle = NumberingStyle.arabic; // ARABIC;
			break;
	}
	return numberStyle
}

function getListType(ltStr) {
	var listType = null;
	switch (ltStr) {
		case "BULLET_LIST":
			listType = ListType.bulletList; //BULLET_LIST;
			break;
		case "NO_LIST":
			listType = ListType.noList; // NO_LIST;
			break;

		default:
			listType = ListType.numberedList; // NUMBERED_LIST;
			break;
	}
	return listType;
}