module.exports = function(router) {

  var version = 'private-beta/2025/december';

  /*****
   * Signed in
   * Select location
  *****/

  router.get('/' + version + '/' + 'signed-in/select-location', function (req, res) {
    res.render(version + '/signed-in/select-location', {
      'error' : req.query.error,
      'error1' : req.query.error1,
      'error2' : req.query.error2,
      'page1' : req.query.page1,
      'page2' : req.query.page2,
      'searchLocation' : req.query.searchLocation      
		})
  })
  // NON JAVASCRIPT - Deal with the non JavaScript scenario (e.g. POST) for users entering an empty search on the radio buttons
	router.get('/' + version + '/' + 'signed-in/select-location-non-javascript-post', function (req, res) {		

    var searchLocation = req.query['searchLocation']

		// Error validation - make sure user enters a search term
		if (searchLocation == "") {
			res.redirect('/' + version + '/' + 'signed-in/select-location?searchRequired=true&paginationRequired=true&page1=true&error=true&error1=true')
		}
		// User searches for a location
		else {
			res.redirect('/' + version + '/' + 'signed-in/select-location?searchRequired=true&paginationRequired=true&page1=true')
		}
		
	})
  router.post('/' + version + '/' + 'signed-in/select-location-validation', function (req, res) {

    // Data objects to be retrieved and queried
    var locationName = req.body['locationName']

    // Error validation - make sure user enters data into required field
		if (locationName == undefined) {
      res.redirect('/' + version + '/' + 'signed-in/select-location?error=true&error2=true')      
		}
		// User selects a location
		else {			
      res.redirect('/' + version + '/' + 'signed-in/home?justSignedIn=false')
    }

  })
  router.post('/' + version + '/' + 'signed-in/select-location-search-and-pagination-validation', function (req, res) {

    // Data objects to be retrieved and queried
    var searchRequired = req.session.data['searchRequired']
    var paginationRequired = req.session.data['paginationRequired']
    var locationName = req.body['locationName']

    // Logic and validation for routing
    var searchRequiredURL = "";
    var paginationRequiredURL = "";
    
    if (searchRequired == "true") {
      searchRequiredURL = "&searchRequired=true"
    }

    if (paginationRequired == "true") {
      paginationRequiredURL = "&paginationRequired=true&page1=true"
    }

    // Error validation - make sure user enters data into required field
		if (locationName == undefined) {
      res.redirect('/' + version + '/' + 'signed-in/select-location?error=true&error2=true' + searchRequiredURL + paginationRequiredURL)      
		}
		// User selects a location
		else {			
      res.redirect('/' + version + '/' + 'signed-in/home?justSignedIn=false')
    }

  })

  /*****
   * Signed in
   * Data > Care homes
  *****/

  router.get('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/filters/_2-filters', function (req, res) {
    res.render(version + '/signed-in/topics/residential-care/provision-and-occupancy/filters/_2-filters', {
      'error' : req.query.error
		})
  })
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/filters/_2-filters-validation', function (req, res) {

    var bedType = req.body['bedType2']

    // Error validation - make sure user enters data into required field
    if (bedType == "_unchecked") {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/filters/_2-filters?error=true')
    }
    // User selects at least one filter
    else {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data#data2')
    }

  })
  
  router.get('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/filters/_4-filters', function (req, res) {
    res.render(version + '/signed-in/topics/residential-care/provision-and-occupancy/filters/_4-filters', {
      'error' : req.query.error
		})
  })
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/filters/_4-filters-validation', function (req, res) {

    var bedType = req.body['bedType4']

    // Error validation - make sure user enters data into required field
    if (bedType == "_unchecked") {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/filters/_4-filters?error=true')
    }
    // User selects at least one filter
    else {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data#trend1')
    }

  })

  /*****
   * Additional screens
   * Footer, service information and system pages
  *****/

  
  router.get('/' + version + '/' + 'footer/disclaimer', function (req, res) {
    res.render(version + '/footer/disclaimer', {
      'backLink' : req.query.backLink
		})
  })

  router.get('/' + version + '/' + 'footer/cookies', function (req, res) {
    res.render(version + '/footer/cookies', {
      'cookiesUpdated' : req.query.cookiesUpdated
		})
  })

}