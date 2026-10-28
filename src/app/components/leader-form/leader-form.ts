import { Component, inject, input, OnInit, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GymLeaderService } from '../../gym-leader';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-leader-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './leader-form.html',
  styleUrl: './leader-form.css'
})
export class LeaderForm implements OnInit {
  id = input<string>();

  private fb = inject(FormBuilder);
  private service = inject(GymLeaderService);
  private router = inject(Router);

  isEditMode = computed(() => !!this.id());
  regions = ['Kanto', 'Johto', 'Hoenn'];

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    region: ['Kanto' as 'Kanto' | 'Johto' | 'Hoenn', Validators.required],
    town: ['', Validators.required],
    badge: ['', Validators.required],
    specialty: ['', Validators.required],
    aceLevel: [1, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^\d+$/)]],
    motto: ['', Validators.maxLength(150)]
  });

  ngOnInit(): void {
    const leaderId = this.id();
    if (leaderId) {
      this.service.getLeader(leaderId).subscribe({
        next: (leader) => this.form.patchValue(leader),
        error: (err) => console.error('Failed to load leader for editing', err)
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const leaderData = this.form.getRawValue();
    const leaderId = this.id();

    if (this.isEditMode() && leaderId) {
      this.service.updateLeader(leaderId, leaderData).subscribe({
        next: () => this.router.navigate(['/leaders']),
        error: (err) => console.error('Failed to update leader', err)
      });
    } else {
      this.service.addLeader(leaderData).subscribe({
        next: () => this.router.navigate(['/leaders']),
        error: (err) => console.error('Failed to add leader', err)
      });
    }
  }
}
