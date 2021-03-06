import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Member } from './shared/models/member.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // If false, the application will run on 4200 and call json-server directly
  // If true, the application will utilize node API
  DEBUG: Boolean = true;
  api: string;
  private selectedMember = new BehaviorSubject<Member>(null);
  dataSelectedMember = this.selectedMember.asObservable();

  constructor(private http: HttpClient) {
    if (this.DEBUG) {
      this.api = 'http://localhost:3000';
    } else {
      this.api = 'http://localhost:8000/api';
    }
  }

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  addMember(memberForm: Member): Observable<Member> {
    return this.http
      .post(`${this.api}/members`, memberForm)
      .pipe(catchError(this.handleError));
  }

  deleteMember(id: number): Observable<Member> {
    const url = `${this.api}/members/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  updateMember(member: any) {
    return this.http
      .put(`${this.api}/members/${member.id}`, member)
      .pipe(catchError(this.handleError));
  }

  getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  setSelectedMember(selected: Member): void {
    console.log('selected', selected);
    this.selectedMember.next(selected);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
