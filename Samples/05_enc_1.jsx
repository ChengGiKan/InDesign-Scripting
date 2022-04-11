main();
function main() {
    if (app.documents.length != 0)
        return -1;
    var myDoc = app.documents.add();

    var tf = myDoc.textFrames.add();

    tf.geometricBounds = new Array(20, 20, 100, 100);

    var instPoint = tf.insertionPoints.item(0);
    instPoint.contents = "不能說的秘密：" + "\r";
    instPoint.contents += "就是不能說。\r";
    //instPoint.contents += "就是不能說，\r";
    //instPoint.contents += "也不讓你看。\r";
}