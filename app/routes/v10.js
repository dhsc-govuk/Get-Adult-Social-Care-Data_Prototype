module.exports = function(router) {

  var version = 'v10';
  const providerLocations = require('../data/v10/provider-locations.json');
  const careHomeBedsAndOccupancy = require('../data/v10/residential-care/care-home-beds-and-occupancy.json');
  const numberOfAdultsReceivingCommunitySocialCare = require('../data/v10/residential-care/number-of-adults-receiving-community-social-care.json');
  const localAuthorityFundingForAdultSocialCare = require('../data/v10/funding/local-authority-funding-for-adult-social-care.json');
  const estimatedPopulationSize = require('../data/v10/future-planning/estimated-population-size.json');
  const estimatedAutisticDisorders = require('../data/v10/future-planning/estimated-autistic-disorders.json');
  const estimatedEarlyOnsetDementia = require('../data/v10/future-planning/estimated-early-onset-dementia.json');
  const estimatedLearningDisability = require('../data/v10/future-planning/estimated-learning-disability.json');
  const laFundingPlanning = require('../data/v10/future-planning/la-funding-planning.json');

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

    if (userType == "Local authority") {
      req.session.data['selectedLocationName'] = "Suffolk"
      req.session.data['selectedServiceType'] = "Local authority"
      req.session.data['locations'] = "1"
      req.session.data['postAuthenticationURL'] = "home"
    }
    else {

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
      
    }

    // Routing - send to the chosen entry point
    if (entryPoint == "Start page on GOV.UK (public beta)") {
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
  router.get('/' + version + '/' + 'signed-in/topics/residential-care/provision-and-occupancy/data', function (req, res) {
    
    const onsVersion = require("@ons/design-system/package.json").version

    // Chart (bar chart): Care home bed numbers
    // BUILD the chart
    const selectedBedType1 = (req.session.data['bedType1'] && String(req.session.data['bedType1']).trim()) || 'All bed types'
    const rows1 = careHomeBedsAndOccupancy["Care home bed numbers"] || []
    const selectedBarRow =
      rows1.find(r => String(r["Care home bed type"] || '').trim() === selectedBedType1)
      || rows1.find(r => String(r["Care home bed type"] || '').trim() === 'All bed types')
      || rows1[0]
    const barCategories = selectedBarRow
      ? Object.keys(selectedBarRow).filter(k => k !== "Care home bed type")
      : []
    const barValues = barCategories.map(k => {
      const num = Number(selectedBarRow?.[k])
      return Number.isFinite(num) ? num : null
    })
    const barConfig = {
      chart: { type: "bar" },
      legend: { enabled: false },
      yAxis: {
        title: { text: "Bed numbers per 100,000 adult population" },
        labels: { format: "{value:,.0f}" }
      },
      xAxis: {
        categories: barCategories,
        type: "linear"
      },
      series: [{
        name: selectedBarRow?.["Care home bed type"] || selectedBedType1,
        data: barValues,
        dataLabels: true
      }]
    }
    const bedTypeLabelLower1 = (selectedBarRow?.["Care home bed type"] || selectedBedType1).toLowerCase()
    // Dynamically generate the correct URL for the non JavaScript fallback image to match the selected bed type
    const slug1 = (selectedBarRow?.Indicator || selectedBedType1)
      .toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/&[^;]+;/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Chart (line chart): Care home bed numbers - trends over time
    // BUILD the chart
    const selectedBedType2 = (req.session.data['bedType3'] && String(req.session.data['bedType3']).trim()) || 'All bed types'
    const rows2 = careHomeBedsAndOccupancy["Change over time"] || []
    const selectedRow = rows2.find(r => String(r.Indicator || '').trim() === selectedBedType2) || rows2.find(r => String(r.Indicator || '').trim() === 'All bed types') || rows2[0]
    const monthIndex = { january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6, august: 7, september: 8, october: 9, november: 10, december: 11 }
    const parseMonthYear = (label) => {
      const [month, year] = String(label).trim().split(/\s+/)
      const m = monthIndex[String(month).toLowerCase()]
      const y = Number(year)
      if (!Number.isFinite(y) || typeof m === "undefined") return null
      return { y, m }
    }
    const categoriesFull = selectedRow
      ? Object.keys(selectedRow).filter(k => k !== "Indicator")
      : []
    categoriesFull.sort((a, b) => {
      const pa = parseMonthYear(a)
      const pb = parseMonthYear(b)
      if (!pa || !pb) return 0
      if (pa.y !== pb.y) return pa.y - pb.y
      return pa.m - pb.m
    })
    const lineSeries = [{
      name: selectedRow?.Indicator || selectedBedType2,
      data: categoriesFull.map((label) => {
        const parsed = parseMonthYear(label)
        if (!parsed) return null
        const raw = selectedRow?.[label]
        if (raw === "" || raw === null || typeof raw === "undefined") return null
        const num = Number(raw)
        if (!Number.isFinite(num)) return null
        return {
          x: Date.UTC(parsed.y, parsed.m, 1),
          y: num,
          name: label
        }
      }).filter(Boolean),
      marker: { enabled: false }
    }]
    const bedTypeLabel = selectedRow?.Indicator || selectedBedType2
    const bedTypeLabelLower2 = bedTypeLabel.toLowerCase()
    // Build the same config structure the macro would have output
    const lineConfig = {
      chart: { type: "line" },
      legend: { enabled: false },
      tooltip: {
        useHTML: false,
        headerFormat: "",
        pointFormat: "<b>{point.name}</b><br/>{series.name}: <b>{point.y:,.0f}</b>"
      },
      yAxis: {
        title: { text: "Bed numbers per 100,000 adult population" },
        labels: { format: "{value:,.0f}" }
      },
      xAxis: {
        title: { text: "Month" },
        type: "datetime",
        labels: {
          format: "{value:%b %y}"
        }
      },
      series: lineSeries
    }
    // Dynamically generate the correct URL for the non JavaScript fallback image to match the selected bed type
    const slug2 = (selectedRow?.Indicator || selectedBedType2)
      .toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/&[^;]+;/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // RENDER all chart options and JSON
    res.render(version + "/signed-in/topics/residential-care/provision-and-occupancy/data", {
      useOnsAssets: true,
      onsVersion,
      // Chart (bar chart): Care home bed numbers
      selectedBedType1,
      barChart: {
        chartType: "bar",
        theme: "primary",
        title: "Figure 1: care home bed numbers per 100,000 adult population (" + bedTypeLabelLower1 + ") – <abbr title='Local Authority'>LA</abbr>s in the East of England, October 2025",
        id: "figure-1-care-home-bed-numbers",
        caption: "Source: Capacity Tracker from the Department of Health and Social Care (DHSC), population estimates from the Office for National Statistics (ONS)",
        description: "Bar chart showing care home bed numbers per 100,000 adult population for " + (selectedBarRow?.Indicator || selectedBedType1) + " in Suffolk LA.",
        fallbackImageUrl: "/public/downloads/v10/residential-care/care-home-beds-and-occupancy-levels/figure-1-care-home-bed-numbers-" + slug1 + ".png",
        fallbackImageAlt: "Bar chart showing care home bed numbers per 100,000 adult population for " + (selectedBarRow?.Indicator || selectedBedType1) + " in Suffolk LA."
      },
      // IMPORTANT: stringify server-side and pass as a literal string
      barHighchartsConfig:JSON.stringify(barConfig),
      // Chart (line chart): Care home bed numbers - trends over time
      selectedBedType2,
      selectedRow,
      monthColumns: categoriesFull,
      lineChart: {
        chartType: "line",
        theme: "primary",
        title: "Figure 2: care home bed numbers per 100,000 adult population (" + bedTypeLabelLower2 + ") – Suffolk <abbr title='Local Authority'>LA</abbr>, 1 February 2025 to 1 October 2025",
        id: "figure-2-care-home-bed-numbers-trends-over-time",
        caption: "Source: Capacity Tracker from the Department of Health and Social Care (DHSC), population estimates from the Office for National Statistics (ONS)",
        description: "Line chart showing care home bed numbers per 100,000 adult population for " + (selectedRow?.Indicator || selectedBedType2) + " in Suffolk over time.",
        fallbackImageUrl: "/public/downloads/v10/residential-care/care-home-beds-and-occupancy-levels/figure-2-care-home-bed-numbers-trends-over-time-" + slug2 + ".png",
        fallbackImageAlt: "Line chart showing care home bed numbers per 100,000 adult population for " + (selectedRow?.Indicator || selectedBedType2) + " in Suffolk over time."
      },
      // IMPORTANT: stringify server-side and pass as a literal string
      lineHighchartsConfig:JSON.stringify(lineConfig)
    })
  })
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
  router.get('/' + version + '/' + 'signed-in/topics/residential-care/number-of-people-receiving-care/data', function (req, res) {

    const selectedLocationName = req.session.data['selectedLocationName'] || "Station Road Centre (Sudbury)"
    const dataset = numberOfAdultsReceivingCommunitySocialCare["Change over time"]?.[0]
    const points = (dataset?.data || []).slice().reverse();
    const shortMonth = (m) => {
      const [month, year] = String(m).split(" ")
      if (!month || !year) return String(m)
      return `${month.slice(0, 3)} ${year.slice(2)}`
    };
    const categories = points.map(d => shortMonth(d.month))
    const series = [{
      name: "Proportion delivered by " + selectedLocationName,
      data: points.map(d => {
        const raw = d.proportion_percent
        if (raw === "" || raw === null || typeof raw === "undefined") return null
        const num = Number(raw)
        if (!Number.isFinite(num)) return null
        return {
          y: num,
          name: d.month
        }
      }),
      marker: { enabled: false }
    }]
    const onsVersion = require("@ons/design-system/package.json").version
    const config = {
      chart: { type: "line" },
      legend: { enabled: false },
      tooltip: {
        useHTML: false,
        headerFormat: "",
        pointFormat: "<b>{point.name}</b><br/>{series.name}: <b>{point.y}%</b>"
      },
      yAxis: {
        title: { text: "Proportion delivered by " + selectedLocationName },
        labels: { format: "{value}%" }
      },
      xAxis: {
        title: { text: "Month" },
        categories,
        type: "category",
        labels: {}
      },
      series
    }

    res.render(version + "/signed-in/topics/residential-care/number-of-people-receiving-care/data", {
      table: dataset,
      tableRows: points,
      useOnsAssets: true,
      onsVersion,
      chart: {
        chartType: "line",
        theme: "primary",
        title: "Figure 1: percentage of the total number of people receiving community social care in Suffolk who were supported by " + selectedLocationName + " - August 2024 to July 2025",
        id: "figure-1-proportion-community-social-care-over-time",
        caption: "Source: Capacity Tracker from the Department of Health and Social Care (DHSC)",
        description: "Line chart showing the percentage of the total number of people receiving community social care in Suffolk who were supported by " + selectedLocationName + " from August 2024 to July 2025.",
        fallbackImageUrl: "/public/downloads/v10/residential-care/number-of-adults-receiving-community-social-care/figure-1-proportion-community-social-care-over-time.png",
        fallbackImageAlt: "Line chart showing the percentage of the total number of people receiving community social care in Suffolk who were supported by " + selectedLocationName + " from August 2024 to July 2025."
      },
      highchartsConfig: JSON.stringify(config)
    })
  })
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

  // LA funding for adult social care
  router.get('/' + version + '/' + 'signed-in/topics/financial-spend-and-unpaid-care/financial-spend/data', function (req, res) {
    
    // Chart (line chart): LA funding for long-term adult social care - trends over time
    // BUILD the chart
    const selectedAgeGroup = req.session.data['ageGroup14'] || 'All age groups'
    const lowerCaseAgeGroup = selectedAgeGroup.toLowerCase()
    const chartTitleTextSelectedAgeGroup = selectedAgeGroup === "Aged 18 to 64" || selectedAgeGroup === "Aged 65 and over" ? "people " + lowerCaseAgeGroup : lowerCaseAgeGroup
    const selectedSupportSetting = req.session.data['supportSetting16'] || 'All types of adult social care'
    const chartTitleTextselectedSupportSetting = selectedSupportSetting.toLowerCase()
    const allRows = localAuthorityFundingForAdultSocialCare["Local authority funding for long-term adult social care – trends over time"] || []
    const filteredRows = allRows.filter(r => r['Age group'] === selectedAgeGroup && r['Care type or funding method'] === selectedSupportSetting)
    const sortedRows = filteredRows.slice().sort((a, b) => {
      const aStart = parseInt(String(a['Financial year']).split(' to ')[0], 10)
      const bStart = parseInt(String(b['Financial year']).split(' to ')[0], 10)
      return aStart - bStart
    })
    const categories = sortedRows.map(r => String(r['Financial year']))
    const seriesNames = ['Suffolk', 'East of England (LA average)', 'England (LA average)']
    const series = seriesNames.map(name => ({
      name,
      data: sortedRows.map(r => {
        const raw = r[name]
        if (raw === "" || raw === null || typeof raw === "undefined") return null
        const num = Number(String(raw).replace(/,/g, ''))
        return Number.isFinite(num) ? num : null
      }),
      marker: { enabled: false }
    }))
    const onsVersion = require("@ons/design-system/package.json").version
    // Build the same config structure the macro would have output
    const config = {
      chart: { type: "line" },
      legend: { enabled: true },
      yAxis: {
        title: { text: "Total financial spend" },
        labels: { format: "£{value:,.0f}" }
      },
      xAxis: {
        title: { text: "Financial Year" },
        categories,
        type: "category",
        labels: {}
      },
      tooltip: {
        valuePrefix: "£",
        valueDecimals: 0
      },
      series
    }

    // RENDER all chart options and JSON
    res.render(version + "/signed-in/topics/financial-spend-and-unpaid-care/financial-spend/data", {
      useOnsAssets: true,
      onsVersion,
      fundingTrendRows: sortedRows,
      chart: {
        chartType: "line",
        theme: "primary",
        title: "Figure 1: Total funding for long-term adult social care for " + chartTitleTextselectedSupportSetting + " and " + chartTitleTextSelectedAgeGroup + " &ndash; Suffolk <abbr title='Local Authority'>LA</abbr>, East of England region and England, financial years 2021 to 2024",
        id: "figure-1-la-funding-for-long-term-adult-social-care-trends-over-time",
        caption: "Source: Adult Social Care Activity and Finance Report from NHS England",
        description: "Line chart showing total financial spened for long-term adult social care over time by Suffolk LA, East of England region and England.",
        fallbackImageUrl: "/public/downloads/v10/funding/la-funding-for-adult-social-care/figure-1-la-funding-for-long-term-adult-social-care-trends-over-time.png",
        fallbackImageAlt: "Line chart showing total financial spened for long-term adult social care over time by Suffolk LA, East of England region and England."
      },
      // IMPORTANT: stringify server-side and pass as a literal string
      highchartsConfig: JSON.stringify(config)
    })
  })
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
   * Signed in
   * Data > Future planning
  *****/

  // Estimated population size and age group percentages
  router.get('/' + version + '/' + 'signed-in/topics/future-planning/estimated-population-age-and-size/data', function (req, res) {
    
    // Chart (line chart): Estimated percentage change in population across Suffolk and similar LAs - trends over time
    // BUILD the chart
    const allRows = estimatedPopulationSize["Change over time"] || []
    const selectedAgeGroup =
      (req.session.data && req.session.data.ageGroup19 && String(req.session.data.ageGroup19).trim())
      ? String(req.session.data.ageGroup19).trim()
      : "All age groups"
    const rows = allRows.filter(r => String(r.Indicator).trim() === selectedAgeGroup)
    const fallbackImageMap = {
      "All age groups": "/public/downloads/v10/future-planning/estimated-population-size/figure-1-estimated-population-size-change-over-time-all.png",
      "18-64": "/public/downloads/v10/future-planning/estimated-population-size/figure-1-estimated-population-size-change-over-time-16-64.png",
      "65+": "/public/downloads/v10/future-planning/estimated-population-size/figure-1-estimated-population-size-change-over-time-65-74.png",
      "18-24": "/public/downloads/v10/future-planning/estimated-population-size/figure-1-estimated-population-size-change-over-time-75-84.png",
      "25-64": "/public/downloads/v10/future-planning/estimated-population-size/figure-1-estimated-population-size-change-over-time-85-over.png"
    }
    const fallbackImageUrl = fallbackImageMap[selectedAgeGroup] || fallbackImageMap["All age groups"]
    const finalRows = rows.length
      ? rows
      : allRows.filter(r => String(r.Indicator).trim() === "All age groups")
    const categories = finalRows.map(r => String(r.Year));
    const areas = ["Suffolk", "Dorset", "Herefordshire", "Kent", "Norfolk", "Somerset"]
    const series = areas.map((area) => ({
      name: area,
      data: finalRows.map(r => {
        const raw = r[area]
        if (raw === "" || raw === null || typeof raw === "undefined") return null
        const num = Number(raw)
        return Number.isFinite(num) ? num : null
      }),
      marker: { enabled: false }
    }))
    const onsVersion = require("@ons/design-system/package.json").version
    // Build the same config structure the macro would have output
    const config = {
      chart: { type: "line" },
      legend: { enabled: true },
      yAxis: {
        title: { text: "Percentage change from baseline (2025)" },
        labels: { format: "{value:.2f}" }
      },
      xAxis: {
        title: { text: "Year" },
        categories,
        type: "category",
        labels: {}
      },
      series
    }

    // RENDER all chart options and JSON
    res.render(version + "/signed-in/topics/future-planning/estimated-population-age-and-size/data", {
      useOnsAssets: true,
      onsVersion,
      chart: {
        chartType: "line",
        theme: "primary",
        title: "Figure 1: estimated percentage change in adult population over time compared with similar LAs",
        id: "figure-1-estimated-population-size-change-la-and-neighbours",
        caption: "Source: Population estimates from the Office for National Statistics (ONS), 2022",
        description: "Line chart showing percentage change over time in adult population for Suffolk and similar LAs Dorset, Herefordshire, Kent, Norfolk and Somerset.",
        fallbackImageUrl,
        fallbackImageAlt: "Line chart showing percentage change over time in adult population for Suffolk and similar LAs Dorset, Herefordshire, Kent, Norfolk and Somerset."
      },
      // IMPORTANT: stringify server-side and pass as a literal string
      highchartsConfig: JSON.stringify(config)
    })
  })
  router.post('/' + version + '/' + 'signed-in/topics/future-planning/estimated-population-age-and-size/data-update-filters17', function (req, res) {

    // Data objects to be retrieved and queried
    var year = req.session.data['year']

    // Reset all default values injected into our filters
    if (year == "2030") {
      year = undefined
    }

    // User has chosen at least 1 filter  
		if (year) {
      res.redirect('/' + version + '/' + 'signed-in/topics/future-planning/estimated-population-age-and-size/data?filterApplied17=Yes#data1')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/future-planning/estimated-population-age-and-size/data?filterApplied17=#data1')
    }
    
  })
  router.post('/' + version + '/' + 'signed-in/topics/future-planning/estimated-population-age-and-size/data-update-filters18', function (req, res) {

    // Data objects to be retrieved and queried
    var year18 = req.session.data['year18']

    // Reset all default values injected into our filters
    if (year18 == "2030") {
      year18 = undefined
    }

    // User has chosen at least 1 filter  
		if (year18) {
      res.redirect('/' + version + '/' + 'signed-in/topics/future-planning/estimated-population-age-and-size/data?filterApplied18=Yes#data2')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/future-planning/estimated-population-age-and-size/data?filterApplied18=#data2')
    }
    
  })
  router.post('/' + version + '/' + 'signed-in/topics/future-planning/estimated-population-age-and-size/data-update-filters19', function (req, res) {

    // Data objects to be retrieved and queried
    var ageGroup19 = req.session.data['ageGroup19']

    // Reset all default values injected into our filters
    if (ageGroup19 == "All age groups") {
      ageGroup19 = undefined
    }

    // User has chosen at least 1 filter  
		if (ageGroup19) {
      res.redirect('/' + version + '/' + 'signed-in/topics/future-planning/estimated-population-age-and-size/data?filterApplied19=Yes#trend1')     
		}
		// No filters selected by user
		else {			
      res.redirect('/' + version + '/' + 'signed-in/topics/future-planning/estimated-population-age-and-size/data?filterApplied19=#trend1')
    }
    
  })

  // Estimates on ASD
  router.get('/' + version + '/' + 'signed-in/topics/future-planning/estimates-on-autistic-spectrum-disorders/data', function (req, res) {
    
    // Chart (line chart): Estimated adult population with ASD - trends over time
    // BUILD the chart
    const rows = estimatedAutisticDisorders["Change over time"] || []
    const categories = rows.map(r => String(r.Year))
    const areas = ["Suffolk", "Dorset", "Herefordshire", "Kent", "Norfolk", "Somerset"]
    const series = areas.map((area) => ({
      name: area,
      data: rows.map(r => {
        const raw = r[area]
        if (raw === "" || raw === null || typeof raw === "undefined") return null
        const num = Number(raw)
        return Number.isFinite(num) ? num : null
      }),
      marker: { enabled: false }
    }))
    const onsVersion = require("@ons/design-system/package.json").version
    // Build the same config structure the macro would have output
    const config = {
      chart: { type: "line" },
      legend: { enabled: true },
      yAxis: {
        title: { text: "Percentage change from baseline (2025)" },
        labels: { format: "{value:.2f}" }
      },
      xAxis: {
        title: { text: "Year" },
        categories,
        type: "category",
        labels: {}
      },
      series
    }

    // RENDER all chart options and JSON
    res.render(version + "/signed-in/topics/future-planning/estimates-on-autistic-spectrum-disorders/data", {
      useOnsAssets: true,
      onsVersion,
      chart: {
        chartType: "line",
        theme: "primary",
        title: "Figure 1: estimated percentage change in population aged 18-64 with ASD compared with similar LAs",
        id: "figure-1-estimated-population-with-asd-over-time",
        caption: "Source: PANSI",
        description: "Line chart showing percentage change over time in population aged 18-64 with ASD for Suffolk and similar LAs Dorset, Herefordshire, Kent, Norfolk and Somerset.",
        fallbackImageUrl: "/public/downloads/v10/future-planning/estimated-autistic-disorders/figure-1-estimated-population-with-asd-over-time.png",
        fallbackImageAlt: "Line chart showing percentage change over time in population aged 18-64 with ASD for Suffolk and similar LAs Dorset, Herefordshire, Kent, Norfolk and Somerset."
      },
      // IMPORTANT: stringify server-side and pass as a literal string
      highchartsConfig: JSON.stringify(config)
    })
  })
  
  // Estimates on early onset dementia
  router.get('/' + version + '/' + 'signed-in/topics/future-planning/estimates-on-early-onset-dementia/data', function (req, res) {
    
    // Chart (line chart): Predicted early onset dementia prevalence - trends over time
    // BUILD the chart
    const rows = estimatedEarlyOnsetDementia["Change over time"] || []
    const categories = rows.map(r => String(r.Year))
    const areas = ["Suffolk", "Dorset", "Herefordshire", "Kent", "Norfolk", "Somerset"]
    const series = areas.map((area) => ({
      name: area,
      data: rows.map(r => {
        const raw = r[area]
        if (raw === "" || raw === null || typeof raw === "undefined") return null
        const num = Number(raw)
        return Number.isFinite(num) ? num : null
      }),
      marker: { enabled: false }
    }))
    const onsVersion = require("@ons/design-system/package.json").version
    // Build the same config structure the macro would have output
    const config = {
      chart: { type: "line" },
      legend: { enabled: true },
      yAxis: {
        title: { text: "Percentage change from baseline (2025)" },
        labels: { format: "{value:.2f}" }
      },
      xAxis: {
        title: { text: "Year" },
        categories,
        type: "category",
        labels: {}
      },
      series
    }

    // RENDER all chart options and JSON
    res.render(version + "/signed-in/topics/future-planning/estimates-on-early-onset-dementia/data", {
      useOnsAssets: true,
      onsVersion,
      chart: {
        chartType: "line",
        theme: "primary",
        title: "Figure 1: estimated percentage change in population aged 30-64 with early onset dementia compared with similar LAs",
        id: "figure-1-predicted-early-onset-dementia-prevalence-over-time",
        caption: "Source: PANSI",
        description: "Line chart showing percentage change over time in population aged 30-64 with early onset dementia for Suffolk and similar LAs Dorset, Herefordshire, Kent, Norfolk and Somerset.",
        fallbackImageUrl: "/public/downloads/v10/future-planning/estimated-early-onset-dementia/figure-1-predicted-early-onset-dementia-prevalence-over-time.png",
        fallbackImageAlt: "Line chart showing percentage change over time in population aged 30-64 with early onset dementia for Suffolk and similar LAs Dorset, Herefordshire, Kent, Norfolk and Somerset."
      },
      // IMPORTANT: stringify server-side and pass as a literal string
      highchartsConfig: JSON.stringify(config)
    })
  })

  // Estimates on general health, disabilities and learning disabilities
  router.get('/' + version + '/' + 'signed-in/topics/future-planning/estimates-on-general-health-disabilities-and-learning-disabilities/data', function (req, res) {
    
    // Chart (line chart): Estimated percentage change in population with learning disabilities with predicted challenging behaviour - trends over time
    // BUILD the chart
    const rows = estimatedLearningDisability["Change over time"] || []
    const categories = rows.map(r => String(r.Year))
    const areas = ["Suffolk", "Dorset", "Herefordshire", "Kent", "Norfolk", "Somerset"]
    const series = areas.map((area) => ({
      name: area,
      data: rows.map(r => {
        const raw = r[area]
        if (raw === "" || raw === null || typeof raw === "undefined") return null
        const num = Number(raw)
        return Number.isFinite(num) ? num : null
      }),
      marker: { enabled: false }
    }))
    const onsVersion = require("@ons/design-system/package.json").version
    // Build the same config structure the macro would have output
    const config = {
      chart: { type: "line" },
      legend: { enabled: true },
      yAxis: {
        title: { text: "Percentage change from baseline (2025)" },
        labels: { format: "{value:.2f}" }
      },
      xAxis: {
        title: { text: "Year" },
        categories,
        type: "category",
        labels: {}
      },
      series
    }

    // RENDER all chart options and JSON
    res.render(version + "/signed-in/topics/future-planning/estimates-on-general-health-disabilities-and-learning-disabilities/data", {
      useOnsAssets: true,
      onsVersion,
      chart: {
        chartType: "line",
        theme: "primary",
        title: "Figure 1: estimated percentage change in population aged 18-64 with learning disabilities and predicted challenging behaviour compared with similar LAs",
        id: "figure-1-estimated-population-with-learning-disabilities-over-time",
        caption: "Source: PANSI",
        description: "Line chart showing percentage change over time in population aged 18-64 with learning disabilities and predicted challenging behaviour for Suffolk and similar LAs Dorset, Herefordshire, Kent, Norfolk and Somerset.",
        fallbackImageUrl: "/public/downloads/v10/future-planning/estimated-learning-disability/figure-1-estimated-population-with-learning-disabilities-over-time.png",
        fallbackImageAlt: "Line chart showing percentage change over time in population aged 18-64 with learning disabilities and predicted challenging behaviour for Suffolk and similar LAs Dorset, Herefordshire, Kent, Norfolk and Somerset."
      },
      // IMPORTANT: stringify server-side and pass as a literal string
      highchartsConfig: JSON.stringify(config)
    })
  })

  // LA funding planning
  router.get('/' + version + '/' + 'signed-in/topics/future-planning/la-funding-planning/data', function (req, res) {
    
    // Chart (line chart): Estimated percentage change in population with selected health conditions - trends over time
    // BUILD the chart
    const rows = laFundingPlanning["Change over time"] || []
    const categories = rows.length
    ? Object.keys(rows[0]).filter(k => k !== "Indicator")
    : []
    categories.sort((a, b) => Number(a) - Number(b))
    const series = rows.map((r) => ({
      name: r.Indicator || "Unknown indicator",
      data: categories.map((year) => {
        const raw = r[year]
        if (raw === "" || raw === null || typeof raw === "undefined") return null
        const num = Number(raw)
        return Number.isFinite(num) ? num : null
      }),
      marker: { enabled: false }
    }))
    const onsVersion = require("@ons/design-system/package.json").version
    // Build the same config structure the macro would have output
    const config = {
      chart: { type: "line" },
      legend: { enabled: true },
      yAxis: {
        title: { text: "Percentage change from baseline (2025)" },
        labels: { format: "{value:.2f}" }
      },
      xAxis: {
        title: { text: "Year" },
        categories,
        type: "category",
        labels: {}
      },
      series
    }

    // RENDER all chart options and JSON
    res.render(version + "/signed-in/topics/future-planning/la-funding-planning/data", {
      useOnsAssets: true,
      onsVersion,
      chart: {
        chartType: "line",
        theme: "primary",
        title: "Figure 1: estimated percentage change in population aged 18-64 with selected health conditions compared with similar LAs",
        id: "figure-1-estimated-population-change-with-health-conditions-over-time",
        caption: "Source: PANSI",
        description: "Line chart showing percentage change over time in population aged 18-64 with selected health conditions for Suffolk and similar LAs Dorset, Herefordshire, Kent, Norfolk and Somerset.",
        fallbackImageUrl: "/public/downloads/v10/future-planning/la-funding-planning/figure-1-estimated-population-change-with-health-conditions-over-time.png",
        fallbackImageAlt: "Line chart showing percentage change over time in population aged 18-64 with selected health conditions for Suffolk and similar LAs Dorset, Herefordshire, Kent, Norfolk and Somerset."
      },
      // IMPORTANT: stringify server-side and pass as a literal string
      highchartsConfig: JSON.stringify(config)
    })
  })

  /*****
   * Additional screens
   * Footer, service information and system pages
  *****/

  router.get('/' + version + '/' + 'footer/terms-of-use', function (req, res) {
    res.render(version + '/footer/terms-of-use', {
      'backLink' : req.query.backLink
		})
  })

  router.get('/' + version + '/' + 'footer/privacy-policy', function (req, res) {
    res.render(version + '/footer/privacy-policy', {
      'backLink' : req.query.backLink
		})
  })
  
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