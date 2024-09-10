import { Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Injectable()
export class MatPaginatorIntlEsp extends MatPaginatorIntl {
    override changes = new Subject<void>();

    // override itemsPerPageLabel = 'Items por Página:';
    // override nextPageLabel = 'Siguiente página';
    // override previousPageLabel = 'Página anterior';

    override itemsPerPageLabel = 'Registros por página'; 
    override nextPageLabel     = 'Siguiente página';
    override previousPageLabel = 'Página anterior';
    override firstPageLabel = 'Primera página'
    override lastPageLabel = 'Última página'
  
    override getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return '0 de ' + length+" registros";
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return "Del "+(startIndex + 1) + ' al ' + endIndex + ' de ' + length +" registros";
    };
}