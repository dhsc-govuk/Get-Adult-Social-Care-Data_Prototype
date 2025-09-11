module.exports = function(router) {

  var version = 'private-beta/2025/august';

  /*****
   * Signed in (Get adult social care data)
   * Current population needs and capacity
  *****/

  router.get('/' + version + '/' + 'current-population-needs/total-beds-edit-filters', function (req, res) {
    res.render(version + '/current-population-needs/total-beds-edit-filters', {
      'error' : req.query.error
		})
  })
  router.post('/' + version + '/' + 'current-population-needs/total-beds-edit-filters-validation', function (req, res) {

    var bedType = req.body['bedType']

    // Error validation - make sure user enters data into required field
    if (bedType == "_unchecked") {
      res.redirect('/' + version + '/' + 'current-population-needs/total-beds-edit-filters?error=true')
    }
    // User selects at least one filter
    else {
      res.redirect('/' + version + '/' + 'current-population-needs/total-beds')
    }

  })
  
  router.get('/' + version + '/' + 'current-population-needs/total-beds-edit-table-filters', function (req, res) {
    res.render(version + '/current-population-needs/total-beds-edit-table-filters', {
      'error' : req.query.error
		})
  })
  router.post('/' + version + '/' + 'current-population-needs/total-beds-edit-table-filters-validation', function (req, res) {

    var filters = req.body['filters']

    // Error validation - make sure user enters data into required field
    if (filters == "_unchecked") {
      res.redirect('/' + version + '/' + 'current-population-needs/total-beds-edit-table-filters?error=true')
    }
    // User selects at least one filter
    else {
      res.redirect('/' + version + '/' + 'current-population-needs/total-beds')
    }

  })

  /*****
   * Additional screens (Get adult social care data)
  *****/

  router.get('/' + version + '/' + 'disclaimer', function (req, res) {
    res.render(version + '/disclaimer', {
      'backLink' : req.query.backLink
		})
  })

}