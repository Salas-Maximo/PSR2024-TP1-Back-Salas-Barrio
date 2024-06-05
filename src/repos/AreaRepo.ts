import { IArea } from 'src/models/Area';
import { getRandomInt } from 'src/util/misc';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one area.
 */
async function getOne(name: string): Promise<IArea | null> {
  const db = await orm.openDb();
  for (const area of db.areas) {
    if (area.name === name) {
      return area;
    }
  }
  return null;
}

/**
 * See if an area with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const area of db.areas) {
    if (area.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all areas.
 */
async function getAll(): Promise<IArea[]> {
  const db = await orm.openDb();
  return db.areas;
}

/**
 * Add one area.
 */
async function add(area: IArea): Promise<void> {
  const db = await orm.openDb();
  area.id = getRandomInt();
  db.areas.push(area);
  return orm.saveDb(db);
}

/**
 * Update an area.
 */
async function update(area: IArea): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.areas.length; i++) {
    if (db.areas[i].id === area.id) {
      const dbarea = db.areas[i];
      db.areas[i] = {
        ...dbarea,
        name: area.name,
        jefes: area.jefes,
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one area.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.areas.length; i++) {
    if (db.areas[i].id === id) {
      db.areas.splice(i, 1);
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
