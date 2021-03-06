#target "indesign"

// File name: 12 Word Footnote.jsx
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