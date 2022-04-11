// ReadData.jsx

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