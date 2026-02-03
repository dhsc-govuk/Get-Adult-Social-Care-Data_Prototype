//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Added by Matt to fix the bizarre Azure URL encoding issues with the GOV.UK Prototype Kit
const path = require('path')

// Workaround for IIS path mangling, which turns URL encoded chars into their equivalents
// before sending them to the app
router.get('/plugin-assets/:scope/:package/*', (req, res, next) => {
  const { scope, package } = req.params
  
  // 1. Only intercept the known problematic scopes
  const allowedScopes = [
    '@ministryofjustice',
    '@ministryofjustice/frontend',
    '@x-govuk',
    '@x-govuk/govuk-prototype-components',
    '@govuk-one-login',
    '@govuk-one-login/service-header',
  ]
  if (!allowedScopes.includes(scope)) {
    return next()
  }

  // 2. Extension Lock-Down
  const allowedExtensions = ['.css', '.js', '.css.map', '.js.map']
  const requestedAssetPath = req.params[0]
  const extension = path.extname(requestedAssetPath).toLowerCase()

  if (!allowedExtensions.includes(extension)) {
    console.warn(`Blocked request for unsupported file extension: ${extension}`)
    return res.status(403).send('Forbidden: File type not allowed')
  }

  // 3. Resolve the absolute base directory for this specific package
  const rootModules = path.join(__dirname, '../node_modules')
  const packageDir = path.join(rootModules, scope, package)
  
  // 4. Resolve and Normalize the requested file path
  const safeFilePath = path.resolve(packageDir, requestedAssetPath)

  // 5. SECURITY CHECK: Path Traversal Jail-break check
  if (!safeFilePath.startsWith(packageDir)) {
    console.error(`Security blocked path traversal attempt: ${safeFilePath}`)
    return res.status(403).send('Forbidden')
  }

  // 6. Serve the file
  res.sendFile(safeFilePath, (err) => {
    if (err) {
      // If file not found, fall back to default prototype kit behavior
      next() 
    }
  })
})

// Versioned route files
require('./routes/v9')(router)
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