#target "indesign"
main();

function main() {
    a1 = new UnitValue("20cm");
    $.writeln("a1: " + a1.toString());
    $.writeln("a1 typeof: " + typeof (a1));
    $.writeln("a1 type: " + a1.type);
    $.writeln("a1 value: " + a1.value);

    b1 = a1.as("mm");
    $.writeln("b1: " + b1.toString());
    $.writeln("b1 typeof: " + typeof (b1));
    $.writeln("b1 type: " + b1.type);
    $.writeln("b1 value: " + b1.value);

    c1 = new UnitValue(a1).as("mm");
    $.writeln("c1: " + c1.toString());
    $.writeln("c1 type: " + typeof (c1));
    $.writeln("c1 value: " + c1.value);

    d1 = new UnitValue("20cm");
    $.writeln("d1 before convert");
    $.writeln("d1: " + d1.toString());
    $.writeln("d1 type: " + d1.type);
    $.writeln("d1 value: " + d1.value);

    d1.convert("mm");
    $.writeln("d1 after convert");
    $.writeln("d1: " + d1.toString());
    $.writeln("d1 type: " + d1.type);
    $.writeln("d1 value: " + d1.value);

    d1 += 1;
    $.writeln("d1 after +1");
    $.writeln("d1: " + d1.toString());
    $.writeln("d1 type: " + d1.type);
    $.writeln("d1 value: " + d1.value);

    a1 += 20;
    $.writeln("a1 after +20");
    $.writeln("a1: " + a1.toString());
    $.writeln("a1 type: " + a1.type);
    $.writeln("a1 value: " + a1.value);

    q1 = new UnitValue("20pt").as("mm");
    $.writeln("20pt is " + q1.toString() + " mm");
}
