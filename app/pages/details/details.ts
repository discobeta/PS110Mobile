import {Page, NavController, NavParams} from 'ionic-angular';
import {Dialogs} from 'ionic-native'
import {SignoutPage} from '../../pages/signout/signout';


@Page({
  templateUrl: 'build/pages/details/details.html',
})


export class DetailsPage {
	public id
	public title
	public month_name
	public month_number
	public day_name
	public day_number
	public description
	public location
	public start_date
	public end_date
	public event_duration
	public classroom
	public event_time
	public days_hours_and_minutes
	public start_time
	public end_time
	datetime: string

  constructor(public nav: NavController, public navParams: NavParams) {
	this.navParams = navParams
	this.id = navParams.get("id")
	this.title = navParams.get("title")
	this.month_name = navParams.get("month_name")
	this.day_number = navParams.get("day_number")
	this.day_name = navParams.get("day_name")
	this.description = navParams.get("description")
	this.location = navParams.get("location")
	this.start_date = navParams.get("start_date")
	this.end_date = navParams.get("end_date")
	this.days_hours_and_minutes = navParams.get("days_hours_and_minutes")
	this.classroom = navParams.get("classroom")
	this.start_time = navParams.get("start_time")
	this.end_time = navParams.get("end_time")
  }
  stringAsDate(dateStr) {
    return new Date(dateStr);
  }
  onPageWillEnter() {

  }
}
