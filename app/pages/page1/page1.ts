import {IonicApp, Page, NavController, Events} from 'ionic-angular';
import {EventData} from '../../providers/event-data/event-data'
import {Dialogs} from 'ionic-native'
import {SignoutPage} from '../../pages/signout/signout';
import {DetailsPage} from '../../pages/details/details';
import {TutorialPage} from '../../pages/tutorial/tutorial';
import {ListPage} from '../../pages/list/list';
import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [[EventData]]
})
export class Page1 {

  pages: Array<{title: string, component: any, icon: any}>
  title: string
  icon: string
  component: any
  today: Date

  constructor(app: IonicApp, private _eventService: EventData, private nav: NavController, private events: Events) {
    this.listenToEvents()
    this.today = new Date()
    this.pages = [
      { title: 'Tutorial', icon: 'help-buoy', component: TutorialPage },
      { title: 'Class Preferences', icon: 'ios-school', component: ListPage },
      { title: 'Sign Out', icon: 'ios-log-out', component: SignoutPage }
    ]; 

  }

  public foundEvents;
  @ViewChild(Content) content: Content;
  gotoToday() {
    this.content.scrollToTop();
  }

  // we listen to refresh calls from other pages, like list page
  listenToEvents() {
    this.events.subscribe('reloadPage1', () => {
      this.refreshEvents()
    });
  }

  viewEventDetails(id,month_name,day_number,day_name,title,description,location,start_date,end_date,days_hours_and_minutes,classroom,start_time,end_time) {
    this.nav.push(DetailsPage, { id: id, month_name: month_name, day_number: day_number, day_name: day_name,title: title, description: description, location: location,start_date: start_date,end_date: end_date,days_hours_and_minutes:days_hours_and_minutes,classroom:classroom,start_time:start_time,end_time:end_time });
  }

  onPageWillEnter() {
  	this.refreshEvents()
  }

  doRefresh(refresher) {
  	this.refreshEvents()
    setTimeout(() => {
      refresher.complete();
    }, 2000);

  }
  minusOneSecond (dateStr) {
    var string = moment.utc(dateStr, 'YYYY-MM-DD HH:mm:ss').subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss")
    return string
  }
  dateMonthName(dateStr) {
    var date = moment.utc(dateStr, 'YYYY-MM-DD HH:mm:ss')
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[date.format('M')];
  }

  dateDayNumber(dateStr) {
    var date = moment.utc(dateStr, 'YYYY-MM-DDTHH:mm:ssZ')
    return date.format('e')
  }

  MultiDayEventDateFormat(date) {
    var date = moment.utc(date, 'YYYY-MM-DDTHH:mm:ssZ')
    return date.format('dddd, MMMM Do')
  }

  dateDayName(dateStr) {
    var date = moment.utc(dateStr, 'YYYY-MM-DD HH:mm:ss')
    var weekday = new Array();
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[date.format('e')];
  }

  refreshEvents() {
    
    // update the navabar with a new date
    this.today = new Date()

  	this._eventService.getEvents().subscribe(
        data => {
        	this.foundEvents =  data.json().results
        },
        err => {
        	Dialogs.alert('Could not get events. Please try again','Event Pull Failed', 'Dismiss');
        	this.nav.push(SignoutPage);
        },
        () => console.log('refresh events finished')
    )

  }
}
