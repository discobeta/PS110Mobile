import {Page, NavController, MenuController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Page1} from '../page1/page1';

import {SignoutPage} from '../../pages/signout/signout';
import {TutorialPage} from '../../pages/tutorial/tutorial';
import {ListPage} from '../../pages/list/list';
/*
  Generated class for the TutorialPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html',
})
export class TutorialPage {

  public backimg

  pages: Array<{title: string, component: any, icon: any}>
  title: string
  icon: string
  component: any
  
  constructor(public nav: NavController, public menu: MenuController) {
    this.nav = nav;
    this.menu = menu;

    this.backimg = 'img/ps110_sign.png';
    this.pages = [
      { title: 'Tutorial', icon: 'help-buoy', component: TutorialPage },
      { title: 'Class Preferences', icon: 'ios-school', component: ListPage },
      { title: 'Sign Out', icon: 'ios-log-out', component: SignoutPage }
    ]; 
    this.slides = [
      {
        title: "Welcome to P.S. 110: The Florence Nightingale School",
        description: "<b>PS110 Events</b> is the quickest way to learn about school events",
        image: "img/logo-white.png",
      },
      {
        title: "What's Inside?",
        description: "Inside, you will find general school events like Special Holidays, Book Fairs or Pancake Breakfast! Other than general school events, you can subscribe to class specific events to learn about events such as a Class Trip or a Publishing Party.",
        image: "img/event.png",
      },
      {
        title: "How to use?",
        description: "Create your account and choose which classrooms you subscribe to. Each time that you start the app it would automatically check for updates. You can also manually update by pulling down from the top",
        image: "img/logo-white.png",
      }
    ];
  }

  public slides;
  public showSkip;

  startApp() {
  	if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) && 
       (window.localStorage.getItem('token') === "undefined" || window.localStorage.getItem('token') === null)) {
  		this.nav.setRoot(LoginPage);
  	} else {
    	this.nav.setRoot(Page1);
    }
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    // the left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
