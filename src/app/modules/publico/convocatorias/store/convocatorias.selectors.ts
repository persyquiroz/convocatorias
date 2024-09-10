import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ConvocatoriasState } from "./convocatorias.state";

const selectConvocatoriasSate 
    = createFeatureSelector<ConvocatoriasState>('convocatorias');

export const selectCarreras = createSelector(
    selectConvocatoriasSate,
    (state)=> state.carreras
);

export const selectConvocatorias = createSelector(
    selectConvocatoriasSate,
    (state)=> state.convocatorias
);

export const selectConvocatoriasPag = createSelector(
    selectConvocatoriasSate,
    (state)=> state.pagination
);