import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GymLeader } from './gym-leader.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymLeaderService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/leaders';

  leaders = signal<GymLeader[]>([]);

  kantoCount = computed(() => this.leaders().filter(l => l.region === 'Kanto').length);
  johtoCount = computed(() => this.leaders().filter(l => l.region === 'Johto').length);
  hoennCount = computed(() => this.leaders().filter(l => l.region === 'Hoenn').length);

  constructor() {
    this.fetchLeaders();
  }

  fetchLeaders(): void {
    this.http.get<GymLeader[]>(this.apiUrl).subscribe({
      next: (data) => this.leaders.set(data),
      error: (err) => console.error('Failed to fetch leaders', err)
    });
  }

  getLeader(id: string): Observable<GymLeader> {
    return this.http.get<GymLeader>(`${this.apiUrl}/${id}`);
  }

  addLeader(leader: GymLeader): Observable<GymLeader> {
    return this.http.post<GymLeader>(this.apiUrl, leader);
  }

  updateLeader(id: string, leader: GymLeader): Observable<GymLeader> {
    return this.http.put<GymLeader>(`${this.apiUrl}/${id}`, leader);
  }

  deleteLeader(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
