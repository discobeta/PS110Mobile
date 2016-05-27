import {Page, NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';

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
    this.nav.push(LoginPage)
  }
}
