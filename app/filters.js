//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

// Adds commas to separate thousands, for numbers greater than 999
addFilter('addcommas', function (content) {
  if (content === null || content === undefined || content === "") return ""
  const num = Number(content)
  return Number.isFinite(num) ? num.toLocaleString("en-GB") : content
})