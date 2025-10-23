import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LouerComponent } from './louer.component';

describe('LouerComponent', () => {
  let component: LouerComponent;
  let fixture: ComponentFixture<LouerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LouerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LouerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
