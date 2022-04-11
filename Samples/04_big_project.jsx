#target "InDesign"
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