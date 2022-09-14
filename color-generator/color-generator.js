function reverseString(str) {
    var split = str.split("");
    var reverse = split.reverse();
    var joined = reverse.join("");
    return joined;
}

function hexConverter(decimal) {
    const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

    let hexCode = "";
    let dividend = decimal;
    let integerResult = 0;
    do {
        let result = dividend / 16;
        integerResult = Math.trunc(result);

        if (integerResult != 0) dividend = integerResult;

        let decimalResult = result - integerResult;
        let hexDigit = hex[(decimalResult * 16)];

        hexCode += hexDigit;

    } while (integerResult != 0);

    hexCode = reverseString(hexCode);
    return hexCode;
}

colorGenerator = {
    hexCode: "4287f5",
    rgbCode: [66, 135, 245],

    rgbString: function () {
        let r = colorGenerator.rgbCode[0];
        let g = colorGenerator.rgbCode[1];
        let b = colorGenerator.rgbCode[2];

        return r + "," + g + "," + b;
    },

    show: function () {
        // console.log("show function called");
        // console.log(colorGenerator.rgbCode, colorGenerator.hexCode);
        const colorHTML = document.getElementById("colorPanel");
        const colorHexCodeHTML = document.getElementById("hex-color");
        const colorRGBCodeHTML = document.getElementById("rgba-color");

        colorHTML.style.backgroundColor = "#" + colorGenerator.hexCode;
        colorHexCodeHTML.innerHTML = "#" + colorGenerator.hexCode;
        colorRGBCodeHTML.innerHTML = "RGB(" + colorGenerator.rgbString() + ")";

        hexConverter(colorGenerator.rgbCode[2]);
    },

    generate: function () {
        let r, g, b;
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);

        colorGenerator.rgbCode = [r, g, b];
        // console.log(colorGenerator.rgbCode);
        colorGenerator.hexCode = hexConverter(r) + hexConverter(g) + hexConverter(b);
        // console.log(colorGenerator.hexCode);

        colorGenerator.show();
    }
}

const btn = document.getElementById("generate");
btn.addEventListener("click", colorGenerator.generate, false);

colorGenerator.generate();