#target "indesign"

main();
function main() {
    var fonts = app.fonts;

    $.writeln(fonts.length);

    for (var ii = 0; ii < fonts.length; ii++) {
        // var font = fonts.item[ii]; // has problem
        var font = fonts.item(ii);
        var fonttypeStr = "";
        try {
            var fonttype = font.fontType;
            fonttypeStr = fonttype.toString();
        }
        catch (e0) {
            fonttypeStr = "_UNKNOWN_FONT_TYPE_"
        }
        $.writeln(ii.toString() + "\t" + font.name + "\t" + fonttypeStr);
    }
}