import AreaRepo from '@src/repos/AreaRepo';
import Area, { IArea } from '@src/models/Area';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


export const AREA_NOT_FOUND_ERR = 'area not found';


function getAll(): Promise<IArea[]> {
  return AreaRepo.getAll();
}


function addOne(user: IArea): Promise<void> {
  return AreaRepo.add(user);
}


async function updateOne(area: IArea): Promise<void> {
  const persists = await AreaRepo.persists(area.nombre);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      AREA_NOT_FOUND_ERR,
    );
  }
  return AreaRepo.update(area);
}


async function _delete(nombre : string): Promise<void> {
  const persists = await AreaRepo.persists(nombre);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      AREA_NOT_FOUND_ERR,
    );
  }
  return AreaRepo.delete(nombre);
}



export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
