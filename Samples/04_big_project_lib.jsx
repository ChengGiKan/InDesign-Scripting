function inputUnicode(instPoint) {
    instPoint.contents = "Big Project Test" + "\r";
    // unicode input
    instPoint.contents += "大型專案測試" + " : " + "\u5927\u578b\u5c08\u6848\u6e2c\u8a66" + "\r";

    // 4-byte unicode input
    instPoint.contents += "CJK Unified Ideographs Extension B\r";
    instPoint.contents += "U+24A8D: " + "𤪍" + " : " + "\ud852\ude8d" + "\r";
    instPoint.contents += "U+24AA1: " + "𤪡" + " : " + "\ud852\udea1" + "\r";

    instPoint.contents += "CJK Unified Ideographs Extension C\r";
    instPoint.contents += "U+2B522: " + "𫔢" + " : " + "\ud86d\udd22" + "\r";
    instPoint.contents += "U+2B597: " + "𫖗" + " : " + "\ud86d\udd97" + "\r";

    instPoint.contents += "CJK Unified Ideographs Extension D\r";
    instPoint.contents += "U+2B75C: " + "𫝜" + " : " + "\ud86d\udf5c" + "\r";
    instPoint.contents += "U+2B77A: " + "𫝺" + " : " + "\ud86d\udf7a" + "\r";

    instPoint.contents += "CJK Unified Ideographs Extension E\r\t細明體 not supports, yet.\r";
    instPoint.contents += "CJK Unified Ideographs Extension F\r\t細明體 not supports, yet.\r";
    instPoint.contents += "CJK Unified Ideographs Extension G\r\t細明體 not supports, yet.\r";
}