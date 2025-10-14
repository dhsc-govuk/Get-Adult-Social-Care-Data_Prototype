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
    // For 'Number of locations' is '2 or more'
    else {
      req.session.data['locations'] = ""
      req.session.data['careHome'] = ""
      req.session.data['justSignedIn'] = "true"
      req.session.data['postAuthenticationURL'] = "select-location"
    }

    // Routing - send to the chosen entry point
    if (entryPoint == "Start page (private beta)") {
      res.redirect('/' + version + '/' + 'start-private-beta')
    }
    else if (entryPoint == "Start page on GOV.UK") {
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
      'error' : req.query.error
		})
  })
  router.post('/' + version + '/' + 'signed-in/select-location-validation', function (req, res) {

    var careHome = req.body['careHome']

    // Error validation - make sure user enters data into required field
    if (careHome == undefined) {
      res.redirect('/' + version + '/' + 'signed-in/select-location?error=true')
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