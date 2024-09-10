import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { convocatoriasReducer } from './modules/publico/convocatorias/store/convocatorias.reducer';
import { ConvoctoriasEffect } from './modules/publico/convocatorias/store/convocatorias.effects';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // provideRouter(routes, withPreloading(PreloadAllModules)), // Carga todo luego de la primera
    provideClientHydration(),
    provideAnimationsAsync(), // Fue agregado auto al instalar material
    provideHttpClient(withFetch()),
    provideStore({convocatorias: convocatoriasReducer}),
    provideEffects([ConvoctoriasEffect]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
