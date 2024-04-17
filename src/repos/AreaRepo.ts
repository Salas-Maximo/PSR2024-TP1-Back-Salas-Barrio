import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import { IArea } from '@src/models/Area';



async function getOne(nombre: string): Promise<IArea | null> {
  const db = await orm.openDb();
  for (const Area of db.areas) {
    if (Area.nombre === nombre) {
      return Area;
    }
  }
  return null;
}

async function persists(nombre: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const area of db.areas) {
    if (area.nombre === nombre) {
      return true;
    }
  }
  return false;
}


async function getAll(): Promise<IArea[]> {
  const db = await orm.openDb();
  return db.areas;
}

async function add(area: IArea): Promise<void> {
  const db = await orm.openDb();
  //area.id = getRandomInt();
  db.areas.push(area);
  return orm.saveDb(db);
}


async function update(area: IArea): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.areas.length; i++) {
  if (db.areas[i].nombre === area.nombre) {
      const dbArea = db.areas[i];
      db.areas[i] = {
        ...dbArea,
        jefe: area.jefe,
      };
      return orm.saveDb(db);
    }
  }
}

async function delete_(nombre : string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.areas.length; i++) {
    if (db.areas[i].nombre === nombre) {
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
