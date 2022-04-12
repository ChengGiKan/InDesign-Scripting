// File name: ColorsLib.js
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