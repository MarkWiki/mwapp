![MarkWiki App Logo](/resources/MarkWikiAppLightLogo.png)

---

| Stage  | Status                                                                                                          |
| ------ | --------------------------------------------------------------------------------------------------------------- |
| master | [![Build Status](https://travis-ci.org/MarkWiki/mwapp.svg?branch=master)](https://travis-ci.org/MarkWiki/mwapp) |

## Development

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### CI and CD

TravisCI is configured to build every branch.

`master` is automatically deployed to production and hosted on Netlify.

### Development notes

- this is create-react-app app
- using mobx.js for state management (CRA scripts are rewired to support decorators)
- using react-router for routing
- using react-snapshot and react-helmet for static page generation (pre-rendering)
- using Bootstrap 4 as CSS base

## Roadmap (v1)

General

- [ ] GitHub integration
- [ ] Markdown rendering
- [ ] Multiple Wikis
- [ ] Browser
- [ ] Online editing
- [ ] History
- [ ] Attachments
- [ ] Versioning
- [ ] Browser - reordering/moving pages and files

Customization

- [ ] Custom sub-domains
- [ ] Custom domains
- [ ] Custom stylesheets

Templates

- [ ] Templates
- [ ] Custom templates
- [ ] Processes
