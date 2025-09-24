import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

export interface Note {
  note_id: number;
  title: string;
  content: string;
  creationdate?: string;
  last_modified?: string;
  is_archived: number;
} 

@Injectable({
  providedIn: 'root'
})
export class NotesService {
 private apiUrl = 'https://oracleapex.com/ords/apextrainingidms/notes/'; // Cambia esto a la URL de tu API
 
  constructor(private http: HttpClient) { }

  getNotes(): Observable<any>{
 return this.http.get(this.apiUrl);
  }  
   getNoteById(note_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${note_id}`);
  }

  createNote(note: Partial<Note>): Observable<any> {
    return this.http.post(this.apiUrl, note);
  }

  updateNote(note_id: number, note: Partial<Note>): Observable<any> {
    return this.http.put(`${this.apiUrl}${note_id}`, note);
  }
  
  deleteNote(note_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${note_id}`);
  }
}