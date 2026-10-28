import { Component, input, output } from '@angular/core';
import { GymLeader } from '../../gym-leader.model';

@Component({
  selector: 'app-leader-card',
  standalone: true,
  imports: [],
  templateUrl: './leader-card.html',
  styleUrl: './leader-card.css'
})
export class LeaderCard {
  leader = input.required<GymLeader>();
  edit = output<string>();
  remove = output<string>();

  onEdit(): void {
    const id = this.leader()._id;
    if (id) this.edit.emit(id);
  }

  onRemove(): void {
    const id = this.leader()._id;
    if (id) this.remove.emit(id);
  }
}
