# dhsc-gascd-prototype
GitHub repository for the Department of Health and Social Care (DHSC) get adult social care data (GASCD) prototype, based on the GOV.UK Prototyping Kit.

## Project history (up to April 2025)
Bobby King and Ian Cuddy worked on this prototype between November 2024 and April 2025. Most of the components came from the GOV.UK Prototyping Kit. 

+ They used D3.js to create some of the graphs and Leaflet.js to create interactive maps. For example, see the page ``` /0-5/landing-pages/care-home-capacity/care-homes ```.
+ They also used [Nunjucks](https://mozilla.github.io/nunjucks) and SVG to create some charts.
+ As the pages often required a lot of code, they used the Nunjucks 'include' feature. For example, ``` {% include "./foo.html "%} ``` in order to separate the graphs and tables into separate files. See the folder ``` /0-5/landing-pages/care-home-capacity/ ```.
+ They ran user research on the versions up until version 4. Version 5 is based on feedback from care providers and academic researchers but the project was put on hold before they got a chance to test it on more users.
+ The earlier versions of the designs contain more of a narrative; as time went on they found that users reacted with more enthusiasm to interactive maps and personalised data. Version 5 uses more of a 'show don't tell approach'.
+ They finished my leaving the message "if you're reading this, they hope you get the chance to test this prototype out on more users - Bobby King, April 2025".

## GASCD-specific installation instructions

This project uses [Mise](https://mise.jdx.dev/getting-started.html) to control dependency versions:

### Installing project dependencies

1. Clone the repo to your chosen directory
2. Run `mise install` to install the correct version of node
3. Run npm install to build the NodeJS app

### Running the prototype

`npm run dev`

This will start the development server on http://localhost:3000

### Docker support

The prototype is deployed to Azure using docker. You can also use the development `docker-compose.yml` file to run the prototype locally as follows:

`docker-compose up`

--

(Generic GOV.UK Prototype Kit instructions follow)

## GOV.UK Prototype Kit

Go to the [GOV.UK Prototype Kit site](https://prototype-kit.service.gov.uk/docs) to get the latest version and read the documentation.

## About the Prototype Kit

The Prototype Kit provides a simple way to make interactive prototypes that look like pages on GOV.UK. These prototypes can be used to show ideas to people you work with, and to do user research.

Read the [project principles](https://prototype-kit.service.gov.uk/docs/principles).

## Make sure prototypes are password-protected

If you publish your prototypes online, they **must** be [protected by a password](https://prototype-kit.service.gov.uk/docs/publishing). This is to prevent members of the public finding prototypes and thinking they are real services.

You must protect user privacy at all times, even when using prototypes. Prototypes made with the kit look like GOV.UK, but do not have the same security provisions. Always make sure you are handling user data appropriately.

## Installation instructions

- [Installation guide for new users (non technical)](https://prototype-kit.service.gov.uk/docs/install/getting-started)
- [Installation guide for developers (technical)](https://prototype-kit.service.gov.uk/docs/install/getting-started-advanced)

## Node version requirements

We always recommend you use the [current long term support (LTS) version of Node.js](https://github.com/nodejs/release#release-schedule).

The Prototype Kit always supports at least the current and previous LTS releases.

## Support

The GOV.UK Prototype Kit is currently maintained by the [GOV.UK Design System team](https://design-system.service.gov.uk/get-in-touch/). There is only [minimal support in place](https://github.com/alphagov/govuk-prototype-kit/issues/2389).

If you’ve got a question, idea or suggestion, share with the community of users on the [#govuk-prototype-kit channel on cross-government Slack](https://ukgovernmentdigital.slack.com/archives/C0647LW4R).

## Contributing

If you’ve got an idea or suggestion, you can:

* [get in touch on the developer Slack channel](https://ukgovernmentdigital.slack.com/app_redirect?channel=prototype-kit-dev)
* [create a GitHub issue](https://github.com/alphagov/govuk-prototype-kit/issues)

The govuk-prototype-kit repository is public and we welcome contributions from anyone.

Contributors to alphagov repositories are expected to follow the [Contributor Covenant Code of Conduct](https://github.com/alphagov/.github/blob/main/CODE_OF_CONDUCT.md#contributor-covenant-code-of-conduct). Contributors working within government are also expected to follow the [Civil Service code](https://www.gov.uk/government/publications/civil-service-code/the-civil-service-code).

We're unable to monitor activity on this repository outside of our office hours (10am to 4pm, UK time). To get a faster response at other times, you can [report abuse or spam to GitHub](https://docs.github.com/en/communities/maintaining-your-safety-on-github/reporting-abuse-or-spam).

### Security

GDS is an advocate of responsible vulnerability disclosure. If you’ve found a vulnerability, we would like to know so we can fix it.

For full details on how to tell us about vulnerabilities, [see our security policy](https://github.com/alphagov/govuk-prototype-kit/security/policy).