import JefeRepo from '@src/repos/JefeRepo';
import { IJefe } from '@src/models/Jefe';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


export const JEFE_NOT_FOUND_ERR = 'jefe not found';


function getAll(): Promise<IJefe[]> {
  return JefeRepo.getAll();
}


function addOne(user: IJefe): Promise<void> {
  return JefeRepo.add(user);
}


async function updateOne(personal: IJefe): Promise<void> {
  const persists = await JefeRepo.persists(personal.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      JEFE_NOT_FOUND_ERR,
    );
  }
  return JefeRepo.update(personal);
}

async function _delete(id: number): Promise<void> {
  const persists = await JefeRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      JEFE_NOT_FOUND_ERR,
    );
  }
  return JefeRepo.delete(id);
}


export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
