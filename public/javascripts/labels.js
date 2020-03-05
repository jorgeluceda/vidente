$('.close').on('click', function(e){
    e.stopPropagation();  
        var $target = $(this).parents('.col-sm-3');
        $target.hide('slow', function(){ $target.remove(); });
});