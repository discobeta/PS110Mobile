import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {
  data: any = null;

  constructor(public http: Http) {}

  public Headers;
  public RequestOptions;

  facebook_auth(email,id,token) {
      let body = 'email='+email+'&id='+id+'&token='+token;
      console.log(body)
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('http://192.168.1.18:8000/api/facebook_auth/', body, options)
          .map(res => res.json())
          .catch(this.handleLoginError);
  }

  login(username,password) {
      let body = 'username='+username+'&password='+password;

      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('http://192.168.1.18:8000/api-token-auth/', body, options)
          .map(res => res.json())
          .catch(this.handleLoginError);
  }

  signup(username,password) {
      let body = 'email='+username+'&password='+password;
      
      console.log('signup body')
      console.log(body)
      
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('http://192.168.1.18:8000/api/register/', body, options)
          .map(res => res.json())
          .catch(this.handleLoginError);
  }

  handleLoginError(error) {
    console.log('caught error');
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
}

