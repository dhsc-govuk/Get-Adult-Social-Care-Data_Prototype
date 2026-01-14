module.exports = function(router) {

  var version = 'v8';
  const providerLocations = require('../data/v8/provider-locations.json');

  /*****
   * General prototype pages (not part of the service)
  *****/

  router.get('/' + version + '/' + 'config', function (req, res) {
    res.render(version + '/config', {
      'version' : version.substring(1)
		})
  })
  router.post('/' + version + '/' + 'config-validation', function (req, res) {
    
    var userType = req.session.data['userType']
    var entryPoint = req.session.data['entryPoint']
    var numberOfLocations = req.session.data['numberOfLocations']

    // For 'Number of locations' is '1'
    if (numberOfLocations == "1") {

      if (userType == "Care provider (care home)") {
        req.session.data['selectedLocationName'] = "Ashfield Court (Exeter)"
        req.session.data['selectedServiceType'] = "Care home"
      }
      else {
        req.session.data['selectedLocationName'] = "Station Road Centre (Sudbury)"
        req.session.data['selectedServiceType'] = "Community social care"
      }

      req.session.data['locations'] = "1"
      req.session.data['postAuthenticationURL'] = "home"
    }
    // For 'Number of locations' is '2 to 20'
    else if (numberOfLocations == "2 to 20 (select a location)") {
      req.session.data['locations'] = ""
      req.session.data['selectedLocationName'] = ""
      req.session.data['justSignedIn'] = "true"
      req.session.data['postAuthenticationURL'] = "select-location?searchRequired=false&paginationRequired=false"
    }
    // For 'Number of locations' is '21 to 100'
    else if (numberOfLocations == "21 to 100 (select a location with search)") {
      req.session.data['locations'] = ""
      req.session.data['selectedLocationName'] = ""
      req.session.data['justSignedIn'] = "true"
      req.session.data['postAuthenticationURL'] = "select-location?searchRequired=true&paginationRequired=false"
    }
    // For 'Number of locations' is '101 or more'
    else {
      req.session.data['locations'] = ""
      req.session.data['selectedLocationName'] = ""
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
    var locationId = req.body['locationId']

    // Error validation - make sure user enters data into required field
		if (locationId == undefined) {
      res.redirect('/' + version + '/' + 'signed-in/select-location?error=true&error2=true')      
		}
		// User selects a location
		else {		
      
      // Take user's selection ID, query it in the provider locations JSON data and store the related data objects as session data
      var locationId = Number(req.body['locationId'])
      const selectedLocation = providerLocations.find(l => l.ID === locationId)
      req.session.data['selectedLocation'] = selectedLocation
      req.session.data['selectedProviderName'] = selectedLocation?.['Provider name']
      req.session.data['selectedLocationName'] = selectedLocation?.['Location name']
      req.session.data['selectedLocationAddress'] = selectedLocation?.['Address']
      req.session.data['selectedLocationPostcode'] = selectedLocation?.['Postcode']
      req.session.data['selectedServiceType'] = selectedLocation?.['Service type']

      res.redirect('/' + version + '/' + 'signed-in/home?justSignedIn=false')
    }

  })
  router.post('/' + version + '/' + 'signed-in/select-location-search-and-pagination-validation', function (req, res) {

    // Data objects to be retrieved and queried
    var searchRequired = req.session.data['searchRequired']
    var paginationRequired = req.session.data['paginationRequired']
    var locationId = req.body['locationId']

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
		if (locationId == undefined) {
      res.redirect('/' + version + '/' + 'signed-in/select-location?error=true&error2=true' + searchRequiredURL + paginationRequiredURL)      
		}
		// User selects a location
		else {

      // Take user's selection ID, query it in the provider locations JSON data and store the related data objects as session data
      var locationId = Number(req.body['locationId'])
      const selectedLocation = providerLocations.find(l => l.ID === locationId)
      req.session.data['selectedLocation'] = selectedLocation
      req.session.data['selectedProviderName'] = selectedLocation?.['Provider name']
      req.session.data['selectedLocationName'] = selectedLocation?.['Location name']
      req.session.data['selectedLocationAddress'] = selectedLocation?.['Address']
      req.session.data['selectedLocationPostcode'] = selectedLocation?.['Postcode']
      req.session.data['selectedServiceType'] = selectedLocation?.['Service type']

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
    var postcode = req.session.data['postcode']
    var selectedLocationPostcode = req.session.data['selectedLocationPostcode'] || "CO5 1ST"
    var serviceType = req.session.data['serviceType']
    var cqcRating = req.session.data['cqcRating']

    // Reset all default values injected into our filters
    if (postcode == selectedLocationPostcode) {
      postcode = undefined
    }

    // User has chosen at least 1 filter  
		if (postcode || serviceType || cqcRating) {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/residential-care-providers/data?filterApplied=Yes#data1')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/residential-care-providers/data?filterApplied=#data1')
    }
    
  })
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/residential-care-providers/data-update-filters13', function (req, res) {

    // Data objects to be retrieved and queried
    var localAuthority13 = req.session.data['localAuthority13']

    // Reset all default values injected into our filters
    if (localAuthority13 == "Suffolk") {
      localAuthority13 = undefined
    }

    // User has chosen at least 1 filter  
		if (localAuthority13) {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/residential-care-providers/data?filterApplied13=Yes#data2')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/residential-care-providers/data?filterApplied13=#data2')
    }
    
  })

  // Care home beds and occupancy levels
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data-update-filters15', function (req, res) {

    // Data objects to be retrieved and queried
    var localAuthority15 = req.session.data['localAuthority15']

    // Reset all default values injected into our filters
    if (localAuthority15 == "Suffolk") {
      localAuthority15 = undefined
    }

    // User has chosen at least 1 filter  
		if (localAuthority15) {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data?filterApplied15=Yes')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data?filterApplied15=')
    }
    
  })
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data-update-filters1', function (req, res) {

    // Data objects to be retrieved and queried
    var bedType1 = req.session.data['bedType1']

    // Reset all default values injected into our filters
    if (bedType1 == "All bed types") {
      bedType1 = undefined
    }

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
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data-update-filters3', function (req, res) {

    // Data objects to be retrieved and queried
    var bedType3 = req.session.data['bedType3']

    // User has chosen at least 1 filter  
		if (bedType3) {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data?filterApplied3=Yes#trend1')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data?filterApplied3=#trend1')
    }
    
  })

  // Number of adults receiving community social care
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/number-of-people-receiving-care/data-update-filters12', function (req, res) {

    // Data objects to be retrieved and queried
    var localAuthority12 = req.session.data['localAuthority12']

    // Reset all default values injected into our filters
    if (localAuthority12 == "Suffolk") {
      localAuthority12 = undefined
    }

    // User has chosen at least 1 filter  
		if (localAuthority12) {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/number-of-people-receiving-care/data?filterApplied12=Yes')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/number-of-people-receiving-care/data?filterApplied12=')
    }
    
  })
  
  // Unpaid care
  router.post('/' + version + '/' + 'signed-in/topics/residential-care/unpaid-care/data-update-filters11', function (req, res) {

    // Data objects to be retrieved and queried
    var localAuthority11 = req.session.data['localAuthority11']

    // Reset all default values injected into our filters
    if (localAuthority11 == "Suffolk") {
      localAuthority11 = undefined
    }

    // User has chosen at least 1 filter  
		if (localAuthority11) {
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/unpaid-care/data?filterApplied11=Yes')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/residential-care/unpaid-care/data?filterApplied11=')
    }
    
  })

  /*****
   * Signed in
   * Data > Funding
  *****/

  // Local authority funding for adult social care
  router.post('/' + version + '/' + 'signed-in/topics/financial-spend-and-unpaid-care/financial-spend/data-update-filters14', function (req, res) {

    // Data objects to be retrieved and queried
    var localAuthority14 = req.session.data['localAuthority14']
    var ageGroup14 = req.session.data['ageGroup14']

    // Reset all default values injected into our filters
    if (localAuthority14 == "Suffolk") {
      localAuthority14 = undefined
    }

    if (ageGroup14 == "All age groups") {
      ageGroup14 = undefined
    }

    // User has chosen at least 1 filter  
		if (localAuthority14 || ageGroup14) {
      res.redirect('/' + version + '/' + 'signed-in/topics/financial-spend-and-unpaid-care/financial-spend/data?filterApplied14=Yes')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/financial-spend-and-unpaid-care/financial-spend/data?filterApplied14=')
    }
    
  })
  router.post('/' + version + '/' + 'signed-in/topics/financial-spend-and-unpaid-care/financial-spend/data-update-filters16', function (req, res) {

    // Data objects to be retrieved and queried
    var supportSetting16 = req.session.data['supportSetting16']

    // Reset all default values injected into our filters
    if (supportSetting16 == "All types of adult social care") {
      supportSetting16 = undefined
    }

    // User has chosen at least 1 filter  
		if (supportSetting16) {
      res.redirect('/' + version + '/' + 'signed-in/topics/financial-spend-and-unpaid-care/financial-spend/data?filterApplied16=Yes#trend1')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/financial-spend-and-unpaid-care/financial-spend/data?filterApplied16=#trend1')
    }
    
  })

  /*****
   * Signed in
   * Data > Population needs
  *****/

  // Dementia prevalence and estimated diagnosis rate
  router.post('/' + version + '/' + 'signed-in/topics/population-needs/dementia-prevalence/data-update-filters10', function (req, res) {

    // Data objects to be retrieved and queried
    var localAuthority10 = req.session.data['localAuthority10']

    // Reset all default values injected into our filters
    if (localAuthority10 == "Suffolk") {
      localAuthority10 = undefined
    }

    // User has chosen at least 1 filter  
		if (localAuthority10) {
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/dementia-prevalence/data?filterApplied10=Yes')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/dementia-prevalence/data?filterApplied10=')
    }
    
  })
  
  // Economic factors and household composition
  router.post('/' + version + '/' + 'signed-in/topics/population-needs/household-composition-and-economic-factors/data-update-filters9', function (req, res) {

    // Data objects to be retrieved and queried
    var localAuthority9 = req.session.data['localAuthority9']

    // Reset all default values injected into our filters
    if (localAuthority9 == "Suffolk") {
      localAuthority9 = undefined
    }

    // User has chosen at least 1 filter  
		if (localAuthority9) {
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/household-composition-and-economic-factors/data?filterApplied9=Yes')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/household-composition-and-economic-factors/data?filterApplied9=')
    }
    
  })
  
  // General health, disability and learning disability
  router.post('/' + version + '/' + 'signed-in/topics/population-needs/disability-prevalence/data-update-filters7', function (req, res) {

    // Data objects to be retrieved and queried
    var localAuthority7 = req.session.data['localAuthority7']

    // Reset all default values injected into our filters
    if (localAuthority7 == "Suffolk") {
      localAuthority7 = undefined
    }

    // User has chosen at least 1 filter  
		if (localAuthority7) {
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/disability-prevalence/data?filterApplied7=Yes')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/disability-prevalence/data?filterApplied7=')
    }
    
  })
  router.post('/' + version + '/' + 'signed-in/topics/population-needs/disability-prevalence/data-update-filters8', function (req, res) {

    // Data objects to be retrieved and queried
    var ageGroup8 = req.session.data['ageGroup8']
    var primarySupportReason8 = req.session.data['primarySupportReason8']

    // Reset all default values injected into our filters
    if (ageGroup8 == "All age groups") {
      ageGroup8 = undefined
    }

    // User has chosen at least 1 filter  
		if (ageGroup8 || primarySupportReason8) {
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/disability-prevalence/data?filterApplied8=Yes#data3')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/disability-prevalence/data?filterApplied8=#data3')
    }
    
  })

  // Population size and age group percentages
  router.post('/' + version + '/' + 'signed-in/topics/population-needs/population-age-and-size/data-update-filters4', function (req, res) {

    // Data objects to be retrieved and queried
    var ageGroup4 = req.session.data['ageGroup4']

    // User has chosen at least 1 filter  
		if (ageGroup4) {
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/population-age-and-size/data?filterApplied4=Yes#data2')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/population-age-and-size/data?filterApplied4=#data2')
    }
    
  })
  router.post('/' + version + '/' + 'signed-in/topics/population-needs/population-age-and-size/data-update-filters5', function (req, res) {

    // Data objects to be retrieved and queried
    var ageGroup5 = req.session.data['ageGroup5']

    // User has chosen at least 1 filter  
		if (ageGroup5) {
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/population-age-and-size/data?filterApplied5=Yes#data3')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/population-age-and-size/data?filterApplied5=#data3')
    }
    
  })
  router.post('/' + version + '/' + 'signed-in/topics/population-needs/population-age-and-size/data-update-filters6', function (req, res) {

    // Data objects to be retrieved and queried
    var localAuthority6 = req.session.data['localAuthority6']

    // Reset all default values injected into our filters
    if (localAuthority6 == "Suffolk") {
      localAuthority6 = undefined
    }

    // User has chosen at least 1 filter  
		if (localAuthority6) {
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/population-age-and-size/data?filterApplied6=Yes')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/population-needs/population-age-and-size/data?filterApplied6=')
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

  router.get('/' + version + '/' + 'system/http-status-codes/service-unavailable', function (req, res) {
    res.render(version + '/system/http-status-codes/service-unavailable', {
      'hideFooterLinks' : req.query.hideFooterLinks
		})
  })

  router.get('/' + version + '/' + 'system/http-status-codes/service-unavailable-with-date', function (req, res) {
    res.render(version + '/system/http-status-codes/service-unavailable-with-date', {
      'hideFooterLinks' : req.query.hideFooterLinks
		})
  })

}