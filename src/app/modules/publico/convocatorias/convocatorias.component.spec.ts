import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriasComponent } from './convocatorias.component';
import { provideStore } from '@ngrx/store';
import { convocatoriasReducer } from './store/convocatorias.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('ConvocatoriasComponent', () => {
  let component: ConvocatoriasComponent;
  let fixture: ComponentFixture<ConvocatoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConvocatoriasComponent,
        BrowserAnimationsModule
      ],
      providers:[
        provideAnimationsAsync,
        provideStore({convocatorias: convocatoriasReducer})
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ConvocatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente: ConvocatoriasComponent', () => {
    expect(component).toBeTruthy();
  });

  
  it(`Debería el key de filtro de búsqueda en localStorage: filtro-convos`, () => {
    const fixture = TestBed.createComponent(ConvocatoriasComponent);
    const app = fixture.componentInstance;
    expect(app.key_local).toEqual('filtro-convos');
  });

  it('Debería ser el título: Convocatorias de trabajo', () => {
    const fixture = TestBed.createComponent(ConvocatoriasComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('#titulo');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain('Convocatorias de trabajo');
  });
  
});
