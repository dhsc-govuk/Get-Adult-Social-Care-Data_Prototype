module.exports = function(router) {

  var version = 'private-beta';

  /*****
   * Additional screens (Get adult social care data)
  *****/

  router.get('/' + version + '/' + 'disclaimer', function (req, res) {
    res.render(version + '/disclaimer', {
      'backLink' : req.query.backLink
		})
  })

}