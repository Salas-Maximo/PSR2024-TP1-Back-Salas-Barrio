import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import { IPersonal } from '@src/models/Personal';



async function getOne(apellido: string, nombre: string): Promise<IPersonal | null> {
  const db = await orm.openDb();
  for (const personal of db.personal) {
    if (personal.nombre === nombre && personal.apellido === apellido) {
      return personal;
    }
  }
  return null;
}

async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const personal of db.personal) {
    if (personal.id === id) {
      return true;
    }
  }
  return false;
}


async function getAll(): Promise<IPersonal[]> {
  const db = await orm.openDb();
  return db.personal;
}

async function add(personal: IPersonal): Promise<void> {
  const db = await orm.openDb();
  personal.id = getRandomInt();
  db.personal.push(personal);
  return orm.saveDb(db);
}


async function update(personal: IPersonal): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.personal.length; i++) {
    if (db.personal[i].id === personal.id) {
      const dbpersonal = db.personal[i];
      db.personal[i] = {
        ...dbpersonal,
        nombre: personal.nombre,
        apellido: personal.apellido,
      };
      return orm.saveDb(db);
    }
  }
}

async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.personal.length; i++) {
    if (db.personal[i].id === id) {
      db.personal.splice(i, 1);
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
