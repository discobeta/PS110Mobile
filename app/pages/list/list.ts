import {Page, NavController, Events} from 'ionic-angular';
import {Page1} from '../page1/page1';
import {Dialogs} from 'ionic-native'
import {SignoutPage} from '../../pages/signout/signout';
import {EventData} from '../../providers/event-data/event-data'

@Page({
  templateUrl: 'build/pages/list/list.html',
  providers: [[EventData]]
})
export class ListPage {

  public foundClassrooms;

  constructor(private events: Events, private nav: NavController, private _classService: EventData) {
    //this.K12 = true
    this.foundClassrooms = []
  }

  gotoPage1() {
    this.events.publish('reloadPage1');
    this.nav.pop()
    //this.nav.push(Page1)
    //this.nav.setRoot(Page1)
  }

  saveSubscriptions() {
    console.log('saved')
    for (var i = 0;i < this.foundClassrooms.length;i++) {
      var value = window.localStorage.getItem(this.foundClassrooms[i].name);
      console.log('value: ' + value)
      var action = 'subscribe'
      if (value === 'false') {
        this._classService.unsubscribeClassroom(this.foundClassrooms[i].id).subscribe(
            data => {
              
            },
            err => {
              //Dialogs.alert('Could not update classroom subscription. Please try again','Classroom Subscription Update Failed', 'Dismiss');
              this.nav.push(SignoutPage);
            },
            () => console.log('update classroom subscription finished')
        )
      } else {
        this._classService.subscribeClassroom(this.foundClassrooms[i].id).subscribe(
            data => {
              
            },
            err => {
              //Dialogs.alert('Could not update classroom subscription. Please try again','Classroom Subscription Update Failed', 'Dismiss');
              this.nav.setRoot(SignoutPage);
            },
            () => console.log('update classroom subscription finished')
        )
      }
    }
    // below makes menu button on Page1 work
    //this.nav.push(ListPage)
    //this.nav.push(Page1)
    //this.nav.setRoot(ListPage)
    //this.nav.push(Page1)
    //this.nav.push(Page1)
    //this.nav.push(ListPage)
    this.events.publish('reloadPage1');
    this.nav.pop()
    // we tell page 1 to reload via a listener running on page1
  }
 
  toggleSubscription(event, name) {
    window.localStorage.setItem(name, event.checked)
    return event.checked
  }

  checkSubscription(event) {
    return window.localStorage.getItem(event)
  }

  onPageWillEnter() {
    console.log('en')
    this._classService.getClassrooms().subscribe(
        data => {
          console.log('data from classrooms');
          console.log(data.json().results);
          this.foundClassrooms =  data.json().results
        },
        err => {
          console.log('could not refresh classrooms');
          Dialogs.alert('Could not get classrooms. Please try again','Classroom Pull Failed', 'Dismiss');
          this.nav.push(SignoutPage);
        },
        () => console.log('refresh classrooms finished')
    )
  }

}
