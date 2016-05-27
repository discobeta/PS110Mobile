import {Page, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserData} from '../../providers/user-data/user-data'
import {TabsPage} from '../tabs/tabs';
import {LoginPage} from '../login/login';
import {Dialogs} from 'ionic-native'

@Page({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [UserData]
})

export class SignupPage {
  constructor(private nav: NavController, private _service: UserData, private params: NavParams, private viewCtrl: ViewController) {
    this.nav = nav
  }

  public token;
  public json;
  public username;
  public password;

  formSignup() {
  	this.signup(this.username,this.password)
  }
  
  signup(username: string,password: string){
    console.log('called signup');
  	this._service.signup(this.username,this.password).subscribe(
        data => {
        	console.log('data from signup');
        	if (data.token) {
              console.log('signup in')
              window.localStorage.setItem('username', this.username)
              window.localStorage.setItem('token', data.token)
              this.nav.push(TabsPage)
	        } else {
	        	// failed
	        	if (data.error) {
		        	Dialogs.alert('Could not sign up. ' + data.error + '. Try to Log In','Sign Up Failed', 'Dismiss');
		        } else {
		        	Dialogs.alert('Could not sign up. try again later','Sign Up Failed', 'Dismiss');
		        }
	        }
        },
        err => {

        	Dialogs.alert('Could not sign up. Please try again ('+err+')','Sign Up Failed', 'Dismiss');
        },
        () => console.log('user signup complete')
    )
  }



  facebookSignup() {
    alert('fbsignup')
  }

  loginPage(){
  	this.nav.push(LoginPage);
  }

  onPageWillEnter() {

  }

}
