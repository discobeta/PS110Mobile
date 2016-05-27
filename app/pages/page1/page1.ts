import {Page, NavController} from 'ionic-angular';
import {EventData} from '../../providers/event-data/event-data'
import {Dialogs} from 'ionic-native'
import {SignoutPage} from '../../pages/signout/signout';


@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [[EventData]]
})
export class Page1 {
  constructor(private _eventService: EventData, private nav: NavController) {

  }
  public foundEvents;

  onPageWillEnter() {
  	console.log('page enter');
  	this.refreshEvents()
  }

  doRefresh(refresher) {
  	console.log('Refreshing!', refresher);
  	this.refreshEvents()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);

  }

  refreshEvents() {
  	this._eventService.getEvents().subscribe(
        data => {
        	console.log('data from events');
        	console.log(data.json().results);
        	this.foundEvents =  data.json().results
        },
        err => {
        	console.log('could not refresh events');

        	Dialogs.alert('Could not get events. Please try again','Event Pull Failed', 'Dismiss');
        	this.nav.push(SignoutPage);
        },
        () => console.log('refresh events finished')
    )

  }
}
