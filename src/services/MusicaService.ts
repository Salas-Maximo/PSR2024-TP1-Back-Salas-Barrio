import MusicaRepo from '@src/repos/MusicaRepo';
import { Musica } from '@src/models/Musica';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


// **** Variables **** //

export const Musica_NOT_FOUND_ERR = 'Musica not found';


// **** Functions **** //


/**
 * Add one Musica.
 */
function addOne(Musica: Musica): Promise<void> {
  return MusicaRepo.add(Musica);
}

/**
 * Update one Musica.
 */
async function updateOne(Musica: Musica): Promise<void> {
  const persists = await MusicaRepo.persists(Musica.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      Musica_NOT_FOUND_ERR,
    );
  }
  // Return Musica
  return MusicaRepo.update(Musica);
}

/**
 * Delete a Musica by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await MusicaRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      Musica_NOT_FOUND_ERR,
    );
  }
  // Delete Musica
  return MusicaRepo.delete(id);
}


// **** Export default **** //

export default {
  addOne,
  updateOne,
  delete: _delete,
} as const;
