module.exports = function(router) {

  var version = 'private-beta/2025/december';

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

  router.get('/' + version + '/' + 'signed-in/topics/residential-care/residential-care-providers/data', function (req, res) {
    res.render(version + '/signed-in/topics/residential-care/residential-care-providers/data', {
      'sessionTimeoutJs' : req.query.sessionTimeoutJs,
      'sessionTimeoutNonJs' : req.query.sessionTimeoutNonJs
		})
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