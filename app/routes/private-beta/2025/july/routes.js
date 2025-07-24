module.exports = function(router) {

  var version = 'private-beta/2025/july';

  /*****
   * Signed in (Get adult social care data)
   * Current population needs and capacity
  *****/

  router.get('/' + version + '/' + 'current-population-needs/total-beds-edit-table-filters', function (req, res) {
    res.render(version + '/current-population-needs/total-beds-edit-table-filters', {
      'error' : req.query.error
		})
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