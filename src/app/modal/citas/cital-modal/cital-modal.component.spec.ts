import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitalModalComponent } from './cital-modal.component';

describe('CitalModalComponent', () => {
  let component: CitalModalComponent;
  let fixture: ComponentFixture<CitalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitalModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
