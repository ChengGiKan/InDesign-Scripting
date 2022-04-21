#target "InDesign"

// File name: 04_big_project.jsx
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

#include "04_big_project_lib.jsx"
main();
function main() {
    if (app.documents.length != 0)
        return -1;
    var myDoc = app.documents.add();

    var tf = myDoc.textFrames.add();

    tf.geometricBounds = new Array(20, 20, 160, 100);

    var instPoint = tf.insertionPoints.item(0);

    inputUnicode(instPoint);

    // 4-byte unicode input
    instPoint.contents += "CJK Unified Ideographs Extension B\r";
    instPoint.contents += "U+24A8D: " + "𤪍" + " : " + "\ud852\ude8d" + "\r";
    instPoint.contents += "U+24AA1: " + "𤪡" + " : " + "\ud852\udea1" + "\r";

    instPoint.contents += "CJK Unified Ideographs Extension C\r";
    instPoint.contents += "U+2B522: " + "𫔢" + " : " + "\ud86d\udd22" + "\r";
    instPoint.contents += "U+2B597: " + "𫖗" + " : " + "\ud86d\udd97" + "\r";

    instPoint.contents += "CJK Unified Ideographs Extension D\r";
    instPoint.contents += "U+2B75C: " + "𫝜" + " : " + "\ud86d\udf5c" + "\r";
    instPoint.contents += "U+2B77A: " + "𫝺" + " : " + "\ud86d\udf7a" + "\r";
}
