

const renderHomePage = (req, res) => {
    // sends data to the view to be compiled
    // and sent to the browser

    label = {
        name: 'iPhone XS',
        category: 'Apple Phones',
        image: {
            svg: `<svg id="barcode" width="212px" height="92px" x="0px" y="0px" viewBox="0 0 212 92" xmlns="http://www.w3.org/2000/svg" version="1.1" style="transform: translate(0px, 0px);">`,
            mainRect: `<rect x="0" y="0" width="212" height="65" style="fill:#ffffff;"></rect>`,
            g: `<g transform="translate(10, 10)" style="fill:black;">`,
            rects: `<rect x="0" y="0" width="2" height="50"></rect><rect x="8" y="0" width="2" height="50"></rect><rect x="12" y="0" width="6" height="50"></rect><rect x="20" y="0" width="6" height="50"></rect><rect x="28" y="0" width="2" height="50"></rect><rect x="32" y="0" width="6" height="50"></rect><rect x="40" y="0" width="2" height="50"></rect><rect x="48" y="0" width="2" height="50"></rect><rect x="52" y="0" width="2" height="50"></rect><rect x="56" y="0" width="6" height="50"></rect><rect x="64" y="0" width="2" height="50"></rect><rect x="68" y="0" width="6" height="50"></rect><rect x="80" y="0" width="2" height="50"></rect><rect x="84" y="0" width="2" height="50"></rect><rect x="88" y="0" width="6" height="50"></rect><rect x="96" y="0" width="6" height="50"></rect><rect x="104" y="0" width="6" height="50"></rect><rect x="116" y="0" width="2" height="50"></rect><rect x="120" y="0" width="2" height="50"></rect><rect x="124" y="0" width="2" height="50"></rect><rect x="128" y="0" width="2" height="50"></rect><rect x="132" y="0" width="2" height="50"></rect><rect x="140" y="0" width="6" height="50"></rect><rect x="148" y="0" width="2" height="50"></rect><rect x="152" y="0" width="6" height="50"></rect><rect x="160" y="0" width="2" height="50"></rect><rect x="168" y="0" width="2" height="50"></rect><rect x="172" y="0" width="6" height="50"></rect><rect x="180" y="0" width="6" height="50"></rect><rect x="188" y="0" width="2" height="50"></rect>`,
            text: `<text style="font: 20px Helvetica" text-anchor="middle" x="96" y="72">1234</text>`,
            endTags: `</g></svg>`
        },
        isFavorite: true,
    }

    res.render('homepage', {
        title: "Vidente - The Intuitive Barcode Overseer!",
        label: label
    });
}
const homepage = (req, res) => {
    renderHomePage(req, res);
};

/* Exposes the index function as a method */
module.exports = {
    homepage
};