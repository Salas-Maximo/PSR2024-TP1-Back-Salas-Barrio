import { IPersonal } from 'src/models/Personal';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one personal.
 */
async function getOne(name: string): Promise<IPersonal | null> {
  const db = await orm.openDb();
  for (const personal of db.personales) {
    if (personal.name === name) {
      return personal;
    }
  }
  return null;
}

/**
 * See if a personal with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const personal of db.personales) {
    if (personal.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all personales.
 */
async function getAll(): Promise<IPersonal[]> {
  const db = await orm.openDb();
  return db.personales;
}

/**
 * Add one personal.
 */
async function add(personal: IPersonal, idArea: number, idJefe: number): Promise<void> {
  const db = await orm.openDb();
  for (const area of db.areas) {
    if (area.id === idArea) {
      for (const jefe of area.jefes) {
        if (jefe.id === idJefe) {
          jefe.personales.push(personal);
        }
      }
    }
  }
  db.personales.push(personal);
  return orm.saveDb(db);
}

/**
 * Update a personal.
 */
async function update(personal: IPersonal): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.personales.length; i++) {
    if (db.personales[i].id === personal.id) {
      const dbpersonal = db.personales[i];
      db.personales[i] = {
        ...dbpersonal,
        name: personal.name
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one personal.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.personales.length; i++) {
    if (db.personales[i].id === id) {
      db.personales.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
