import PersonalRepo from '@src/repos/PersonalRepo';
import { IPersonal } from 'src/models/Personal';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Variables **** //

export const PERSONAL_NOT_FOUND_ERR = 'Personal not found';

// **** Functions **** //

/**
 * Get all personales.
 */
function getAll(): Promise<IPersonal[]> {
  return PersonalRepo.getAll();
}

/**
 * Add one personal.
 */
function addOne(personal: IPersonal, idA: number, idB: number): Promise<void> {
  return PersonalRepo.add(personal, idA, idB);
}

/**
 * Update one personal.
 */
async function updateOne(personal: IPersonal): Promise<void> {
  const persists = await PersonalRepo.persists(personal.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PERSONAL_NOT_FOUND_ERR,
    );
  }
  // Return personal
  return PersonalRepo.update(personal);
}

/**
 * Delete a personal by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await PersonalRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PERSONAL_NOT_FOUND_ERR,
    );
  }
  // Delete personal
  return PersonalRepo.delete(id);
}

// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
