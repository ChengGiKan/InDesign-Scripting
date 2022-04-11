#targetengine "session"
// not needed in Illustrator/AfterEffects
// the above line is necessary to create a modeless dialog with
// var win = new Window("palette", ...);
//
// refer to the sample program from Adobe: "SnpCreateDialog.jsx".
// Which is usually located at the folder (Windows):
// C:\Program Files (x86)\Adobe\Adobe ExtendScript Toolkit CC\SDK\Samples\javascript

// Beginning of the coding pattern of the Modeless Dialog----------------------
function DemoOfMoveCursorSelectTextModelessDialog() {
    this.windowRef = null;
}

function setupWindow() {
    var ww = new Window("palette", "Demo of Moving Cursor and Selecting Text");
    addComponents(ww);
    return ww;
}

DemoOfMoveCursorSelectTextModelessDialog.prototype.run = function () {
    var win = setupWindow();
    this.windowRef = win;

    win.show();
    return true;
}

new DemoOfMoveCursorSelectTextModelessDialog().run();
// End of the coding pattern of the Modeless Dialog----------------------------

// =================================================
// Above lines are the programming pattern for a modeless dialog with ScriptUI
//
// The following lines are the function to create the "palette".
// You may modify the following function, splite it to functions, in order to design
// your window UI.
function addComponents(w) {
    w.grpPanel = w.add('group');
    w.grpPanel.orientation = "column";

    // --- PN Move -----
    w.PN01 = w.add('panel', undefined, 'Moving Cursor');
    AddMoveCursorButtons(w, w.PN01);

    // --- PN Expand -----
    w.PN02 = w.add('panel', undefined, 'Expand the Selection');
    AddExpandSelectionButtons(w, w.PN02);

    // --- PN Reduce -----
    w.PN03 = w.add('panel', undefined, 'Reduce the Selection');
    AddReduceSelectionButtons(w, w.PN03);

    // --------------
    AddCloseButton(w);

    return w;
}

// --- PN01 -------------------------------------------------------------------
function AddMoveCursorButtons(w, PN) {
    w.grpTop = PN.add('group');
    w.grpTop.orientation = "row";

    w.btnMoveCursorBackward = w.grpTop.add('button', undefined, '<C');
    w.btnMoveCursorBackward.size = [33, 23];
    w.btnMoveCursorBackward.onClick = function () { MoveCursor(-1); }
    //
    w.btnMoveCursorForward = w.grpTop.add('button', undefined, 'C>');
    w.btnMoveCursorForward.size = [33, 23];
    w.btnMoveCursorForward.onClick = function () { MoveCursor(1); }
}

function MoveCursor(direction) {
    var myDocument;
    try {
        myDocument = app.activeDocument;
    }
    catch (xError) {
        return;
    }

    if (myDocument.selection.length > 0) {
        selectionDirection = 0;
        selectionFirstIndex = -1;

        var theParent = myDocument.selection[0].parent;
        var firstIndex = myDocument.selection[0].index;
        var theText = myDocument.selection[0];
        var storyLength = theText.parentStory.length;
        var insertPoint;

        // if the cursor is at the beginning of the story, it cannot be moved backward.
        if (firstIndex == 0 && direction < 0) {
            app.activate();
            return;
        }
        // if the cursor is at the end of the story, it cannot be moved forward.
        if (firstIndex >= storyLength && direction > 0) {
            app.activate();
            return;
        }

        if (myDocument.selection[0] instanceof InsertionPoint) {
            // direction = 1: move forward; direction = -1: move backward.
            insertPoint = theParent.insertionPoints.item(firstIndex + direction);
        } else if ((myDocument.selection[0] instanceof Text) ||
            (myDocument.selection[0] instanceof Word) ||
            (myDocument.selection[0] instanceof Character) ||
            (myDocument.selection[0] instanceof TextStyleRange)) {
            var strLen = myDocument.selection[0].length;
            if (direction > 0) {
                // move cursor to the end of the selection
                insertPoint = theParent.insertionPoints.item(firstIndex + strLen);
            } else {
                // move cursor to the beginning of the selection
                insertPoint = theParent.insertionPoints.item(firstIndex);
            }
        }
        myDocument.select(insertPoint);
        app.activate();
    }
}

// --- PN02 -------------------------------------------------------------------
function AddExpandSelectionButtons(w, PN) {
    w.grpMid = PN.add('group');
    w.grpMid.orientation = "row";

    w.btnExpSeletionCharBackward = w.grpMid.add('button', undefined, '<S');
    w.btnExpSeletionCharBackward.size = [33, 23];
    w.btnExpSeletionCharBackward.onClick = function () { ExpandSelectionChar(-1); }
    //
    w.btnExpSeletionCharForward = w.grpMid.add('button', undefined, 'S>');
    w.btnExpSeletionCharForward.size = [33, 23];
    w.btnExpSeletionCharForward.onClick = function () { ExpandSelectionChar(1); }
}

function ExpandSelectionChar(direction) {
    var myDocument;
    try {
        myDocument = app.activeDocument;
    }
    catch (xError) {
        return;
    }

    if (myDocument.selection.length > 0) {
        var theParent = myDocument.selection[0].parent;
        var firstIndex = myDocument.selection[0].index;
        var theText = myDocument.selection[0];
        var storyLength = theText.parentStory.length;
        var strLen = myDocument.selection[0].length;

        // if the cursor at the beginning of the story, if cannot be moved backward.
        if (firstIndex == 0 && direction < 0) {
            app.activate();
            return;
        }
        // if the cursor at the end of the story, it cannot be moved forward.
        if (firstIndex + strLen >= storyLength && direction > 0) {
            app.activate();
            return;
        }

        if (myDocument.selection[0] instanceof InsertionPoint) {
            // there is no selection. so select the text from the cursor in the direction,
            // which the variable "direction" points.
            // direction = 1: move forward; direction = -1: move backward.
            if (direction < 0) {
                firstIndex -= 1;
            }
            var newRange = theParent.characters.itemByRange(firstIndex, firstIndex);
            myDocument.select(newRange);
            app.activate();
        } else if ((myDocument.selection[0] instanceof Text) ||
            (myDocument.selection[0] instanceof Word) ||
            (myDocument.selection[0] instanceof Character) ||
            (myDocument.selection[0] instanceof TextStyleRange)) {
            if (direction < 0) {
                firstIndex -= 1;
            }
            var newRange = theParent.characters.itemByRange(firstIndex, firstIndex + strLen);
            myDocument.select(newRange);
            app.activate();
        }
    }
}

// --- PN03 -------------------------------------------------------------------
function AddReduceSelectionButtons(w, PN) {
    w.grpBtm = PN.add('group');
    w.grpBtm.orientation = "row";

    w.btnExpSeletionCharBackward = w.grpBtm.add('button', undefined, '>S');
    w.btnExpSeletionCharBackward.size = [33, 23];
    w.btnExpSeletionCharBackward.onClick = function () { ReduceSelectionChar(1); }
    //
    w.btnExpSeletionCharForward = w.grpBtm.add('button', undefined, 'S<');
    w.btnExpSeletionCharForward.size = [33, 23];
    w.btnExpSeletionCharForward.onClick = function () { ReduceSelectionChar(-1); }
}

// note:
// direction = 1: the right side of the selection doesn't move, the left side of the selection move to right
// direction = -1: the left side of the selection doesn't move, the right side of the selection move to left
function ReduceSelectionChar(direction) {
    var myDocument;
    try {
        myDocument = app.activeDocument;
    }
    catch (xError) {
        return;
    }

    if (myDocument.selection.length > 0) {
        var theParent = myDocument.selection[0].parent;
        var firstIndex = myDocument.selection[0].index;
        var theText = myDocument.selection[0];
        var strLen = myDocument.selection[0].length;

        if (myDocument.selection[0] instanceof InsertionPoint) {
            // Do nothing, when it is a insertPoint
            app.activate();
            return;
        } else if ((myDocument.selection[0] instanceof Text) ||
            (myDocument.selection[0] instanceof Word) ||
            (myDocument.selection[0] instanceof Character) ||
            (myDocument.selection[0] instanceof TextStyleRange)) {
            if (direction > 0) {
                firstIndex += 1;
            }
            strLen -= 1;
            var newRange = theParent.characters.itemByRange(firstIndex, firstIndex + strLen - 1);
            myDocument.select(newRange);
            app.activate();
        }
    }
}

// --- Last Part of UI (No Panel) ---------------------------------------------
function AddCloseButton(w) {
    w.grpButtons = w.add('group');
    w.btnClose = w.grpButtons.add('button {text: "Close"}');

    w.btnClose.onClick = function () {
        w.close();
    }
}

// a copy from my blogger.