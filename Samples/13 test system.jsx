//#targetengine "session" // !! this line cannot be applied to illustrator !!
var appName = app.name;
var build = $.build;
var version = $.version;
var buildDate = $.buildDate;
var engineName = $.engineName;
var os = $.os;
$.writeln("app name: " + appName);
$.writeln("build: " + build);
$.writeln("build data: " + buildDate);
$.writeln("version: " + version);
$.writeln("engine name" + engineName);
$.writeln("os: " + os)