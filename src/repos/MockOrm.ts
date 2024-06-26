import jsonfile from 'jsonfile';

import { IUser } from 'src/models/User';
import { IArea } from 'src/models/Area';
import { IJefe } from 'src/models/Jefe';
import { IPersonal } from 'src/models/Personal';

// **** Variables **** //

const DB_FILE_NAME = 'database.json';

// **** Types **** //

interface IDb {
  users: IUser[];
  areas: IArea[];
  jefes: IJefe[];
  personales: IPersonal[];
}

// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<IDb> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<IDb>;
}

/**
 * Update the file.
 */
function saveDb(db: IDb): Promise<void> {
  return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}

// **** Export default **** //

export default {
  openDb,
  saveDb,
} as const;
