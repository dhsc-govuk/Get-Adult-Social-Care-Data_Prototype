/**********
 * CUSTOM GLOBAL BEHAVIOUR (JavaScript)
 * **********/

// jQuery (START)
$(document).ready(function () {

  $('.moj-side-navigation a').on('click', function () {

    // Remove current state from all items
    $('.moj-side-navigation__item')
      .removeClass('moj-side-navigation__item--active')
      .find('a')
      .removeAttr('aria-current');

    // Add current state to clicked item
    $(this)
      .attr('aria-current', 'location')
      .parent()
      .addClass('moj-side-navigation__item--active');
      
  });

});
// jQuery (END)