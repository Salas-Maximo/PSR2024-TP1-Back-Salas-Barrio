import JefeRepo from '@src/repos/JefeRepo';
import { IJefe } from '@src/models/Jefe';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Variables **** //

export const JEFE_NOT_FOUND_ERR = 'Jefe not found';

// **** Functions **** //

/**
 * Get all jefes.
 */
function getAll(id: number): Promise<IJefe[]> {
  return JefeRepo.getAll(id);
}

/**
 * Add one jefe.
 */
function addOne(jefe: IJefe, idArea: number): Promise<void> {
  return JefeRepo.add(jefe, idArea);
}

/**
 * Update one jefe.
 */
async function updateOne(jefe: IJefe): Promise<void> {
  const persists = await JefeRepo.persists(jefe.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      JEFE_NOT_FOUND_ERR,
    );
  }
  // Return jefe
  return JefeRepo.update(jefe);
}

/**
 * Delete a jefe by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await JefeRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      JEFE_NOT_FOUND_ERR,
    );
  }
  // Delete jefe
  return JefeRepo.delete(id);
}

// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
