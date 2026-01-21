//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Workaround for Azure App Service URL encoding
// https://github.com/Azure/azure-functions-host/pull/9402
router.use((req, res, next) => {
  // Azure App Service stores the raw URL in this header
  const rawUrl = req.headers['x-waws-unencoded-url']
  
  if (rawUrl) {
    // rawUrl includes the query string (e.g. /public/images/@user.png?v=1)
    const urlParts = rawUrl.split('?')
    
    // Override the request properties so Express can find the real file
    req.url = rawUrl
    req.originalUrl = rawUrl
    req.path = urlParts[0]
  }
  next()
})

// Versioned route files
require('./routes/private-beta/2026/january/routes')(router)
require('./routes/v8')(router)
require('./routes/private-beta/2025/december/routes')(router)
require('./routes/v7')(router)
require('./routes/v6')(router)
require('./routes/private-beta/2025/august/routes')(router)
require('./routes/private-beta/2025/july/routes')(router)
require('./routes/v5')(router)
require('./routes/private-beta/2025/june/routes')(router)
require('./routes/all-versions')(router)

module.exports = router