// File name: TextVarLib.jsx
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

// ===== Text Variables ==================================
// TextVariable.variableOptions  (Read Only)
// Data Type: varies
// Adobe InDesign CC 2017 (12.1) Object Model
// The preferences associated with the text variable. Can return:
//
// PageNumberVariablePreference,
// ChapterNumberVariablePreference,
// DateVariablePreference,
// FileNameVariablePreference,
// MatchCharacterStylePreference,
// MatchParagraphStylePreference,
// CustomTextVariablePreference,
// CaptionMetadataVariablePreference.

// VariableTypes:
// 1668183152	VariableTypes.CHAPTER_NUMBER_TYPE
// 1414947684	VariableTypes.CREATION_DATE_TYPE
// 1414947700	VariableTypes.CUSTOM_TEXT_TYPE
// 1414948462	VariableTypes.FILE_NAME_TYPE
// 1414952048	VariableTypes.LAST_PAGE_NUMBER_TYPE
// 1414947693	VariableTypes.LIVE_CAPTION_TYPE
// 1414947667	VariableTypes.MATCH_CHARACTER_STYLE_TYPE
// 1396794992	SearchStrategies.FIRST_ON_PAGE
// 1396796528	SearchStrategies.LAST_ON_PAGE
// 1414950995	VariableTypes.MATCH_PARAGRAPH_STYLE_TYPE
// 1414950244	VariableTypes.MODIFICATION_DATE_TYPE
// 1414950756	VariableTypes.OUTPUT_DATE_TYPE
// 1414947694	VariableTypes.XREF_CHAPTER_NUMBER_TYPE
// 1414953074	VariableTypes.XREF_PAGE_NUMBER_TYPE

function textVarSetup(myDoc, textVarsArray) {
	if (textVarsArray == undefined)
		return;

	for (var ii = 0; ii < textVarsArray.length; ii++) {
		var item = textVarsArray[ii];
		SetupOneTextVariable(myDoc, item);
	}
}

function SetupOneTextVariable(myDoc, textVarItem) {
	var nTVName = textVarItem["name"];
	var nType = textVarItem["variableTypes"];
	var nCStyle = textVarItem["cStyle"];
	var nSearch = textVarItem["searchStrategies"];

	if (nTVName == undefined)
		return;
	if (nType == undefined)
		return;
	if (nCStyle == undefined)
		return;
	if (nSearch == undefined)
		return;

	var nTV = myDoc.textVariables.item(nTVName);
	try {
		var myName = nTV.name;
	}
	catch (myError) {
		nTV = myDoc.textVariables.add();
		with (nTV) {
			name = nTVName;
			variableType = getVariableTypes(nType);
			if (nType == "MATCH_CHARACTER_STYLE_TYPE") {
				var varOptions = variableOptions;
				with (varOptions) {
					appliedCharacterStyle = myDoc.characterStyles.item(nCStyle);
					searchStrategy = getSearchStrategies(nSearch);
					// textAfter = "";
					// textBefore = "";
				}
			}
		}
	}
}

function getSearchStrategies(sgStr) {
	var sType = null;
	switch (sgStr) {
		case "LAST_ON_PAGE":
			sType = SearchStrategies.lastOnPage; // LAST_ON_PAGE
			break;
		default:
			sType = SearchStrategies.firstOnPage; // FIRST_ON_PAGE
			break;
	}
	return sType;
}

function getVariableTypes(vtStr) {
	var vType = null;
	switch (vtStr) {
		case "CHAPTER_NUMBER_TYPE":
			vType = VariableTypes.chapterNumberType; // CHAPTER_NUMBER_TYPE;
			break;
		case "CREATION_DATE_TYPE":
			vType = VariableTypes.creationDateType; // CREATION_DATE_TYPE;
			break;
		//case "CUSTOM_TEXT_TYPE":
		//	vType = VariableTypes.customTextType; // CUSTOM_TEXT_TYPE;
		//	break;
		case "FILE_NAME_TYPE":
			vType = VariableTypes.fileNameType; // FILE_NAME_TYPE;
			break;
		case "LAST_PAGE_NUMBER_TYPE":
			vType = VariableTypes.lastPageNumberType; // LAST_PAGE_NUMBER_TYPE;
			break;
		case "LIVE_CAPTION_TYPE":
			vType = VariableTypes.liveCaptionType; // LIVE_CAPTION_TYPE;
			break;
		case "MATCH_PARAGRAPH_STYLE_TYPE":
			vType = VariableTypes.matchParagraphStyleType; // MATCH_PARAGRAPH_STYLE_TYPE;
			break;
		case "MODIFICATION_DATE_TYPE":
			vType = VariableTypes.modificationDateType; // MODIFICATION_DATE_TYPE;
			break;
		case "OUTPUT_DATE_TYPE":
			vType = VariableTypes.outputDateType; // OUTPUT_DATE_TYPE;
			break;
		case "XREF_CHAPTER_NUMBER_TYPE":
			vType = VariableTypes.xrefChapterNumberType; // XREF_CHAPTER_NUMBER_TYPE;
			break;
		case "XREF_PAGE_NUMBER_TYPE":
			vType = VariableTypes.xrefPageNumberType; // XREF_PAGE_NUMBER_TYPE;
			break;
		default:
			vType = VariableTypes.matchCharacterStyleType; // matchCharacterStyleType; // MATCH_CHARACTER_STYLE_TYPE;
			break;
	}
	return vType;
}
