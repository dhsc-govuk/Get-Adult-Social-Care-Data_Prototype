module.exports = function(router) {

  var version = 'v6';

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

    // For Single Academy Trust (SAT) type users
    if (userType == "Single Academy Trust (SAT)") {
      req.session.data['rb'] = "SAT"
    }
    // For Multi Academy Trust (MAT) type users
    else {
      req.session.data['rb'] = "MAT"
    }

    // Routing - send to the chosen entry point
    if (entryPoint == "Start page on GOV.UK (Estate Management Portal)") {
      res.redirect('/' + version + '/' + 'emp/start')
    }
    else if (entryPoint == "Department for Education Sign-in") {
      res.redirect('/' + version + '/' + 'dfe-sign-in/department-for-education-sign-in')
    }
    else if (entryPoint == "Home (Estate Management Portal)") {
      res.redirect('/' + version + '/' + 'emp/home')
    }
    else {
      res.redirect('/' + version + '/' + 'start')
    }

  })

  /*****
   * Not signed in (Get adult social care data)
   * GOV.UK
  *****/

  /*****
   * Signed in (Get adult social care data)
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
   * Additional screens (Get adult social care data)
   * ?
  *****/  

}