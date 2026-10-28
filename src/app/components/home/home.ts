import { Component, inject, OnInit } from '@angular/core';
import { GymLeaderService } from '../../gym-leader';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  service = inject(GymLeaderService);

  ngOnInit(): void {
    this.service.fetchLeaders();
  }
}
