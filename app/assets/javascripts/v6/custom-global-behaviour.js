/**********
 * CUSTOM GLOBAL BEHAVIOUR (JavaScript)
 * **********/

// jQuery (START)
$(document).ready(function () {

  // HIDE all non-JS elements
  $(".non-javascript").attr("aria-hidden", true);
  $(".non-javascript").attr("hidden", "hidden");

  // SHOW any hidden elements which we need for a JavaScript UX
  $(".javascript-only").attr("aria-hidden", false);
  $(".javascript-only").removeAttr("hidden", "hidden");

  // On click of the 'Menu' main navigation item, hide open and close the main service 'Menu' section
  $("#super-navigation-menu-toggle").click(function () {
      
    var menuItemState = $(this).attr('aria-expanded');

    if (menuItemState == "false") {
      // Update the parent (trigger) link
      $(this).attr("aria-expanded", true);
      // Then open the main service 'Menu' section
      $("#super-navigation-menu").attr("aria-hidden", false);
      $("#super-navigation-menu").removeAttr("hidden", "hidden");
    }
    else if (menuItemState == "true") {
      // Update the parent (trigger) link
      $(this).attr("aria-expanded", false);
      // Then update the child hidden section           
      $("#super-navigation-menu").attr("aria-hidden", true);
      $("#super-navigation-menu").attr("hidden", "hidden");
    }

  });

  // Global print function
  $('.print-page').click(function(e){
      
    e.preventDefault();

    // Open the print dialogue
    window.print();
  });

});
// jQuery (END)

// JavaScript (START)

// JavaScript (END)