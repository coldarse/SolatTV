import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MediaLibraryService{

    url: any;
    api: any;
    options: any;

    constructor(private http: HttpClient){
        this.api = '/medialibrary/';
        this.url = 'http://127.0.0.1:8000' + this.api;
        this.options = {
            headers: new HttpHeaders({
                "Accept": "*/*"
            })
        }
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
        } else {
        console.error(
            `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        );
        }
        return throwError(error);
    }

    create(body: any){
        this.options = {
            headers: new HttpHeaders({
                "Accept": "*/*"
            })
        }

        return this.http.post(
            this.url + 'api/',
            body,
            this.options
        ).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    update(body: any, id: number){
        return this.http.put(
            this.url + `api/${id}`,
            body,
            this.options
        ).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }
    

    delete(id: number){
        return this.http.delete(
            this.url + `api/${id}`,
            this.options
        ).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    get(id: number){
        return this.http.get(
            this.url + `api/${id}`,
            this.options
        ).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    getall(){
        return this.http.get(
            this.url + 'api/',
            this.options
        ).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    availablealarms(){
        return this.http.get(
            this.url + 'api/availablealarms/',
            this.options
        ).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    availableimages(){
        return this.http.get(
            this.url + 'api/availableimages/',
            this.options
        ).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }


}