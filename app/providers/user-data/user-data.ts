import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UserData {
  data: any = null;

  constructor(public http: Http) {}

  public Headers;
  public RequestOptions;

  facebook_auth(email,id,token) {
      let body = 'email='+email+'&id='+id+'&token='+token;
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('http://ps110.org/api/facebook_auth/?format=json', body, options)
          .map(res => res.json())
          .catch(this.handleLoginError);
  }

  login(username,password) {
      let body = 'username='+username+'&password='+password;
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('http://ps110.org/api-token-auth/?format=json', body, options)
          .map(res => res.json())
          .catch(this.handleLoginError);
  }

  signup(username,password) {
      let body = 'email='+username+'&password='+password;
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('http://ps110.org/api/register/?format=json', body, options)
          .map(res => res.json())
          .catch(this.handleLoginError);
  }

  handleLoginError(error) {
      return Observable.throw(error.json().error || 'Server error');
  }
}

