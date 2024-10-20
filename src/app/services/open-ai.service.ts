import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_KEY = environment['API_KEY'];

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  private apiUrl = 'https://api.openai.com/v1/threads'; // The OpenAI API URL


  constructor(private http: HttpClient) {}

  createThread(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1',
      'Authorization': `Bearer ${API_KEY}` // Replace with your API key
    });

    const body = {
      messages: [
        {
          role: "user",
          content: prompt,
          file_ids: ["file-Wpp2gopngGkegmTH6L3akZqq"]
        }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  createThreadMessage(threadId: string, prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1',
      'Authorization': `Bearer ${API_KEY}` // Replace with your API key
    });

    const body = {
      role: "user",
      content: prompt,
    };

    return this.http.post(`${this.apiUrl}/${threadId}/messages`, body, { headers });
  }

  // Run the thread
  runThread(threadId: string, assistantId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1',
      'Authorization': `Bearer ${API_KEY}` // Replace with your API key
    });

    return this.http.post(`${this.apiUrl}/${threadId}/runs`, {
      assistant_id: assistantId
    }, { headers });
  }

  // List thread messages
  listThreadMessages(threadId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1',
      'Authorization': `Bearer ${API_KEY}` // Replace with your API key
    });

    return this.http.get(`${this.apiUrl}/${threadId}/messages`, { headers });
  }
}
