/* GET About page */
const about = (req, res) => { //creates index function
    //includes controller code for the homepage 
    res.render('generic-text', { 
        title: 'About - Loc8r',
        pageHeader: {
            title: 'About'
        },
        content: 'Loc8r was created to help people find places to sit down and get a bit of work done.' +
                    '<br /><br />' + 'Lorem ipsum dolor, consectetur adipiscingelit.'
                    + 'Nunc sed lorem ac nisi dignissim accumsan.'
    });
};

/* Exposes the index function as a method */
module.exports = {
    about
}