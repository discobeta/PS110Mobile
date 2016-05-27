import {Page, NavController, MenuController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';

/*
  Generated class for the TutorialPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html',
})
export class TutorialPage {
  constructor(public nav: NavController, public menu: MenuController) {
    this.nav = nav;
    this.menu = menu;
    this.slides = [
      {
        title: "Welcome to <b>PS110</b>",
        description: "The <b>PS110 Events App</b> is an easy way for our parents to get updates with regards to our school events.",
        image: "img/redhat.png",
      },
      {
        title: "What's included?",
        description: "<b>PS110 Events</b> includes information about school events.",
        image: "img/redhat.png",
      },
      {
        title: "How to use?",
        description: "The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
        image: "img/redhat.png",
      }
    ];
  }

  public slides;
  public showSkip;

  startApp() {
  	if (localStorage.getItem('token')) {
  		this.nav.push(TabsPage);
  	} else {
    	this.nav.push(LoginPage);
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
