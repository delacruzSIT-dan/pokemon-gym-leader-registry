import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { GymLeaderService } from '../../gym-leader';
import { LeaderCard } from '../leader-card/leader-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leader-list',
  standalone: true,
  imports: [LeaderCard],
  templateUrl: './leader-list.html',
  styleUrl: './leader-list.css'
})
export class LeaderList implements OnInit {
  service = inject(GymLeaderService);
  private router = inject(Router);

  selectedRegion = signal<'All' | 'Kanto' | 'Johto' | 'Hoenn'>('All');

  filtered = computed(() => {
    const region = this.selectedRegion();
    const leaders = this.service.leaders();
    if (region === 'All') return leaders;
    return leaders.filter(l => l.region === region);
  });

  ngOnInit(): void {
    this.service.fetchLeaders();
  }

  setRegion(region: 'All' | 'Kanto' | 'Johto' | 'Hoenn'): void {
    this.selectedRegion.set(region);
  }

  onEdit(id: string): void {
    this.router.navigate(['/leaders', id, 'edit']);
  }

  onRemove(id: string): void {
    const leaderToRemove = this.service.leaders().find(l => l._id === id);
    const name = leaderToRemove ? leaderToRemove.name : 'this leader';

    if (confirm(`Remove ${name} from the registry?`)) {
      this.service.deleteLeader(id).subscribe({
        next: () => this.service.fetchLeaders(),
        error: (err) => console.error('Failed to delete leader', err)
      });
    }
  }
}
