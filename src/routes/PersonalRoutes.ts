import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import MusicaService from '@src/services/MusicaService';
import { Musica } from '@src/models/Musica';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get all users.
 */

 /* Add one user.
 */
async function add(req: IReq<{user: Musica}>, res: IRes) {
  const { user } = req.body;
  await MusicaService.addOne(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{user: Musica}>, res: IRes) {
  const { user } = req.body;
  await MusicaService.updateOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await MusicaService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
