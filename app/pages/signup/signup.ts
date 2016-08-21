import {Page, NavController, NavParams, ViewController, Events} from 'ionic-angular';
import {UserData} from '../../providers/user-data/user-data'
import {LoginPage} from '../login/login';
import {ListPage} from '../list/list';
import {Dialogs} from 'ionic-native'
import {Page1} from '../page1/page1';
//import {getRootNav} from '../../utils/navUtils';

@Page({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [UserData]
})

export class SignupPage {
  constructor(private events: Events, private nav: NavController, private _service: UserData, private params: NavParams, private viewCtrl: ViewController) {
    this.nav = nav
    this.events = events
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
    if (username && username !== 'undefined' && password && password !== 'undefined') {
    	this._service.signup(this.username,this.password).subscribe(
          data => {
          	console.log('data from signup');
          	if (data.token) {
                console.log('signup in')
                window.localStorage.setItem('username', this.username)
                window.localStorage.setItem('token', data.token)
                // set first subscription to 1
                window.localStorage.setItem('Everyone', true)
                
                //this.nav.push(ListPage)
                //this.nav.push(Page1)
                //this.nav.setRoot(Page1)
                //this.nav.push(Page1)
                //this.nav.push(ListPage)
                //this.nav.push(Page1)
                this.nav.setRoot(Page1)
                //this.nav.popToRoot()
                //this.nav.push(Page1)
                                

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
    } else {
      Dialogs.alert('Must provide an email address and password','Sign Up Failed', 'Dismiss');
    }
  }



  facebookSignup() {
    //alert('fb signup')
    this.events.publish('user:facebookSignup')
    //this.nav.push(LoginPage);

  }

  loginPage(){
  	this.nav.push(LoginPage);
  }

  onPageWillEnter() {

  }

}
