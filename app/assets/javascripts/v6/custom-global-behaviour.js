/**********
 * CUSTOM GLOBAL BEHAVIOUR (JavaScript)
 * **********/

// jQuery (START)
$(document).ready(function () {

  // HIDE all non-JS elements
  $(".filter-non-javascript").hide();
  $(".filter-non-javascript").addClass("hidden");
  $(".filter-non-javascript").attr("aria-hidden", true);
  $(".filter-non-javascript").attr("hidden");
  $(".expandable-content-non-javascript").hide();
  $(".expandable-content-non-javascript").addClass("hidden");
  $(".expandable-content-non-javascript").attr("aria-hidden", true);
  $(".expandable-content-non-javascript").attr("hidden");

  // SHOW any hidden elements which we need for a JavaScript UX
  $(".filter-with-javascript").show();
  $(".filter-with-javascript").removeClass("hidden");
  $(".filter-with-javascript").attr("aria-hidden", false);
  $(".filter-with-javascript").removeAttr("hidden");
  $(".expandable-content-with-javascript").show();
  $(".expandable-content-with-javascript").removeClass("hidden");
  $(".expandable-content-with-javascript").attr("aria-hidden", false);
  $(".expandable-content-with-javascript").removeAttr("hidden");

  // On click of the "Filter" header hide the filter section choices on user request
  $("#headingFilter").click(function () {
      
    var expandFilterSectionState = $(this).attr('aria-expanded');

    if (expandFilterSectionState == "false") {
      // Update the parent (trigger) link
      $(this).attr("data-expanded", true);
      $(this).attr("aria-expanded", true);
      $(this).removeClass("filter-icon-closed");
      $(this).addClass("filter-icon-open");
      // Then update the child hidden section           
      $("#filterChoices").show();
      $("#filterChoices").removeClass("hidden");
      $("#filterChoices").attr("aria-hidden", false);
      $("#filterChoices").removeAttr("hidden");
      $("#filterChoices").css("display", "block");
      $("#filterChoices").css("margin-top", "0.83333em");
    }
    else if (expandFilterSectionState == "true") {
      // Update the parent (trigger) link
      $(this).attr("data-expanded", false);
      $(this).attr("aria-expanded", false);
      $(this).removeClass("filter-icon-open");
      $(this).addClass("filter-icon-closed");
      // Then update the child hidden section           
      $("#filterChoices").hide();
      $("#filterChoices").addClass("hidden");
      $("#filterChoices").attr("aria-hidden", true);
      $("#filterChoices").attr("hidden");
      $("#filterChoices").css("display", "none");
      $("#filterChoices").css("margin-top", "0px");
    }

  });

  // Global print function
  $('.print-page').click(function(e){
      
    e.preventDefault();

    // Open the print dialogue
    window.print();

    // Always show the filter section and choices since users need to print these
    $("#headingFilter").attr("data-expanded", true);
    $("#headingFilter").attr("aria-expanded", true);
    $("#headingFilter").removeClass("filter-icon-closed");
    $("#headingFilter").addClass("filter-icon-open");
    $("#filterChoices").show();
    $("#filterChoices").removeClass("hidden");
    $("#filterChoices").attr("aria-hidden", false);
    $("#filterChoices").removeAttr("hidden");
    $("#filterChoices").css("display", "block");
    $("#filterChoices").css("margin-top", "0.83333em");
  });

});
// jQuery (END)

// JavaScript (START)

// JavaScript (END)