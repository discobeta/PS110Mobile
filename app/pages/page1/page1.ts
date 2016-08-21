import {IonicApp, Page, NavController, Events} from 'ionic-angular';
import {EventData} from '../../providers/event-data/event-data'
import {Dialogs} from 'ionic-native'
import {SignoutPage} from '../../pages/signout/signout';
import {DetailsPage} from '../../pages/details/details';
import {TutorialPage} from '../../pages/tutorial/tutorial';
import {ListPage} from '../../pages/list/list';


@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [[EventData]]
})
export class Page1 {

  pages: Array<{title: string, component: any, icon: any}>
  title: string
  icon: string
  component: any

  constructor(app: IonicApp, private _eventService: EventData, private nav: NavController, private events: Events) {
    this.listenToEvents()

    this.pages = [
      { title: 'Tutorial', icon: 'help-buoy', component: TutorialPage },
      { title: 'Class Preferences', icon: 'ios-school', component: ListPage },
      { title: 'Sign Out', icon: 'ios-log-out', component: SignoutPage }
    ]; 

  }

//    this.platform = platform
//    this.initializeApp()
//    this.checkPreviousAuthorization()

  public foundEvents;

  // we listen to refresh calls from other pages, like list page
  listenToEvents() {
    console.log('listening to events')
    this.events.subscribe('reloadPage1', () => {
      this.refreshEvents()
    });
  }

  viewEventDetails(id,month_name,day_number,day_name,title,description,location,start_date,end_date,event_duration,classroom) {
    this.nav.push(DetailsPage, { id: id, month_name: month_name, day_number: day_number, day_name: day_name,title: title, description: description, location: location,start_date: start_date,end_date: end_date,event_duration:event_duration,classroom:classroom });
  }

  onPageWillEnter() {
  	console.log('page enter');
    //this.nav.setRoot(this)
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
