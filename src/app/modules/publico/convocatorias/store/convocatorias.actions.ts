import { createAction, props } from "@ngrx/store";
import { Carrera } from "../../../../core/models/carrera.model";
import { Convocatoria } from "../../../../core/models/convocatoria.model";
import { Pagination } from "../../../../core/models/pagination.model";

export const loadCarreras = createAction("[Convocatorias] Load Carreras");
export const loadCarrerasSuccess = createAction("[Convocatorias] Load Carreras Success", props<{carreras: Carrera[]}>());

export const loadConvocatorias = createAction(
    "[Convocatorias] Load Convocatorias",
        props<{ paging: any}>()
    );
export const loadConvocatoriasSuccess = createAction("[Convocatorias] Load Convocatorias Success", props<{convocatorias: Convocatoria[], pagination: Pagination}>());

