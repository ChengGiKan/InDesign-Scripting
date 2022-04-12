#target "indesign"

// File name: 11 search.js
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
