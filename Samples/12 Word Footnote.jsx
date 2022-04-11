#target "indesign"

main();

function main() {
    if (app.documents.length == 0)
        return;
    var myDoc = app.activeDocument;

    app.findGrepPreferences = NothingEnum.NOTHING;
    app.changeGrepPreferences = NothingEnum.NOTHING;

    app.findChangeGrepOptions.includeFootnotes = false;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = false;
    app.findChangeGrepOptions.includeMasterPages = false;

    app.findGrepPreferences.findWhat = "<<※(.*?)※>>";


    var findTheNotes = myDoc.findGrep();

    if (findTheNotes.length != 0) {
        for (var ii = findTheNotes.length - 1; ii >= 0; ii--) {
            var found = findTheNotes[ii];
            if (found == undefined)
                continue;

            found.select();

            var theNote = found.contents;
            theNote = theNote.substr(3, theNote.length - 6);

            var theParent = myDoc.selection[0].parent;
            var firstIndex = myDoc.selection[0].index;

            var insertPnt = theParent.insertionPoints.item(firstIndex);

            found.remove();

            var myfootnote = insertPnt.footnotes.add();

            myfootnote.insertionPoints.item(-1).contents = theNote;
        }
    }

    app.findGrepPreferences = NothingEnum.NOTHING;
    app.changeGrepPreferences = NothingEnum.NOTHING;
}