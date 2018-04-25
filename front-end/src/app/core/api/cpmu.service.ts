import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';

export enum GroupBy {
  YEAR = 'year',
  MONTH = 'month'
}

export interface ICpmuParams {
  groupBy?: GroupBy;
}

export interface ICpmuData {
  Quarter?: string;
  Month?: string;
  Complaints?: string;
  UnitsSold?: string;
}

@Injectable()
export class CpmuService {

  constructor(private http: Http) { }

  public getCpmuData(cpmuParams: ICpmuParams = {}): Observable<ICpmuData> {
    return this.http.get('/data/cpmu', {
      cache: false,
      params: cpmuParams
    })
      .pipe(
        map((res: Response) => res.json()),
        catchError(() => of('Fetching complaints has failed'))
      );
  }

}
