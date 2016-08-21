
# PS110 Mobile: Beta

PS110 is an app for use with the ps110.org Event API. (http://ps110.org/api/events)

### Ionic2

We are using Ionic2 (Beta) with Angular 2 (Typescript). To setup the development environment make sure that you have NPM installed and execute 'npm install -g ionic@beta' to install the latest beta of ionic2.

### Clone and run locally

Once the code was cloned, simply cd into the directory and run npm install, ionic serve

git clone http://github.com/discobeta/PS110Mobile
cd PS110Mobile
npm install
ionic serve (to start a web server for development mode)

### Splash Screen and Application Icon

To change the Application Icon or the Splash Screen image, edit the resources/icon.psd and resources/splash.psd files and issue the command 'ionic resources' to regenereate the icons from the PSD source.

### Authentication and API

This application authenticates and pulls data from the ps110.org Event and Classroom API. The repository for ps110.org can be found <a href="https://github.com/discobeta/ps110">here</a>.

### Tutorial Page

The HTML, SCSS and JavaScript files are all located in app/pages/tutorial/ and the images can be found in the www/img directory.

### Facebook Login

Facebook login is enabled by utilizing <a href="https://developers.facebook.com">Facebook Apps</a>. The configuration for the app to use can be found in config.xml at the 'cordova-plugin-facebook4' section.


