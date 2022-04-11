main();
function main() {
	var myDocument;
	if (app.documents.length == 0) {
		myDocument = app.documents.add();
		return 0;
	} else {
		myDocument = app.documents.item(0);
		tf = myDocument.textFrames.item(0);
	}
	return 1;
}