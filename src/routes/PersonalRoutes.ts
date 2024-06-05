import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import PersonalService from '@src/services/PersonalService';
import { IPersonal } from 'src/models/Personal';
import { IReq, IRes } from './types/express/misc';

// **** Functions **** //

/**
 * Get all personales.
 */
async function getAll(_: IReq, res: IRes) {
  const personales = await PersonalService.getAll();
  return res.status(HttpStatusCodes.OK).json({ personales });
}

/**
 * Add one personal.
 */
async function add(req: IReq<{personal: IPersonal, idA : number, idB : number}>, res: IRes) {
  const { personal } = req.body;
  const { idA, idB } = req.params;
  await PersonalService.addOne(personal, Number(idA), Number(idB));
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one personal.
 */
async function update(req: IReq<{personal: IPersonal}>, res: IRes) {
  const { personal } = req.body;
  await PersonalService.updateOne(personal);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one personal.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await PersonalService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
