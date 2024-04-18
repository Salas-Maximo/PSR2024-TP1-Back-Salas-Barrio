import moment from 'moment';
import Area from './Area';
import { IArea } from './Area'; 


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate keys.';


// **** Types **** //

export interface IPersonal {
  id: number;
  apellido: string;
  nombre: string;
}




function new_(
  id?: number,
  apellido?: string,
  nombre?: string,
): IPersonal {
  return {
    apellido: (apellido ?? ''),
    nombre: (nombre ?? ''),
    id: (id ?? -1),
  };
}


function from(param: object): IPersonal {
  if (!isPersonal(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IPersonal;
  return new_(p.id,p.apellido,p.nombre);
}


function isPersonal(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'apellido' in arg && typeof arg.apellido === 'string' &&
    'nombre' in arg && typeof arg.nombre === 'string' &&
    'area' in arg && typeof arg.area === 'string'
  );
}

export default {
  new: new_,
  from,
  isPersonal,
} as const;
