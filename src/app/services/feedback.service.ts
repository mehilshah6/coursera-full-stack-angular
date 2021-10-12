import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient : HttpClient,
    private processHttpMsgService : ProcessHTTPMsgService) { }

  async getFeedback(id : string) : Promise<Feedback> {
    return await this.httpClient.get<Feedback>(baseURL + 'feedback/' + id).toPromise();
  }

  async postFeedback(feedback : Feedback) : Promise<Feedback> {
  
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return await this.httpClient.post<Feedback>(baseURL + 'feedback', feedback, httpOptions).toPromise();
  }
}
