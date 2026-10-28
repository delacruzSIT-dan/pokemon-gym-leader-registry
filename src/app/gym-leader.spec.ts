import { TestBed } from '@angular/core/testing';
import { GymLeaderService } from './gym-leader';

describe('GymLeader', () => {
  let service: GymLeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymLeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
