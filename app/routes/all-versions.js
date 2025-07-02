module.exports = function(router) {

  /******************************
   * Routes for all versions of the prototype
  ******************************/

  /*****
   * General prototype pages (not part of the service)
  *****/

  router.get('/:version/pages', function (req, res) {

    var version = req.params.version

    res.render(version + '/pages', {
      'version' : version
		})
  })

}