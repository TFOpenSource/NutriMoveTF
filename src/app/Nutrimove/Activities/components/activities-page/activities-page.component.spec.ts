import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesPageComponent } from './activities-page.component';

describe('ActivitiesPageComponent', () => {
  let component: ActivitiesPageComponent;
  let fixture: ComponentFixture<ActivitiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
