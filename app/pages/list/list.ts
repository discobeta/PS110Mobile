import {Page, NavController} from 'ionic-angular';
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

  constructor(private nav: NavController, private _classService: EventData
   ) {
    

  }

  toggleSubscription(event) {
    //var isChecked = event.currentTarget.checked;
    alert(event.checked)
  }

  checkSubscription(event) {
    //var isChecked = event.currentTarget.checked;
    alert('chkeck')
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
