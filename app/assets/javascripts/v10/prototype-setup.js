/**********
 * PROTOTYPE SETUP (JavaScript)
 * **********/

// jQuery (START)
window.addEventListener('load', function() {

  // A way to dynamically control the config options
  $("#userTypeRadios").change(function () {

    var userType = $('input[name="userType"]:checked').val();

    if (userType == "Care provider (care home)" || userType == "Care provider (community social care)") {;
      // Makes sure the 'Number of locations' radio buttons are available
      $("#numberOfLocationsChoices").show();
      // Allow users to view the '1' location scenario (i.e. it IS now possible)
      $("#number_of_locations_1").removeAttr("disabled");
      // Set the new default radio value to '2 to 10 (select an address)'
      $("#number_of_locations_2").prop("checked", true);
      // Hide the '11 or more (select an address with search and pagination)' locations scenario (i.e. it's now NOT possible)
      $("#number_of_locations_3").prop("checked", false);
      $("#number_of_locations_3").attr("disabled", true);
    }
    else if (userType == "Local authority") {;
      // Hide the entire 'Number of locations' radio buttons (i.e. this is NOT possible for LAs)
      $("#numberOfLocationsChoices").hide();
    }
    else {
      // Makes sure the 'Number of locations' radio buttons are available
      $("#numberOfLocationsChoices").show();
      // Hide the '1' location scenario (i.e. it's now NOT possible)
      $("#number_of_locations_1").prop("checked", false);
      $("#number_of_locations_1").attr("disabled", true);
      // Allow users to view the '11 or more (select an address with search and pagination)' locations scenario (i.e. it IS now possible)
      $("#number_of_locations_3").removeAttr("disabled");
      // Reset the new default radio value to '11 or more (select an address with search and pagination)'
      $("#number_of_locations_3").prop("checked", true);
    }
  
  });

});
// jQuery (END)