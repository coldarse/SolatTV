import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http'; 
import { throwError, of as _observableOf, throwError as _observableThrow } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SolatService {

  constructor(
    private http: HttpClient,
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } 
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      error);
  }
}
