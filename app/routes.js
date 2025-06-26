//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Versioned route files
require('./routes/v5')(router)
require('./routes/private-beta')(router)
require('./routes/all-versions')(router)

module.exports = router