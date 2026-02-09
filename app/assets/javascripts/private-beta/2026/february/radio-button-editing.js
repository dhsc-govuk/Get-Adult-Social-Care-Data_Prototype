/*****
  * Radio buttons editing (JavaScript)
  * Core code that allows users to search radio buttons (Get adult social care data)
*****/

function radioButtonsSearch(totalRadioButtonCount, clearLocalStorage, itemsPerPage, itemTypeLabel, itemTypeLabelPlural) {

  var testCount = 0;

  //
  // Data attribute elements already added in the HTML
  //

  // - non-js-radio-buttons
  // - radio buttons

  // - non-js-paging
  // - paging

  // - selected-items-message
  // - select-all-link

  // - radio-buttons-search-filter

  // - clear-filter
  // - clear-filter-non-js

  // - filtered-message

  // Non-js paging and radio buttons
  var _radioButtonsContainerNonJS = jQuery("[data-non-js-radio-buttons]")
  _radioButtonsContainerNonJS.remove()
  var _pagingNonJS = jQuery("[data-non-js-paging]")
  _pagingNonJS.remove()

  var _paging = jQuery("[data-paging]")
  // Show JavaScript paging
  showOrHideElement(_paging, "show")
  var _radioButtonsContainer = jQuery("[data-radio-buttons]")
  // Show JavaScript radio buttons
  showOrHideElement(_radioButtonsContainer, "show")
  var _radioButtons = _radioButtonsContainer.find("input[type='radio']")
  var _radioButtonsTickedCount = 0

  // Store tickedRadioButtons in local storage
  if (clearLocalStorage == true) {
    localStorage.setItem("tickedRadioButtons", JSON.stringify({}));
  }

  var tickedRadioButtons = JSON.parse(localStorage.getItem('tickedRadioButtons')) || {};

  jQuery(document).on(
    'change',
    _radioButtons,
    
    function() {
      // Update local storage ticked object
      _radioButtonsTickedCount = 0
      _radioButtons.each(function() {
        
        if (this.checked) {
          _radioButtonsTickedCount++
          tickedRadioButtons[this.id] = true;
        }
        else {
          delete tickedRadioButtons[this.id];
        }

      });
      localStorage.setItem("tickedRadioButtons", JSON.stringify(tickedRadioButtons));
      updateMessage()
    }

  );

  // Set radio buttons to be unticked on load (bug with caching selected class from old radio buttons)
  _radioButtons.each(function() {
    jQuery(this).prop('checked', false);
    jQuery(this).closest("div.searchable-radio").removeClass("selected")
  });

  // Set radio buttons to be ticked on load if value in tickedRadioButtons localStorage
  jQuery.each(tickedRadioButtons, function(key, value) {
    _radioButtonsTickedCount++
    jQuery("#" + key).prop('checked', true);
    jQuery("#" + key).closest("div.searchable-radio").addClass("selected")
  });

  // Count message element
  var _countMessage = jQuery("[data-selected-items-message]");

  function updateMessage() {
    
    // _countMessage.text(_radioButtonsTickedCount + " of " + totalRadioButtonCount + " " + itemTypeLabelPlural + " selected")
    var _itemTypeLabel = _radioButtonsTickedCount != 1 ? itemTypeLabelPlural : itemTypeLabel
    
    if (_radioButtonsTickedCount == totalRadioButtonCount) {
      _countMessage.text("All " + itemTypeLabelPlural + " selected")
    }
    else {
      _countMessage.text(_radioButtonsTickedCount + " " + _itemTypeLabel + " selected")
    }

  }

  updateMessage()

  // Select all link
  var _selectAllLinkContainer = jQuery("[data-select-all-link]")
  showOrHideElement(_selectAllLinkContainer, "show")
  var _selectAllLink = _selectAllLinkContainer.find("a")

  _selectAllLink.on(
    'click',
    
    function() {
      event.preventDefault();

      // If all ticked then untick them all, else tick them all
      if (jQuery("[data-radio-buttons]").find("input[type='radio']:checked").length == _radioButtons.length) {
        _radioButtons.prop('checked', false).closest("div.searchable-radio").removeClass("selected");
      }
      else {
        _radioButtons.prop('checked', true).closest("div.searchable-radio").addClass("selected");
      }

      _radioButtons.trigger("change")
    }

  )

  //
  // Look ahead (i.e. 'as you type') search
  //

  // Set Localstorage defaults
  if (clearLocalStorage == true) {
    localStorage.setItem("searchTerm", JSON.stringify(""));
    localStorage.setItem("filteredCount", JSON.stringify(totalRadioButtonCount));
    localStorage.setItem("activePage", JSON.stringify(""));
  }

  var searchTerm = JSON.parse(localStorage.getItem('searchTerm')) || "";
  // Find search box
  var _searchContainer = jQuery("[data-radio-buttons-search-filter]")
  var _search = _searchContainer.find("input")
  var _searchFieldset = _searchContainer.closest("fieldset")

  // Remove form elements (form, button)
  _searchFieldset.unwrap()
  _searchContainer.find(".search-submit").remove()
  _searchContainer.find(".search-input").removeClass("search-input-with-button")

  var _clearFilter = jQuery("[data-clear-filter]")
  var _clearFilterLink = _clearFilter.find("a")

  _clearFilterLink.on(
    'click',
    
    function(event) {
      // Commented out since we don't use or rely on session JSON data for now 
      // event.preventDefault();
      localStorage.setItem("searchTerm", JSON.stringify(""));
      _search.val("").trigger("input")
      showOrHideElement($countMessage, "hide")
    }

  )

  // Remove non-js clear filter link
  jQuery("[data-clear-filter-non-js]").remove()

  // Set total count
  var _totalCount = totalRadioButtonCount
  var _filteredCount = _totalCount
  var $countMessage = jQuery("[data-filtered-message]")
  showOrHideElement($countMessage, "hide")
  var _messageText = _totalCount + " "
  _messageText += (_totalCount == 1 ? itemTypeLabel : itemTypeLabelPlural)
  var _filteredMessageText = _messageText
  var _itemLabel = ""
  var _matchText = ""

  function filterRadioButtons(value) {
    
    var _valueUpper = value.toUpperCase().trim()
    localStorage.setItem("searchTerm", JSON.stringify(value));
    var _results = false

    _radioButtons.each(function(index) {
      
      var _this = jQuery(this),
        _thisName = _this.data("search-value")
          _thisNameUpper = _thisName.toUpperCase().trim()

      if (_thisNameUpper.indexOf(_valueUpper) != -1) {
        // Match
        _this.data("matches-search", true)
        _results = true
      }
      else {
        // No match
        _filteredCount--
        _this.data("matches-search", false)
        // _this.closest("div.searchable-radio").hide()
      }

    });

    // doPaging()
    localStorage.setItem("filteredCount", JSON.stringify(_filteredCount));
    
    if (_filteredCount == 1) {
      _itemLabel = itemTypeLabel
      _matchText = "matches"
    }
    else {
      _itemLabel = itemTypeLabelPlural
      _matchText = "matches"
    }

    // _filteredMessageText = _filteredCount + " " + _itemLabel  + " " + _matchText + " your search of \"" + value + "\""
    _filteredMessageText = _filteredCount + " " + _matchText + " for \"" + value + "\""
    $countMessage.text(_filteredMessageText)
    // Show message only if result count is 0
    showOrHideElement($countMessage, (_filteredCount == 0) ? "show" : "hide")
    return _filteredCount
  }

  // Search radios that are checked on load
  _search.val(searchTerm)

  var _valueUpper = searchTerm.toUpperCase().trim()

  if (_valueUpper.length != 0) {
    _filteredCount = filterRadioButtons(searchTerm)
    showOrHideElement(_clearFilter, "show")
    // showOrHideElement(_selectAllLinkContainer, (_filteredCount < totalRadioButtonCount) ? "hide" : "show")
    showOrHideElement(_selectAllLinkContainer, "hide")
  }
  else {
    _filteredCount = _totalCount
    _radioButtons.data("matches-search", true)
    $countMessage.text(_messageText)
    showOrHideElement($countMessage, "hide")
    showOrHideElement(_clearFilter, "hide")
    showOrHideElement(_selectAllLinkContainer, "show")
  }

  _search.on(
    "input",
    
    function(event) {
      _filteredCount = _totalCount
      $countMessage.text(_messageText)
      // _noResultsMessage.remove()
      // _radioButtons.closest("div.searchable-radio").show()
      // _radioButtons.data("matches-search") = true
      _radioButtons.data("matches-search", true)
      showOrHideElement(_radioButtons.closest("div.searchable-radio"), "show", true)
      // showOrHideElement(_radioButtons.closest("div.searchable-radio").show())
      // _radioButtons.closest("div.searchable-radio").show()
      var _value = _search.val()
      var _valueUpper = _value.toUpperCase().trim()
      
      if (_valueUpper.length != 0) {
        _filteredCount = filterRadioButtons(_value)
        showOrHideElement(_clearFilter, "show")
        // showOrHideElement(_selectAllLinkContainer, (_filteredCount < totalRadioButtonCount) ? "hide" : "show")
        showOrHideElement(_selectAllLinkContainer, "hide")
      }
      else {
        localStorage.setItem("searchTerm", JSON.stringify(""));
        localStorage.setItem("filteredCount", JSON.stringify(totalRadioButtonCount));
        $countMessage.text(_messageText)
        showOrHideElement($countMessage, "hide")
        showOrHideElement(_clearFilter, "hide")
        showOrHideElement(_selectAllLinkContainer, "show")
      }

      doPaging(true)
    }

  )

  // TO DO paging
  function doPaging(reset) {

    // Turn off previously added click events on paging links

    //
    // setupPagingData - START
    //				

    var _pageCount = Math.ceil(_filteredCount / itemsPerPage)
    var _activePage = JSON.parse(localStorage.getItem('activePage')) || (_paging.data("page-number") || 1)

    if (reset) {
      _activePage = 1
    }

    _paging.data("page-number", _activePage)
    localStorage.setItem("activePage", JSON.stringify(_activePage));

    var _lastPage = false
    var _firstPage = false

    if (_activePage == _pageCount) {
      _lastPage = true
    }

    if (_activePage == 1) {
      _firstPage = true
    }

    // First and last item range
    var _pagingFirstItemIndex = 1
    var _pagingLastItemIndex = itemsPerPage
    var _pageCountToDisplay = (_pageCount > 5) ? 5 : _pageCount
    var _middlePage = 3
    var _startPageNumRange = 1
    var _endPageNumRange = _pageCountToDisplay

    if (_pageCount > _pageCountToDisplay) {
      if (_activePage > _middlePage) {
        if (_activePage < (_pageCount - 1)) {
          _startPageNumRange = _activePage - 2
          _endPageNumRange = _activePage + 2
        }
        else {
          var _totalEitherSide = _pageCountToDisplay - 1
          var _distanceToEnd = _pageCount - _activePage
          var _distanceToLeft = _totalEitherSide - _distanceToEnd
          _startPageNumRange = _activePage - _distanceToLeft
          _endPageNumRange = _activePage + _distanceToEnd
        }
      }
    }

    //
    // setupPagingData - END
    //

    var _pagingCalc1 = (_activePage - 1) * itemsPerPage
    var _pagingCalc2 = _activePage * itemsPerPage

    //
    // Loop through radio buttons to decide on visibility
    //

    var _displayedCount = 0
    var _pagingFirstItemIndexDone = false

    _radioButtons.each(function(index) {
      var _this = jQuery(this)
      
      if (_this.data("matches-search") == true) {
        _displayedCount++
      }

      if ((_this.data("matches-search") == true) && ((_displayedCount > _pagingCalc1) && (_displayedCount <= _pagingCalc2))) {
        // showOrHideElement(_this.closest("div.searchable-radio"), "show", true)
        _this.closest("div.searchable-radio").show()
        if (_pagingFirstItemIndexDone == false) {
          _pagingFirstItemIndex = _displayedCount
          _pagingFirstItemIndexDone = true
        }
        if (_displayedCount <= _pagingCalc2) {
          _pagingLastItemIndex = _displayedCount
        }
      }
      else {
        // showOrHideElement(_this.closest("div.searchable-radio"), "hide", true)
        _this.closest("div.searchable-radio").hide()
      }

    });

    //
    // Build paging element
    //

    // Message
    _paging.find(".pager-summary").text("Showing " + _pagingFirstItemIndex + " to " + _pagingLastItemIndex + " of " + _filteredCount + " " + itemTypeLabelPlural)
    // Previous Link
    _prevLink = _paging.find(".pager-prev")
    _prevLink.off(".paging")
    _prevLink.on(
      "click.paging",
      function(event) {
        event.preventDefault();
        _paging.data("page-number", _activePage - 1)
        localStorage.setItem("activePage", JSON.stringify(_activePage - 1));
        doPaging(false)
      }
    )
    showOrHideElement(_prevLink, (!_firstPage ? "show" : "hide"), false)
    // Next Link
    _nextLink = _paging.find(".pager-next")
    _nextLink.off(".paging")
    _nextLink.on(
      "click.paging",
      
      function(event) {
        event.preventDefault();
        _paging.data("page-number", _activePage + 1)
        localStorage.setItem("activePage", JSON.stringify(_activePage + 1));
        doPaging(false)
      }

    )
    showOrHideElement(_nextLink, (!_lastPage ? "show" : "hide"), false)
    // Page numbers
    _pageNumList = _paging.find(".pager-items")
    _pageNumList.empty()
    
    for (i = 1; i < _pageCount + 1; i++) {
      var _pageNumber = i

      if (i >= _startPageNumRange && i <= _endPageNumRange) {
        var _thisPageItem = jQuery("<li class='govuk-pagination__item'></li>")
        _thisPageLink = jQuery("<a class='govuk-link govuk-pagination__link' href='#' aria-label='Page " + _pageNumber + "' >" + _pageNumber + "</a>")
        _thisPageLink.data("page-number", _pageNumber)
        _thisPageLink.off(".paging")
        _thisPageLink.on(
          "click.paging",
          
          function(event) {
            var _thisLink = jQuery(this)
            _thisLinkPage = _thisLink.data("page-number")
            event.preventDefault();
            _paging.data("page-number", _thisLinkPage)
            localStorage.setItem("activePage", JSON.stringify(_thisLinkPage));
            doPaging(false)
          }

        )
        if (i != _activePage) {
          _thisPageItem.append(_thisPageLink)
        }
        else {
          _thisPageLink.attr("aria-current", "page")
          _thisPageItem.append(_thisPageLink)
          _thisPageItem.addClass("govuk-pagination__item--current")
        }
      }

      _pageNumList.append(_thisPageItem)
    }

    if (_filteredCount > itemsPerPage) {
      showOrHideElement(_paging, "show", false)
    }
    else {
      showOrHideElement(_paging, "hide", false)
    }

  }

  doPaging()

  // Show/Hide
  function showOrHideElement(_this, showOrHide, inlineShowHide) {
    inlineShowHide = inlineShowHide || false
    
    if (showOrHide == "show") {
      // If show
      if (inlineShowHide) {
        _this.show()
      }
      _this.removeClass("hidden")
      _this.attr("aria-hidden", false)
      _this.removeAttr("hidden")
    }
    else {
      // If hide
      if (inlineShowHide) {
        _this.hide()
      }
      _this.addClass("hidden")
      _this.attr("aria-hidden", true)
      _this.attr("hidden", true)
    }
    
  }

}