//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Workaround for Azure App Service URL encoding
// https://github.com/Azure/azure-functions-host/pull/9402
router.use((req, res, next) => {
  // We only want to interfere with requests for these specific plugin assets
  const problematicScopes = [
    '@ministryofjustice',
    '@x-govuk'
  ];

  let url = req.url;

  // Check if the URL contains any of our problematic package scopes
  const needsRepair = problematicScopes.some(scope => url.includes(scope));

  if (needsRepair) {
    // 1. Fix the @ symbol
    url = url.replace(/@/g, '%40');

    // 2. Fix the slash specifically within the package scope
    // This repairs '@ministryofjustice/frontend' to '%40ministryofjustice%2ffrontend'
    // without breaking the rest of the URL path slashes
    url = url.replace(/%40ministryofjustice\/frontend/g, '%40ministryofjustice%2ffrontend');
    url = url.replace(/%40x-govuk\/govuk-prototype-components/g, '%40x-govuk%2fgovuk-prototype-components');
    url = url.replace(/%40x-govuk\/govuk-prototype-filters/g, '%40x-govuk%2fgovuk-prototype-filters');

    req.url = url;
    req.originalUrl = url;
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