import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ComplaintReporterService {

    constructor(private http: Http) { }

    resolve(): Observable<any> {
        return this.http.get('/api/complaints')
                   .map(res => {
                       const response = res.json();
                       console.log(response);
                       return response;
                   });
    }

}
