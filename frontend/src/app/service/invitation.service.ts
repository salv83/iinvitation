import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Invitation } from '../model/invitation';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const url = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  invitation: Invitation [];

  private option: HttpHeaders = new HttpHeaders().set('Content-type','application/json');

  constructor(private http: HttpClient) { }

  
  getAll(): Observable <Invitation []> { 
    const endopoint = 'api/invitations/getall';
    return this.http.get<Invitation []>(url + endopoint)
    .pipe(
      catchError(this.errorhandler)
    );
  }

  postInvitation(senderName, invitedName, message, status): Observable<any>{ 
    const endopoint = 'api/invitations/adds';
    var queryUrl ='?sendername='+ senderName + "&invitedname=" + invitedName +"&message=" + message + "&status=" + status;
    return this.http.post(url + endopoint + queryUrl, null, {headers: this.option });
  }

  putInvitation(id, status): Observable<any>{ 
    var endpoint = 'api/invitations/'+id+'/statuses/'+status;
    return this.http.put(url + endpoint, null, {headers: this.option });
  }

  errorhandler(error: any){ 
    let msg: string;
    if(error instanceof HttpErrorResponse){ 
      if(error.status === 0){ 
        msg = 'Application offline';
      }else{ 
        msg = `There is an error: ${error.error.msg} (server status code ${error.status})`;
      }
      return throwError(msg);
    }
    return throwError(`Si è verificato un errore di tipo: ${error.message}`);
  }

}
