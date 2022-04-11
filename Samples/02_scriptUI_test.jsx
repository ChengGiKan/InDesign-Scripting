#target "InDesign"
#targetengine "session"
function MyWindow() {
	this.windowRef = null;
}

function setupWindow() {
	var ww = new Window("window", "Program Title");
	addComponents(ww);
	return ww;
}

MyWindow.prototype.run = function () {
	var win = setupWindow();
	this.windowRef = win;
	win.show();
	return true;
}

new MyWindow().run();

function addComponents(w) {
	w.btnBuildDB = w.add('button {text: "Testing"}');
	w.btnExit = w.add('button {text: "Exit"}');

	w.btnBuildDB.onClick = function () {
		alert("Button \"Testing\" has been clicked.");
	}
	w.btnExit.onClick = function () {
		w.close();
	}

	return w;
}

// https://stackoverflow.com/questions/14061690/what-is-targetengine