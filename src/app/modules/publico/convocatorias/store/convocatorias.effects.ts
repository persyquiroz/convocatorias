import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CarreraService } from "../../../../core/services/carrera.service";
import { loadCarreras, loadCarrerasSuccess, loadConvocatorias, loadConvocatoriasSuccess } from "./convocatorias.actions";
import { map, mergeMap } from "rxjs";
import { ConvocatoriaService } from "../../../../core/services/convocatoria.service";

@Injectable()
export class ConvoctoriasEffect{

    actions$ = inject(Actions);
    carreraService = inject(CarreraService);
    convocatoriaService = inject(ConvocatoriaService);

    loadCarreras$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loadCarreras),
            mergeMap(()=> 
            this.carreraService
                .search()
                .pipe(
                    map((response) => loadCarrerasSuccess({carreras: response})))
            )
        )
    );

    loadConvocatorias$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loadConvocatorias),
            mergeMap(fil => 
            this.convocatoriaService
                .listadoPag(fil.paging)
                .pipe(
                    map((response) => loadConvocatoriasSuccess({convocatorias: response.data, pagination: response.pagination})))
            )
        )
    );
}
