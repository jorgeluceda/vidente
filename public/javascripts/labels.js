$('.close').on('click', function(e){
    e.stopPropagation();  
    var $target = $(this).parents('.card');
    $target.hide('fast', function(){ $target.remove(); });
});