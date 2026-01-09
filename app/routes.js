//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

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