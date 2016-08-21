import {Page, NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {getRootNav} from '../../utils/navUtils';

@Page({
  templateUrl: 'build/pages/signout/signout.html',
})

export class SignoutPage {

  constructor(public nav: NavController) {
    this.nav = nav
  }

  onPageWillEnter() {
    console.log('userLogout')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('token')
    //this.nav.setRoot(LoginPage)
    //let rootNav = getRootNav(this.navCtrl);
    //rootNav.setRoot(LoginPage);
    //rootNav.popToRoot();
    //let rootNav = getRootNav(this.navCtrl);
    //rootNav.setRoot(LoginPage);
    //rootNav.popToRoot();
    this.nav.setRoot(LoginPage).then(() =>{
      this.nav.popToRoot();
    });

  }
}
