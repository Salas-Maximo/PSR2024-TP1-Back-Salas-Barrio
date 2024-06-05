import { IJefe } from '@src/models/Jefe';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';


// **** Functions **** //

/**
 * Get one jefe.
 */
async function getOne(name: string): Promise<IJefe | null> {
  const db = await orm.openDb();
  for (const jefe of db.jefes) {
    if (jefe.name === name) {
      return jefe;
    }
  }
  return null;
}

/**
 * See if a jefe with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const jefe of db.jefes) {
    if (jefe.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all jefes.
 */
async function getAll(id: number): Promise<IJefe[]> {
  console.log(id);
  const db = await orm.openDb();
  for (const area of db.areas) {
    if(area.id === id){
      return area.jefes;
    }
  }
  return db.jefes;
}

/**
 * Add one jefe.
 */
async function add(jefe: IJefe, idArea: number): Promise<void> {
  //get 
  console.log(idArea);
  const db = await orm.openDb();
  for (const area of db.areas) {
    if(area.id === idArea){
      area.jefes.push(jefe);
    }
  }
  return orm.saveDb(db);
}

/**
 * Update a jefe.
 */
async function update(jefe: IJefe): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.jefes.length; i++) {
    if (db.jefes[i].id === jefe.id) {
      const dbjefe = db.jefes[i];
      db.jefes[i] = {
        ...dbjefe,
        name: jefe.name,
        personales: jefe.personales,
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one jefe.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.jefes.length; i++) {
    if (db.jefes[i].id === id) {
      db.jefes.splice(i, 1);
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
