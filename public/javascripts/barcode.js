module.exports = function() {
    JsBarcode("#barcode", "1234", {
        format: "CODE39",
        lineColor: "#0aa",
        width: 3,
        height: 50,
        displayValue: false
    });
}