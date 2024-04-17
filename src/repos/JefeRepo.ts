import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import { IJefe } from '@src/models/Jefe';



async function getOne(apellido: string, nombre: string): Promise<IJefe | null> {
  const db = await orm.openDb();
  for (const jefe of db.jefes) {
    if (jefe.nombre === nombre && jefe.apellido === apellido) {
      return jefe;
    }
  }
  return null;
}

async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const jefe of db.jefes) {
    if (jefe.id === id) {
      return true;
    }
  }
  return false;
}


async function getAll(): Promise<IJefe[]> {
  const db = await orm.openDb();
  return db.jefes;
}

async function add(jefe: IJefe): Promise<void> {
  const db = await orm.openDb();
  jefe.id = getRandomInt();
  db.jefes.push(jefe);
  return orm.saveDb(db);
}


async function update(jefe: IJefe): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.jefes.length; i++) {
  if (db.jefes[i].id === jefe.id) {
      const dbJefe = db.jefes[i];
      db.jefes[i] = {
        ...dbJefe,
        area: jefe.area,
      };
      return orm.saveDb(db);
    }
  }
}

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
