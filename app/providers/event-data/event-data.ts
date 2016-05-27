import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {NavController} from 'ionic-angular';
import {SignoutPage} from '../../pages/signout/signout';

@Injectable()

export class EventData {

  data: any = null;

  constructor(public http: Http, private nav: NavController) {}

  public Headers;
  public RequestOptions;

  getClassrooms() {
      console.log('called getClasses');
      
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + localStorage.getItem('token') });
      let options = new RequestOptions({ headers: headers });

      return this.http.get('http://192.168.1.18:8000/api/classrooms/', options)
          .map(res => res)
          .catch(this.handleEventFetchError);
  }

  getEvents() {
      console.log('called getEvents');
      
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + localStorage.getItem('token') });
      let options = new RequestOptions({ headers: headers });

      //let events = this.http.get('http://192.168.1.18:8000/api/events/', options);

      return this.http.get('http://192.168.1.18:8000/api/events/', options)
          .map(res => res)
          .catch(this.handleEventFetchError);
  }

  handleEventFetchError(error) {
    alert('err fetching event data');
    console.log('caught error');
      console.error(error);
      this.nav.push(SignoutPage);
      return Observable.throw(error.json().error || 'Event Fetch Error');
  }
}

