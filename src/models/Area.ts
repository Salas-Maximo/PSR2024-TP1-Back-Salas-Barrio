import moment from 'moment';
import Personal, { IPersonal } from './Personal';
import { IJefe } from './Jefe';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate keys.';


// **** Types **** //

export interface IArea {
  nombre: string;
  jefe:  IJefe;
  personal: IPersonal[];
}


function new_(
  nombre?: string,
  jefe?: IJefe,
  personal?: IPersonal[],
): IArea {
  return {
    nombre: (nombre ?? ''),
    jefe: (jefe ?? new.jefe()),
    personal: (personal ?? []),
  };
}



function from(param: object): IArea {
  if (!isArea(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IArea;
  return new_(p.nombre, p.jefe, p.personal);
}



function isArea(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'nombre' in arg && typeof arg.nombre === 'string' &&
    'jefe' in arg && Jefe.isJefe(arg.jefe) &&
    'personal' in arg && Array.isArray(arg.personal)
    )  
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isArea,
} as const;
