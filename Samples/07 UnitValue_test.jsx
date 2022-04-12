#target "indesign"

// File name: 07 UnitValue_test.js
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
