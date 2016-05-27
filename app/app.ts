import {ViewChild} from '@angular/core';
import {App, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ListPage} from './pages/list/list';
import {Page1} from './pages/page1/page1';
import {TutorialPage} from './pages/tutorial/tutorial';
import {TabsPage} from './pages/tabs/tabs';
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

  pages: Array<{title: string, component: any}>
  constructor(private platform: Platform) {

    this.pages = [
      { title: 'Tutorial', component: TutorialPage },
      { title: 'Settings', component: ListPage },
      { title: 'Sign Out', component: SignoutPage }
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
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) && 
       (window.localStorage.getItem('token') === "undefined" || window.localStorage.getItem('token') === null)) {
      return LoginPage
    } else {
      return TabsPage
    }
  }  

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
 
    this.nav.setRoot(page.component);
  }
}