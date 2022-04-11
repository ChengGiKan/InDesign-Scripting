#target "InDesign"
main();
function main() {
    if (app.documents.length != 0)
        return -1;
    var myDoc = app.documents.add();

    var tf = myDoc.textFrames.add();

    tf.geometricBounds = new Array(20, 20, 100, 100);

    var instPoint = tf.insertionPoints.item(0);
    instPoint.contents = "Test" + "\r";
    // unicode input
    instPoint.contents += "排版" + " : " + "\u6392\u7248" + "\r";
    // 4-byte unicode input
    instPoint.contents += " 𠀂" + " : " + "\ud840\udc02" + "\r"; // U+20002

    var unit = myDoc.viewPreferences.horizontalMeasurementUnits;
    alert(unit.toString());
}