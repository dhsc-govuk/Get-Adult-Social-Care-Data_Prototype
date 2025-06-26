module.exports = function(router) {

  var version = 'v5';

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
   * ?
  *****/

  /*****
   * Additional screens (Get adult social care data)
   * ?
  *****/  

}