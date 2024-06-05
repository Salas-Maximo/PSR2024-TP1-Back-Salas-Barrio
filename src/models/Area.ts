import moment from 'moment';
import { IJefe } from '@src/models/Jefe'

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IArea {
  id: number;
  name: string;
  jefes: Array<IJefe>;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  name?: string,
  jefes?: Array<IJefe>,
  id?: number, // id last cause usually set by db
): IArea {
  return {
    id: (id ?? -1),
    name: (name ?? ''),
    jefes: []
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IArea {
  if (!isArea(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IArea;
  return new_(p.name, p.jefes, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isArea(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'jefes' in arg && typeof arg.jefes === 'object' && 
    'name' in arg && typeof arg.name === 'string'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isArea,
} as const;
