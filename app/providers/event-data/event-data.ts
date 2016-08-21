import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {NavController} from 'ionic-angular';
import {SignoutPage} from '../../pages/signout/signout';
import {Dialogs} from 'ionic-native'

@Injectable()

export class EventData {

  data: any = null;

  constructor(public http: Http, private nav: NavController) {}

  public Headers;
  public RequestOptions;

  subscribeClassroom(classroom_id){
      console.log('called subscribeClassroom'+classroom_id);
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + window.localStorage.getItem('token') });
      let options = new RequestOptions({ headers: headers });
      return this.http.get('http://ps110.org/api/classrooms/'+classroom_id+'/subscribe/?format=json', options);
  }

  unsubscribeClassroom(classroom_id){
      console.log('called unsubscribeClassroom'+classroom_id);
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + window.localStorage.getItem('token') });
      let options = new RequestOptions({ headers: headers });
      return this.http.get('http://ps110.org/api/classrooms/'+classroom_id+'/unsubscribe/?format=json', options);
  } 

  getClassrooms() {
      console.log('called getClasses');
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + window.localStorage.getItem('token') });
      let options = new RequestOptions({ headers: headers });
      return this.http.get('http://ps110.org/api/classrooms/?format=json', options)
          .map(res => res)
          .catch(this.handleEventFetchError);
  }

  getEventDetails(id) {
      console.log('called getEventDetails using token ' + window.localStorage.getItem('token'));
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + window.localStorage.getItem('token') });
      let options = new RequestOptions({ headers: headers });
      return this.http.get('http://ps110.org/api/events/'+id+'/?format=json', options)
          .map(res => res)
          .catch(this.handleEventFetchError);
  }

  getEvents() {
      console.log('called getEvents using token ' + window.localStorage.getItem('token'));
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + window.localStorage.getItem('token') });
      let options = new RequestOptions({ headers: headers });
      return this.http.get('http://ps110.org/api/events/?format=json', options)
          .map(res => res)
          .catch(this.handleEventFetchError);
  }

  handleEventFetchError(error) {
      Dialogs.alert('Could not update information. Please try again','Update Failed', 'Dismiss');
      this.nav.push(SignoutPage);
      return Observable.throw(error.json().error || 'Event Fetch Error');
  }
}

