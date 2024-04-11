import { Musica } from '@src/models/Musica';

import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';


// **** Functions **** //

/**
 * Add one MUSIC.
 */
async function add(musica: Musica): Promise<void> {
  const db = await orm.openDb();
  musica.id = getRandomInt();
  db.musica.push(musica);
  return orm.saveDb(db);
}

/**
 * Update a musica.
 */
async function update(musica: Musica): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.musica.length; i++) {
    if (db.musica[i].id === musica.id) {
      const dbMusica = db.musica[i];
      db.musica[i] = {
        ...dbMusica,
        name: musica.name,
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one musica.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.musica.length; i++) {
    if (db.musica[i].id === id) {
      db.musica.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}




export default {
  add,
  update,
  delete: delete_,
} as const;
