import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { allRounds, oneRound, roundTracking } from "./requests"

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should retrieve rounds', async () => {
    const rounds = await allRounds()
    expect(rounds.success).toBeTruthy();
  });
  it('should retrieve specific round', async () => {
    const rounds = await allRounds()
    if (rounds.success) {
      const test_round = await oneRound(rounds.value[0].id)
      expect(test_round.success).toBeTruthy
    }
  })
  it('should retrieve specific round tracking geodata', async () => {
    const rounds = await allRounds()
    if (rounds.success) {
      const test_round = await roundTracking(rounds.value[0].id)
      expect(test_round.success).toBeTruthy
    }
  })
});
