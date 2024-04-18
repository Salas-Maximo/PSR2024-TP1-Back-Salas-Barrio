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
  area: IArea;
}




function new_(
  apellido?: string,
  nombre?: string,
  area?: IArea,
  id?: number, 
): IPersonal {
  return {
    id: (id ?? -1),
    apellido: (apellido ?? ''),
    nombre: (nombre ?? ''),
    area: (area ?? Area.new()),
  };
}


function from(param: object): IPersonal {
  if (!isPersonal(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IPersonal;
  return new_(p.apellido,p.nombre, p.area, p.id);
}


function isPersonal(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'apellido' in arg && typeof arg.apellido === 'string' &&
    'nombre' in arg && typeof arg.nombre === 'string' &&
    'area' in arg && Area.isArea(arg.area)
  );
}

export default {
  new: new_,
  from,
  isPersonal,
} as const;
