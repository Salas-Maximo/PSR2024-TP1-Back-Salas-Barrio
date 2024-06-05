import moment from 'moment';
import { IPersonal } from '@src/models/Personal'

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IJefe {
  id: number;
  name: string;
  personales: Array<IPersonal>;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  name?: string,
  personales?: Array<IPersonal>,
  id?: number, // id last cause usually set by db
): IJefe {
  return {
    id: (id ?? -1),
    name: (name ?? ''),
    personales: []
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IJefe {
  if (!isJefe(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IJefe;
  return new_(p.name, p.personales, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isJefe(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'personales' in arg && typeof arg.personales === 'object' && 
    'nombre' in arg && typeof arg.nombre === 'string'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isJefe,
} as const;
