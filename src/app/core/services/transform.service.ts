import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransformService {

  private obj_to_query(obj: any = {}) {
    const parts: any = {};
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        parts[key] = JSON.stringify(obj[key]);
      } else {
        parts[key] = obj[key];
      }
    }
    return parts;
  }

  params(data: Object = {}) {
    const datan = this.obj_to_query(data);
    let params: any = new URLSearchParams(datan).toString();
    if(params)
      params = "?"+params;
    return params;
  }

  toFormData(data: any, columns: string[]): FormData {
    let formData  = new FormData();
    let result = Object.assign({}, data);
    for (let o in result) {
        if(result[o+""] && typeof(result[o+""]) == 'object' && result[o+""].length != undefined && result[o+""].length>0){
          for(var i =  0; i <  result[o+""].length; i++)  {
            for (let c in result[o+""][i]) {
              let valor = result[o+""][i][''+c];
              if(valor != null && valor != ""){
                formData.append(o+"["+i+"]."+c, valor);
              }
            }
          }
        }else{
          if(!columns.includes(o)){
            let valor = result[o];
            if(valor != null && valor != ""){
              formData.append(o, valor);
            }
          }
        }
    }
    return formData;
  }
}
