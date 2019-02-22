# application-monitor

This project includes an iOS app, and a webpage, both backed by a Firebase realtime database to display the most recent versions of various applications that I needed to maintain on Windows and MacOS devices. The database is updated via a NodeJS application running on a scheduler hosted on Heroku.

# Design

These tools were designed to provide a solution to a problem I was having at work with maintaining many applications through a device management tool. Each application has a different release cycle so it would require me to check for new versions of every application frequently.

For the mobile application, I chose to make it for iOS in Swift because I own an iPhone and this would allow me to check the versions from anywhere. Swift is an object-oriented language and utilizes the MVC architechtural pattern.

For the webpage, I chose the React library because it is popular, and for its ability to describe complex and dynamic interfaces using small, stateful, composable components without needing to work directly with the DOM. I utilized the bootstrap library to customize the interface elements because it makes it look modern and sleek.

For the database, I chose to store the data in a real-time Firebase database. This allowed me to practice updating the database and seeing the changes occur instantly within the app and webpage.

Because applications release new versions frequently, I created a scheduler on Heroku that runs a NodeJS application to check for new versions. The functions I had to build using NodeJS helped teach me how to retrieve html from a website using the Axios node module and parse html for the needed information using the Cheerio node module.

Firebase has a built in REST API, but as a way of practicing and learning about REST APIs, I created a quick and simple wrapper in ExpressJS that pulled the application list from Firebase and returned a single application through a given ID within the database.

### Version Checkers

If you'd like to deploy the server functions to retrieve data from your own Firebase database, you will need to make sure you update `application-monitor-version-checkers\index.js` with your own Firebase API application connector. For instructions on how to do this, please see the firebase documentation:

> https://firebase.google.com/docs/web/setup

### Database

You can use your google account, or create a free one, to log in to the firebase console:

> https://firebase.google.com/

Using a Realtime Database, the structure of the data should be as follows:

```
{
  "ApplicationList": [
    null,
    {
      "lastMacVersion": "String",
      "lastWindowsVersion": "String",
      "name": "String",
      "newMacVersion": true,
      "newWindowsVersion": false,
      "platform": "Windows",
      "url": "https://www.google.com"
    },
    {
      "lastMacVersion": "String",
      "lastWindowsVersion": "String",
      "name": "String",
      "newMacVersion": false,
      "newWindowsVersion": true,
      "platform": "Mac",
      "url": "https://www.google.com"
    },
    {
      "lastMacVersion": "String",
      "lastWindowsVersion": "String",
      "name": "String",
      "newMacVersion": true,
      "newWindowsVersion": true,
      "platform": "Windows and Mac",
      "url": "https://www.google.com"
    }
  ]
}
```

The platform variable will determine which icon and view controller for the application details to show in the iOS application and only accepts "Windows", "Mac", or "Windows and Mac".

### iOS Application

If you'd like to deploy the server functions to retrieve data from your own Firebase database, you will need to make sure you download the GoogleService-Info.plist file for your database and add it to the root folder of your application. For instructions on how to do this, please see the firebase documentation:

> https://firebase.google.com/docs/ios/setup

The current version does not include notifications. Push notifications can be implemented with your apple developer account.

### REST API

If you'd like to deploy the REST API to get applications from your own Firebase database, you will need to make sure you update `application-monitor-REST-API\index.js` with your own Firebase API application connector. For instructions on how to do this, please see the firebase documentation:

> https://firebase.google.com/docs/web/setup

### Web Application

###### In order to deploy the web client on your own server:

1. Install [nodejs](https://nodejs.org).
2. Clone this repository.
3. run `npm install` in the `application-monitor-web` folder to install the dependencies.
4. Run `npm run build` in the `application-monitor-web` folder to create the deployment artifacts.
5. Once the build process completes successfully, take the contents of the generated `build` folder and upload it to your server.
6. Visit `index.html` in a web browser.

For development purposes, you can run `npm start` in the `application-monitor-web` folder to run a local server and open it a web browser.

###### In order to deploy using Github pages:

1. Fork this repository on Github.
2. Clone your newly forked repository.
3. Update the `homepage` property in `package.json` in the `application-monitor-web` folder with:

> https://\<GITHUB ACCOUNT\>.github.io/\<REPOSITORY NAME\>

For example:

> https://teresajbocchini.github.io/application-monitor

4. In the `application-monitor-web` folder, run `npm install`.
5. In the `application-monitor-web` folder, run `npm run deploy`.
6. Once it completes successfully, visit the website at:

> https://\<GITHUB ACCOUNT\>.github.io/\<REPOSITORY NAME\>
