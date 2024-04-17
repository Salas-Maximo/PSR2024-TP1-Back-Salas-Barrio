import PersonalRepo from '@src/repos/PersonalRepo';
import { IPersonal } from '@src/models/Personal';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export const PERSONAL_NOT_FOUND_ERR = 'Personal not found';


function getAll(): Promise<IPersonal[]> {
  return PersonalRepo.getAll();
}

function addOne(user: IPersonal): Promise<void> {
  return PersonalRepo.add(user);
}


async function updateOne(personal: IPersonal): Promise<void> {
  const persists = await PersonalRepo.persists(personal.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PERSONAL_NOT_FOUND_ERR,
    );
  }

  return PersonalRepo.update(personal);
}


async function _delete(id: number): Promise<void> {
  const persists = await PersonalRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PERSONAL_NOT_FOUND_ERR,
    );
  }
  return PersonalRepo.delete(id);
}


export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
