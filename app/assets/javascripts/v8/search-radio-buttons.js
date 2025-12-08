/*****
  * Search radio buttons (jQuery)
  * Supplimentary code that updates the supporting elements on the page - when users are searching radio buttons (Get adult social care data)
*****/

// jQuery (START)
$(document).ready(function () {

	// For the 'select-location.html' page
	$('input[name="locationName"]').on('change', function() {
			
		var selectedRadioButtonValue = $('input[name=locationName]:checked').val(); 
		var clearFilter = jQuery("[data-clear-filter]");
		var searchContainer = jQuery("[data-radio-buttons-search-filter]");
		var searchInput = searchContainer.find("input");
		var searchInputValue = searchInput.val();

		// If the user hasn't searched
		if (searchInputValue == "") {
			// Show the hidden 'clear search' link
			$(clearFilter).removeClass("hidden");
			$(clearFilter).attr("aria-hidden", false);
			$(clearFilter).removeAttr("hidden");

			// Show the hidden selection heading text
			$("#selectedChoiceHeading").removeClass("hidden");
			$("#selectedChoiceHeading").attr("aria-hidden", false);
			$("#selectedChoiceHeading").removeAttr("hidden");
			
			// Rename the associated header 
			$("#selectedChoiceHeading").text("You’ve selected “" + selectedRadioButtonValue + "”");
		}
		// Unless they have searched...
		else  {
			// Show the hidden link
			$(clearFilter).removeClass("hidden");
			$(clearFilter).attr("aria-hidden", false);
			$(clearFilter).removeAttr("hidden");

			// Show the hidden selection heading text
			$("#selectedChoiceHeading").removeClass("hidden");
			$("#selectedChoiceHeading").attr("aria-hidden", false);
			$("#selectedChoiceHeading").removeAttr("hidden");
			
			// Rename the link and associated header 
			$("#clearSearchAndSelection").text("Clear search");
			$("#selectedChoiceHeading").text("You’ve selected “" + selectedRadioButtonValue + "”");
		}

	});

});
// jQuery (END)