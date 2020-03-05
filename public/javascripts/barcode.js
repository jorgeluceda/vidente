module.exports = function() {
    JsBarcode("#barcode", "1234", {
        format: "CODE39",
        lineColor: "#0aa",
        width: 3,
        height: 50,
        displayValue: false
    });
}

JsBarcode("#barcode", "1234", {
    format: !{label.lineColor},
    lineColor: !{label.lineColor},
    width: !{label.width},
    height: !{label.height},
    font: !{label.font},
    displayValue: !{label.displayValue},
    text: !{label.text},
    textPosition: !{label.textPosition} 
}); 