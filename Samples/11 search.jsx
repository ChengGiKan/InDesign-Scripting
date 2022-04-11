#target "indesign"
main();

function main() {
    if (app.documents.length == 0)
        return;
    var myDoc = app.activeDocument;
    ReplaceText(myDoc);
    ReplaceWithGrep(myDoc);
}

function ReplaceText(myDoc) {

    app.findTextPreferences = NothingEnum.NOTHING;
    app.changeTextPreferences = NothingEnum.NOTHING;
    app.findTextPreferences.appliedCharacterStyle = myDoc.characterStyles.item("myTest1");
    app.findTextPreferences.findWhat = "test";
    app.changeTextPreferences.changeTo = "(test)";

    var myFindResults = myDoc.findText();
    var theFindResult = myFindResults[0];
    $.writeln(theFindResult.contents);

    myDoc.changeText();

    app.findTextPreferences = NothingEnum.NOTHING;
    app.changeTextPreferences = NothingEnum.NOTHING;
}

function ReplaceWithGrep(myDoc) {

    app.findGrepPreferences = NothingEnum.NOTHING;
    app.changeGrepPreferences = NothingEnum.NOTHING;
    app.findGrepPreferences.appliedCharacterStyle = myDoc.characterStyles.item("myTest1");
    app.findGrepPreferences.findWhat = "(.+)";
    app.changeGrepPreferences.changeTo = "($1)";

    var myFindResults = myDoc.findGrep();
    for (var ii = 0; ii < myFindResults.length; ii++) {
        var theFindResult = myFindResults[ii];
        $.writeln(theFindResult.contents);
    }

    myDoc.changeGrep();

    app.findGrepPreferences = NothingEnum.NOTHING;
    app.changeGrepPreferences = NothingEnum.NOTHING;
}
