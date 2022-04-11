#target "indesign"

useEncoded = false; // true: use jsxbin; false: use jsx
if (useEncoded) {
    var theFileName = $.fileName
    pathName = theFileName.substring(0, theFileName.lastIndexOf('/') + 1);
    var f = new File(pathName + '06_enc_2_lib.jsxbin');
    app.doScript(f);
} else {
    #include "06_enc_2_lib.jsx"
}

main();
function main() {
    if (app.documents.length != 0)
        return -1;

    var myDoc = app.documents.add();

    var tf = myDoc.textFrames.add();

    tf.geometricBounds = new Array(20, 20, 100, 100);

    var instPoint = tf.insertionPoints.item(0);
    printOut(instPoint);
}