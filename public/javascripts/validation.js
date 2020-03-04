// Listens for the submit event of the review form
$('#addReview').submit(function (e) {
    $('.alert.alert-danger').hide();
    
    // checks for missing values
    if(!$('input#name').val() || !$('select#rating').val() ||
        !$('textarea#review').val()) {
        if($('.alert.alert-danger').length) {
            $('.alert.alert-danger').show();
        } else {
            // shows or injects an error message into
            // the page if a value is missing
            $(this).prepend('<div role="alert" class="alert alert-danger"> ' +
                            'All fields required, please try again</div>');
        }
        // prevents form from submitting if a value is missing
        return false;
    }
});