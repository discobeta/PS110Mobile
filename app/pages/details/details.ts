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
	public event_date
	public event_length
	public classroom
	public event_time
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
	this.event_date = navParams.get("event_date")
	this.event_length = navParams.get("event_length")
	this.classroom = navParams.get("classroom")
	var datetime = this.event_date
	var time = datetime.split('T')
	this.event_time = time[1].replace('Z','')
  }

  onPageWillEnter() {

  }
}
