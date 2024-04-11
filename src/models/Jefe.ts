import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface Musica {
  id: number;
  name: string;
  created: Date;
}


// **** Functions **** //

/**
 * Create new Music.
 */
function new_(
  name?: string,
  created?: Date,
  id?: number, // id last cause usually set by db
): Musica {
  return {
    id: (id ?? -1),
    name: (name ?? ''),
    created: (created ? new Date(created) : new Date()),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): Musica {
  if (!isUser(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as Musica;
  return new_(p.name, p.created, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isUser(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'name' in arg && typeof arg.name === 'string' &&
    'created' in arg && moment(arg.created as string | Date).isValid()
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isUser,
} as const;
