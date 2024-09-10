import { createReducer, on } from "@ngrx/store";
import { ConvocatoriasState } from "./convocatorias.state";
import { loadCarrerasSuccess, loadConvocatoriasSuccess } from "./convocatorias.actions";

const initialState: ConvocatoriasState = {
    carreras: [],
    convocatorias: [],
    pagination: undefined
};

export const convocatoriasReducer = createReducer(
    initialState,
    on(loadCarrerasSuccess, (state, {carreras})=>({...state, carreras})),
    on(loadConvocatoriasSuccess, (state, {convocatorias, pagination})=>({...state, convocatorias, pagination}))
)