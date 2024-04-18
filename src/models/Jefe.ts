import moment from 'moment';

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate keys.';

export interface IJefe {
  id: number;
  apellido: string;
  nombre: string;
}



function new_(
  id?: number,
  apellido?: string,
  nombre?: string,
): IJefe {
  return {
    apellido: (apellido ?? ''),
    nombre: (nombre ?? ''),
    id: (id ?? -1),
  };
}


function from(param: object): IJefe {
  if (!isJefe(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IJefe;
  return new_(p.id,p.apellido,p.nombre);
}


function isJefe(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' && 
    'id' in arg && typeof arg.id === 'number' &&
    'apellido' in arg && typeof arg.apellido === 'string' &&
    'nombre' in arg && typeof arg.nombre === 'string' 
  );
}

export default {
  new: new_,
  from,
  isJefe,
} as const;
