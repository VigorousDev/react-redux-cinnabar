[![build status](https://git.dataculture.io/dataculture/cinnabar/badges/master/build.svg)](https://git.dataculture.io/dataculture/cinnabar/commits/master)
# Supply.ai Dashboard

## To Install
- clone the repo
- in termtinal: npm install
- in terminal: npm run dev
- go to localhost 4000 in browser

## To Build and run in production
 - npm run build ( + env variables)
 - npm run start

## login
username: user@user.com  
password: userpassword

## Major libraries used
- react
- redux
- material-ui
- D3 / NVD3
- see package.json for all dependencies

### API calls
#### API documentation
http://40.84.231.223/#email-service

API host, client ID, and client Secret are all configured as environmental variables at build time. If any of these values is undefined, it will default to working defaults.  

Requests are grouped by page (return_metrics, prev_alerts, etc). Each request is wrapped in a function that accepts an array of filters and returns:
- endpoint url
- array of filters
- HTTP  method

Requests are passed into the getData function or the getBatchData function (util/api/index.js). These two functions do mostly the same thing, but getData sends one request and getBatchData takes multiple requests and inserts them into the body of a single request (we batch because some components want to get data from many endpoints but browsers have a limit on number of open connections).  

Requests accept an array of filters. A filter can be a string or an object. If the filter is a string, the api utility will check the application state for the filter value that corresponds with the given string (filter name) and build the request using the found value. If the filter is an object, the api utility will use the filter name and value provided in the object. This allows the app to send every combination of requests/filters from any component without writing a ton of repetitive code.

All API calls are triggered via middleware by dispatched action creators. Successful calls trigger the dispatch of action creators that carry response data to reducers, which create new app state with the new data. This is a pretty common redux pattern.

Each page of the app has a prebuilt batch that fetches all of the data needed to load that page.

### Routing
Cinnabar is a single page app. Navigation is provided by React-router, which is configured to use browser-history. The routes and routing-related function are all located in routes.jsx.

The splash page is the only route that can be accessed without being logged in. If a user is logged in and tries to access the splash page, they will be redirected to /returnmetrics.

### Auth
Cinnabar uses OAuth2.0 Resource Owner Password Credentials Grant.  
https://tools.ietf.org/html/rfc6749#section-4.3

Access Tokens are good for 10 hours. If the app makes a request with an expired access token, the response triggers a log-out of the user and a redirect to the dashboard. This logout action is dispatched by middleware/data_middleware.js.

Auth details are stored in the currentUser portion of the redux store.

### Component hierarchy
The root component is the router. The base component is components/app.jsx. All routes except the splash page render a toolbar (components/common/header) and drawer(components/common/sidebar).

### Styles
Most styling is done inline with the help of Radium. Radium grid is used for...well a grid.
Some libraries (fixed-data-table, reactabular, NVD3) don't work particularly well with inline styling, so there are corresponding SASS files.  

util/colors contains an object with all the colors used in the app. app/util/material_ui_theme contains the styling theme that's applied to all material-UI components. /util/bar_colors contains an array of the colors used for bar charts.