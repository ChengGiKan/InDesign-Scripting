// File name: ReadData.jsx
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

#include "json2.js"

function readData(fileName) {
    var jsName = $.fileName;
    var thePath = jsName.substring(0, jsName.lastIndexOf("/") + 1);
    var theFile = new File(thePath + fileName);

    if (!theFile.exists) {
        $.writeln("File: " + thePath + fileName + " does not exist.");
        return null;
    }

    theFile.open("r");
    var jsonStr = theFile.read();
    theFile.close();

    var jsonObj = null;

    try {
        jsonObj = JSON.parse(jsonStr);
    }
    catch (_) {
        jsonObj = null;
    }

    return jsonObj;
}

function readDataDlg() {
    var theFile = File.openDialog("Open the file:");

    if (theFile == null) // user clicks "cancel"
    {
        return null;
    }

    var thePath = theFile.path;

    theFile.open("r");
    var jsonStr = theFile.read();
    theFile.close();

    var jsonObj = null;

    try {
        jsonObj = JSON.parse(jsonStr);
        jsonObj["Json Path"] = thePath;
    }
    catch (_) {
        jsonObj = null;
    }

    return jsonObj;
}
