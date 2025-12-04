module.exports = function(router) {

  var version = 'v7';

  /*****
   * General prototype pages (not part of the service)
  *****/

  router.get('/' + version + '/' + 'config', function (req, res) {
    res.render(version + '/config', {
      'version' : version.substring(1)
		})
  })
  router.post('/' + version + '/' + 'config-validation', function (req, res) {

    var numberOfLocations = req.session.data['numberOfLocations']
    var entryPoint = req.session.data['entryPoint']

    // For 'Number of locations' is '1'
    if (numberOfLocations == "1") {
      req.session.data['locations'] = "1"
      req.session.data['postAuthenticationURL'] = "home"
    }
    // For 'Number of locations' is '2 to 20'
    else if (numberOfLocations == "2 to 20") {
      req.session.data['locations'] = ""
      req.session.data['locationName'] = ""
      req.session.data['justSignedIn'] = "true"
      req.session.data['postAuthenticationURL'] = "select-location?searchRequired=false&paginationRequired=false"
    }
    // For 'Number of locations' is '21 to 100'
    else if (numberOfLocations == "21 to 100") {
      req.session.data['locations'] = ""
      req.session.data['locationName'] = ""
      req.session.data['justSignedIn'] = "true"
      req.session.data['postAuthenticationURL'] = "select-location?searchRequired=true&paginationRequired=false"
    }
    // For 'Number of locations' is '101 or more'
    else {
      req.session.data['locations'] = ""
      req.session.data['locationName'] = ""
      req.session.data['justSignedIn'] = "true"
      req.session.data['postAuthenticationURL'] = "select-location?searchRequired=true&paginationRequired=true&page1=true"
    }

    // Routing - send to the chosen entry point
    if (entryPoint == "Start page (private beta)") {
      res.redirect('/' + version + '/' + 'start-private-beta')
    }
    else if (entryPoint == "Start page on GOV.UK (public beta)") {
      res.redirect('/' + version + '/' + 'start')
    }
    else if (entryPoint == "GOV.UK One Login") {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/start')
    }
    else {
      res.redirect('/' + version + '/' + 'signed-in/' + req.session.data['postAuthenticationURL'])
    }

  })

  /*****
   * Not signed in
   * GOV.UK One Login (https://www.sign-in.service.gov.uk)
  *****/

  /* Create an account */
  router.get('/' + version + '/' + 'gov-uk/one-login/create-account/get-security-code', function (req, res) {
    res.render(version + '/gov-uk/one-login/create-account/get-security-code', {
      'error' : req.query.error
		})
  })

  router.post('/' + version + '/' + 'gov-uk/one-login/create-account/get-security-code-validation', function (req, res) {

    var chooseSecurityCodes = req.body['choose-security-codes']
    
    if (chooseSecurityCodes == "Text message") {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/create-account/enter-phone-number')
    }
    else if (chooseSecurityCodes == "Authenticator app for smartphone, tablet or computer") {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/create-account/auth-app')
    }
    // Error validation - make sure user chooses an option
    else {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/create-account/get-security-code?error=true')
    }

  })

  /* Sign in */
  router.get('/' + version + '/' + 'gov-uk/one-login/sign-in/cannot-change-security-codes', function (req, res) {
    res.render(version + '/gov-uk/one-login/sign-in/cannot-change-security-codes', {
      'error' : req.query.error
		})
  })

  router.post('/' + version + '/' + 'gov-uk/one-login/sign-in/cannot-change-security-codes-validation', function (req, res) {

    var cannotChangeHowGetSecurityCodeAction = req.body['cannotChangeHowGetSecurityCodeAction']
    var redirectMFA = req.session.data['redirectMFA'] || "check-phone"
    
    if (cannotChangeHowGetSecurityCodeAction == "Try entering a security code again with the method you already have set up") {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/sign-in/' + redirectMFA)
    }
    // Error validation - make sure user chooses an option
    else {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/sign-in/cannot-change-security-codes?error=true')
    }

  })

  router.get('/' + version + '/' + 'gov-uk/one-login/sign-in/how-do-you-want-security-codes', function (req, res) {
    res.render(version + '/gov-uk/one-login/sign-in/how-do-you-want-security-codes', {
      'error' : req.query.error
		})
  })

  router.post('/' + version + '/' + 'gov-uk/one-login/sign-in/how-do-you-want-security-codes-validation', function (req, res) {

    var mfaMethodId = req.body['mfa-method-id']
    
    if (mfaMethodId == "Use your authenticator app") {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/sign-in/enter-authenticator-app-code')
    }
    else if (mfaMethodId == "Text message") {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/sign-in/check-phone')
    }
    // Error validation - make sure user chooses an option
    else {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/sign-in/how-do-you-want-security-codes?error=true')
    }

  })

  /* I’ve forgotten my password */
  router.get('/' + version + '/' + 'gov-uk/one-login/sign-in/forgotten-password/cannot-change-security-codes', function (req, res) {
    res.render(version + '/gov-uk/one-login/sign-in/forgotten-password/cannot-change-security-codes', {
      'error' : req.query.error
		})
  })

  router.post('/' + version + '/' + 'gov-uk/one-login/sign-in/forgotten-password/cannot-change-security-codes-validation', function (req, res) {

    var cannotChangeHowGetSecurityCodeAction = req.body['cannotChangeHowGetSecurityCodeAction']
    var redirectMFA = req.session.data['redirectMFA'] || "check-phone"
    
    if (cannotChangeHowGetSecurityCodeAction == "Try entering a security code again with the method you already have set up") {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/sign-in/forgotten-password/' + redirectMFA)
    }
    // Error validation - make sure user chooses an option
    else {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/sign-in/forgotten-password/cannot-change-security-codes?error=true')
    }

  })

  router.get('/' + version + '/' + 'gov-uk/one-login/sign-in/forgotten-password/how-do-you-want-security-codes', function (req, res) {
    res.render(version + '/gov-uk/one-login/sign-in/forgotten-password/how-do-you-want-security-codes', {
      'error' : req.query.error
		})
  })

  router.post('/' + version + '/' + 'gov-uk/one-login/sign-in/forgotten-password/how-do-you-want-security-codes-validation', function (req, res) {

    var mfaMethodId = req.body['mfa-method-id']
    
    if (mfaMethodId == "Use your authenticator app") {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/sign-in/forgotten-password/enter-authenticator-app-code')
    }
    else if (mfaMethodId == "Text message") {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/sign-in/forgotten-password/check-phone')
    }
    // Error validation - make sure user chooses an option
    else {
      res.redirect('/' + version + '/' + 'gov-uk/one-login/sign-in/forgotten-password/how-do-you-want-security-codes?error=true')
    }

  })

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
      'searchLocation' : req.query.searchLocation,
      'updateMyLocation' : req.query.updateMyLocation
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
   * Data > Care provision
  *****/

  // Care providers: locations and services
  router.get('/' + version + '/' + 'signed-in/topics/residential-care/residential-care-providers/data', function (req, res) {
    res.render(version + '/signed-in/topics/residential-care/residential-care-providers/data', {
      'sessionTimeoutJs' : req.query.sessionTimeoutJs,
      'sessionTimeoutNonJs' : req.query.sessionTimeoutNonJs
		})
  })
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/residential-care-providers/data-update-filters', function (req, res) {

    // Data objects to be retrieved and queried
    var postcode1 = req.session.data['postcode1']
    var serviceType1 = req.session.data['serviceType1']

    // User has chosen at least 1 filter  
		if (postcode1 || serviceType1) {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/residential-care-providers/data?filterApplied=Yes#data1')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/residential-care-providers/data?filterApplied=#data1')
    }
    
  })

  // Care home beds and occupancy levels
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data-update-filters1', function (req, res) {

    // Data objects to be retrieved and queried
    var bedType1 = req.session.data['bedType1']

    // User has chosen at least 1 filter  
		if (bedType1) {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data?filterApplied1=Yes#data1')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data?filterApplied1=#data1')
    }
    
  })
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data-update-filters2', function (req, res) {

    // Data objects to be retrieved and queried
    var bedType2 = req.session.data['bedType2']

    // User has chosen at least 1 filter  
		if (bedType2) {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data?filterApplied2=Yes#data2')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data?filterApplied2=#data2')
    }
    
  })
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data-update-filters4', function (req, res) {

    // Data objects to be retrieved and queried
    var bedType4 = req.session.data['bedType4']

    // User has chosen at least 1 filter  
		if (bedType4) {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data?filterApplied4=Yes#trend1')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data?filterApplied4=#trend1')
    }
    
  })

  /*****
   * Additional screens
   * Footer, service information and system pages
  *****/

  router.get('/' + version + '/' + 'footer/cookies', function (req, res) {
    res.render(version + '/footer/cookies', {
      'cookiesUpdated' : req.query.cookiesUpdated
		})
  })

}