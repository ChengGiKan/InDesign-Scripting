#target "InDesign"
#targetengine "session"

// File name: 02_scriptUI_test.jsx
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
