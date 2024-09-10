import { Carrera } from "../../../../core/models/carrera.model";
import { Convocatoria } from "../../../../core/models/convocatoria.model";
import { Pagination } from "../../../../core/models/pagination.model";

export interface ConvocatoriasState{
    carreras: Carrera[];
    convocatorias: Convocatoria[];
    pagination?: Pagination
}