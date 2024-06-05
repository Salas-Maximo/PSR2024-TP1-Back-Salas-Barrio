import AreaRepo from '@src/repos/AreaRepo';
import { IArea } from 'src/models/Area';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Variables **** //

export const AREA_NOT_FOUND_ERR = 'Area not found';

// **** Functions **** //

/**
 * Get all areas.
 */
function getAll(): Promise<IArea[]> {
  return AreaRepo.getAll();
}

/**
 * Add one area.
 */
function addOne(area: IArea): Promise<void> {
  return AreaRepo.add(area);
}

/**
 * Update one area.
 */
async function updateOne(area: IArea): Promise<void> {
  const persists = await AreaRepo.persists(area.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      AREA_NOT_FOUND_ERR,
    );
  }
  // Return area
  return AreaRepo.update(area);
}

/**
 * Delete an area by its id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await AreaRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      AREA_NOT_FOUND_ERR,
    );
  }
  // Delete area
  return AreaRepo.delete(id);
}

// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
