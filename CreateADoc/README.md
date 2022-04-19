# Read Me

In this folder, the script "01 Create Document.jsx" has the entry point.

Two json files are samples (working) for the script to create a InDesign document on Windows or Mac.

Please choose the right on to work on your device.



Currently, detail documentation about this script (and its calling libraries) are missing.

Hope I have time to write one.

## Usage
Modify the json file to meet your design. Using this script and json files, it might be a reasonable way to manager your document layouts.

## Tested

The script has been tested on:

* Windows 11 + InDesign 2022 (64-bit)
* mac mini Late 2012 + masOS 10.14.7 + InDesign 2021 (32 bit)
* mac mini Late 2012 + masOS 10.15.6 + InDesign 2022 (64 bit)

with 
* Visual Studio Code

and 
* ExtendScript Toolkit (excluded macOS 15).

## Note
* The composite font is for CJK typesetting.
If you don't use composite font, just comment the section in json file.
* For the binding from right, currently, it is not supported in this version of code.
* There is an issue, which the script cannot load composite font in one run. That is why, in the script, the document is saved, closed and reloaded before setting up character styles, paragraph styles and so on.

## ToDo (Hope, I have time)
* Redesign the syntax of adding textframes in the json object.
