$('.close').on('click touchstart', function(e){
    e.stopPropagation();  
    var $target = $(this).parents('.card');
    $(target).hide('fast', function(){ $target.remove(); });
});