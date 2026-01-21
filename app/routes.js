//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Workaround for Azure App Service URL encoding
// https://github.com/Azure/azure-functions-host/pull/9402
router.use((req, res, next) => {
  // 1. Capture the URL as Express currently sees it
  let url = req.url;

  // 2. Check if the URL contains a literal '@' 
  // Azure often decodes %40 to @, which Express might struggle to route
  if (url.includes('@')) {
    url = url.replace(/@/g, '%40');
  }

  // 3. Fix for 'double slashes' or mangled encoded slashes
  // Some Azure proxies turn %2F into / which breaks routing logic
  // This is rarer but happens with scoped npm packages in paths
  
  if (url !== req.url) {
    req.url = url;
  }
  
  next();
});

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