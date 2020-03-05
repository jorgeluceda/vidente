/* GET About page */
const about = (req, res) => { //creates index function
    //includes controller code for the homepage 
    res.render('generic-text', { 
        title: 'About - Vidente',
        pageHeader: {
            title: 'About'
        },
        content: 'Vidente was created to help businesses generate, print, and manage their inventory.' +
                    ''
                    + '</br></br> The name Vidente comes from spanish, and its definition is someone who is able to see'
                    + ' things that others may miss.'
    });
};

/* Exposes the index function as a method */
module.exports = {
    about
}