import JefeService from '@src/services/JefeService';
import { IJefe } from 'src/models/Jefe';
import { IReq, IRes } from './types/express/misc';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Functions **** //

/**
 * Get all jefes.
 */
async function getAll(_: IReq<{ idA: number }>, res: IRes) {
  const id = Number(_.params.idA);
  console.log(id);
  const jefe = await JefeService.getAll(id);
  return res.status(HttpStatusCodes.OK).json({ jefe });
}

/**
 * Add one jefe.
 */
async function add(req: IReq<{ jefe: IJefe, idA: number }>, res: IRes) {
  const { jefe } = req.body;
  const { idA } = req.params;
  console.log(jefe);
  await JefeService.addOne(jefe, Number(idA));
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one jefe.
 */
async function update(req: IReq<{ jefe: IJefe }>, res: IRes) {
  const { jefe } = req.body;
  await JefeService.updateOne(jefe);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one jefe.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await JefeService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
