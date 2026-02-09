/**********
 * PROTOTYPE SETUP (JavaScript)
 * **********/

// jQuery (START)
window.addEventListener('load', function() {

  // A way to dynamically control the config options
  $("#userTypeRadios").change(function () {

    var userType = $('input[name="userType"]:checked').val();

    if (userType == "Care provider (care home)") {;
      // Makes sure the 'Number of locations' radio buttons are available
      $("#numberOfLocationsChoices").show();
      // Allow users to view the '1' location scenario (i.e. it IS now possible)
      $("#number_of_locations_1").removeAttr("disabled");
      // Set the new default radio value to '21 to 100'
      $("#number_of_locations_3").prop("checked", true);
      // Hide the '101 or more' locations scenario (i.e. it's now NOT possible)
      $("#number_of_locations_4").prop("checked", false);
      $("#number_of_locations_4").attr("disabled", true);
    }
    else if (userType == "Care provider (community social care)") {;
      // Makes sure the 'Number of locations' radio buttons are available
      $("#numberOfLocationsChoices").show();
      // Allow users to view the '1' location scenario (i.e. it IS now possible)
      $("#number_of_locations_1").removeAttr("disabled");
      // Set the new default radio value to '21 to 100'
      $("#number_of_locations_3").prop("checked", true);
      // Hide the '101 or more' locations scenario (i.e. it's now NOT possible)
      $("#number_of_locations_4").prop("checked", false);
      $("#number_of_locations_4").attr("disabled", true);
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
      // Allow users to view the '101 or more' locations scenario (i.e. it IS now possible)
      $("#number_of_locations_4").removeAttr("disabled");
      // Reset the new default radio value to '101 or more'
      $("#number_of_locations_4").prop("checked", true);
    }
  
  });

});
// jQuery (END)