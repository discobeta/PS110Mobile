import {Page, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserData} from '../../providers/user-data/user-data'
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {Dialogs} from 'ionic-native'

@Page({
  templateUrl: 'build/pages/login/login.html',
  providers: [UserData],
})

export class LoginPage {

  constructor(private nav: NavController, private _service: UserData, private params: NavParams, private viewCtrl: ViewController) {
    this.nav = nav

  }

  public userEmailAddress: string
  public username
  public password

  formLogin() {
    if(this.username !== 'undefined' && this.password !== 'undefined') {
      this._service.login(this.username,this.password).subscribe(
          data => {
            if (data.token) {
                window.localStorage.setItem('username', this.username)
                window.localStorage.setItem('token', data.token)
                this.nav.push(TabsPage)
            }
          },
          err => {
            Dialogs.alert('Could not log in. Please try again','Login Failed', 'Dismiss');
          },
          () => console.log('user login complete')
      )
    }
  }
 
  facebookLogin() {
    var this_ref = this
  	facebookConnectPlugin.login(['email'], function(){
      facebookConnectPlugin.getLoginStatus((response) => {
          if(response.status == "connected") {
              facebookConnectPlugin.api('/' + response.authResponse.userID + '?fields=id,name,gender,email',[], 
              function onSuccess(result) {
                if((result.email === "undefined" || result.email === null) || 
       (result.id === "undefined" || result.id === null) ||
       (response.authResponse.accessToken === "undefined" || response.authResponse.accessToken === null)) {
                  // we post it to api and get  token in return if the information is valid
                  alert('not enough params for fb login');
                } else {
                  console.log('response.authResponse.accessToken' + response.authResponse.accessToken)
                  this_ref._service.facebook_auth(result.email,result.id,response.authResponse.accessToken).subscribe(
                      data => {
                        console.log('data from fb login');
                        if (data.token) {
                            console.log('fb YES YES login in')
                            window.localStorage.setItem('username', result.email)
                            window.localStorage.setItem('token', data.token)
                            //this_ref.nav.pop(TabsPage)
                            //this.nav.pop(TabsPage)
                            //window.location.reload()
                            this_ref.tabsPage()
                        } else {
                          console.log('fb NONO login in no data.token')
                        }
                      },
                      err => {
                        Dialogs.alert('Could not log in. Please try again','Login Failed', 'Dismiss');
                      },
                      () => console.log('user login complete')
                  )
                }

              },
              function onError(error) {
                  Dialogs.alert('Could not log in. Please try again','Login Failed', 'Dismiss');           
              }
              );
          }
          else {
              Dialogs.alert('Not logged in','Login Failed', 'Dismiss');
          }
      })
    }, function(error){
  		Dialogs.alert('Could not log in. Please try again',error, 'Dismiss');
  	})
  }

  signupPage(){
  	this.nav.push(SignupPage);
  }

  tabsPage(){
    console.log('called tabs page')
    this.nav.push(TabsPage);
    window.location.reload(true)
  }
  onPageWillEnter() {

  }

}
