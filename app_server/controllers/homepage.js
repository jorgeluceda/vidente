

const renderHomePage = (req, res) => {
    // sends data to the view to be compiled
    // and sent to the browser
    res.render('homepage', {
        title: "Vidente - The Intuitive Barcode Overseer!"
    });
}
const homepage = (req, res) => {
    renderHomePage(req, res);
};

/* Exposes the index function as a method */
module.exports = {
    homepage
};