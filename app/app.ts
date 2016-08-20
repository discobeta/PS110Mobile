import {ViewChild} from '@angular/core';
import {App, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ListPage} from './pages/list/list';
import {Page1} from './pages/page1/page1';
import {TutorialPage} from './pages/tutorial/tutorial';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {SignoutPage} from './pages/signout/signout'

@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = this.checkPreviousAuthorization()

  pages: Array<{title: string, component: any, icon: any}>

  title: string
  icon: string
  component: any


  constructor(private platform: Platform) {

    this.pages = [
      { title: 'Tutorial', icon: 'help-buoy', component: TutorialPage },
      { title: 'Class Preferences', icon: 'ios-school', component: ListPage },
      { title: 'Sign Out', icon: 'ios-log-out', component: SignoutPage }
    ]; 

    this.platform = platform
    this.initializeApp()
    this.checkPreviousAuthorization()

  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready')
    });
  }

  checkPreviousAuthorization(): void { 
    console.log('checkPreviousAuthorization')
    console.log(window.localStorage.getItem('username'))
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) || 
       (window.localStorage.getItem('token') === "undefined" || window.localStorage.getItem('token') === null)) {
      return TutorialPage
    } else {
      return Page1 // later change to TutorialPage
    }
  }  

  openPage(page) {

    //this.nav.setRoot(page).then(() =>{
    //  this.nav.popToRoot();
    //});

    this.nav.push(page.component)
    //this.nav.setRoot(page);
      //this.nav.setRoot(page.component)
       //Get the menu navigation component
  //let nav = this.app.getComponent('nav'); 
  //this.menu.close();
        //set the navigation root page as the page choosed
  //nav.setRoot(page);

  }
}