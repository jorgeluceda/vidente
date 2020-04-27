renderHomePage = (req, res, data) => {
    res.render('homepage', {
        title: "Vidente - The Intuitive Barcode Overseer!"
    });

};

const homePage = (req, res) =>  {
    data = [];
    renderHomePage(req, res, data);

};

/* Exposes the index function as a method */
module.exports = {
    homePage
};