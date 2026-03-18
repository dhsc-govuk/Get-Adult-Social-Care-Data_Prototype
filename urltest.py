# Test for the workaround for specific components with odd paths
import requests

ROOT = "http://localhost:3000"
urls = [
    "/plugin-assets/@x-govuk/govuk-prototype-components/dist/govuk-prototype-components.min.js",
    "/plugin-assets/@govuk-one-login/service-header/dist/scripts/init-service-header.js",
    "/plugin-assets/@ministryofjustice/frontend/moj/moj-frontend.min.js",
    "/plugin-assets/@x-govuk/govuk-prototype-components/src/govuk-prototype-kit/init.js",
    "/plugin-assets/@ministryofjustice/frontend/moj/init.js",
    "/plugin-assets/@ministryofjustice/frontend/moj/bad.txt",
    "/plugin-assets/@ministryofjustice/../../bad.password",
]

for url in urls:
    try:
        response = requests.get(ROOT + url)
        print(f"Status Code: {response.status_code}, URL: {url}")
    except requests.exceptions.RequestException as e:
        print(f"URL: {url}, Error: {e}")
