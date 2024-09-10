import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCompletaComponent } from './info-completa.component';

describe('InfoCompletaComponent', () => {
  let component: InfoCompletaComponent;
  let fixture: ComponentFixture<InfoCompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCompletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
