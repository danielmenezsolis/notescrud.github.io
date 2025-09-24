import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Note {
  note_id: number;
  title: string;
  content: string;
  creation_date: string;
  last_modified: string;
  is_archived: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  apiUrl = 'https://oracleapex.com/ords/apextrainingidms/notes/';
  notes$: Observable<Note[]> | null = null;

  newTitle = '';
  newContent = '';

  editingNote: Note | null = null;

  constructor(private http: HttpClient) {
    this.notes$ = this.http.get<{ items: Note[] }>(this.apiUrl).pipe(
      map(res => res.items)
    );
  }
 loadNotes() {
    this.notes$ = this.http.get<{ items: Note[] }>(this.apiUrl).pipe(
      map(res => res.items)
    );
  }

addNote() {
  const now = new Date().toISOString();
  const newNote = {
    title: this.newTitle,
    content: this.newContent,
    creation_date: now,
    last_modified: now,
    is_archived: 0
  };


  this.http.post(this.apiUrl, newNote).subscribe(() => {
    this.newTitle = '';
    this.newContent = '';
    this.loadNotes();
  });
}
  editNote(note: Note) {
    // Clonar la nota para edición
    this.editingNote = { ...note };
  }

  saveNote() {
    if (!this.editingNote) return;

    // PUT request para actualizar la nota
    this.http.put(`${this.apiUrl}${this.editingNote.note_id}`, this.editingNote)
      .subscribe(() => {
        this.editingNote = null;
        this.loadNotes(); // recarga notas
      });
  }

  startEdit(note: Note) {
    this.editingNote = { ...note };
  }

  cancelEdit() {
    this.editingNote = null;
  }
 saveEdit() {
    if (!this.editingNote) return;
    this.http.put(`${this.apiUrl}${this.editingNote.note_id}`, this.editingNote).subscribe(() => {
      this.editingNote = null;
      this.loadNotes();
    });
  }

  deleteNote(note: Note) {
    this.http.delete(`${this.apiUrl}${note.note_id}`).subscribe(() => {
      this.loadNotes();
    });
  }

}