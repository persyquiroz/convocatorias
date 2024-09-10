import { Routes } from '@angular/router';
// import { PublicoLayoutComponent } from './shared/layouts/publico/publico-layout.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
    },
    // {
    //     path: 'publico',
    //     pathMatch: 'full',
    //     loadComponent: () =>
    //       import('./modules/publico/convocatorias/convocatorias.component').then((m) => m.ConvocatoriasComponent),
    // },
    {
        path: '',
        pathMatch: 'prefix',
        loadComponent: () =>
          import('./shared/layouts/publico/publico-layout.component').then((m) => m.PublicoLayoutComponent),
          children: [
            // {
            //   path: '',
            //   pathMatch: 'full',
            //   redirectTo: 'convocatorias',
            // },
            {
              path: '',
              pathMatch: 'full',
              loadComponent: () =>
                import('./modules/publico/convocatorias/convocatorias.component').then((m) => m.ConvocatoriasComponent),
            },
            {
              path: 'detalle/:id',
              loadComponent: () =>
                import('./modules/publico/detalle/detalle.component').then((m) => m.DetalleComponent),
            },
        ]
    },
    {
        path: 'admin',
        pathMatch: 'prefix',
        loadComponent: () =>
          import('./shared/layouts/admin/admin-layout.component').then((m) => m.AdminLayoutComponent),
          children: [
            {
              path: '',
              pathMatch: 'full',
              redirectTo: 'convocatorias',
            },
            {
              path: 'entidades',
              pathMatch: 'full',
              loadComponent: () =>
                import('./modules/admin/entidades/entidades.component').then((m) => m.EntidadesComponent),
            },
            {
                path: 'lugares',
                pathMatch: 'full',
                loadComponent: () =>
                  import('./modules/admin/lugares/lugares.component').then((m) => m.LugaresComponent),
            },
            {
                path: 'carreras',
                pathMatch: 'full',
                loadComponent: () =>
                  import('./modules/admin/carreras/carreras.component').then((m) => m.CarrerasComponent),
            },
            {
                path: 'convocatorias',
                pathMatch: 'full',
                loadComponent: () =>
                  import('./modules/admin/convocatorias/convocatorias.component').then((m) => m.ConvocatoriasComponent),
            },
        ]
    },
    { 
        path: '**',
        loadComponent: () =>
                import('./shared/pages/no-encontrado/no-encontrado.component').then((m) => m.NoEncontradoComponent),
    },
    // { 
    //     path: 'publico2', 
    //     component: PublicoLayoutComponent,
    //     data: { title: 'Principal' },
    //     loadChildren: () => import('./modules/publico/publico.module').then(m => m.PublicoModule) 
    // },
];
