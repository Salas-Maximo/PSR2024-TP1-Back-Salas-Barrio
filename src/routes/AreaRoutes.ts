import AreaService from '@src/services/AreaService';
import { IArea } from 'src/models/Area';
import { IReq, IRes } from './types/express/misc';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Functions **** //

/**
 * Get all areas.
 */
async function getAll(_: IReq, res: IRes) {
  const areas = await AreaService.getAll();
  return res.status(HttpStatusCodes.OK).json({ areas });
}

/**
 * Add one area.
 */
async function add(req: IReq<{ area: IArea }>, res: IRes) {
  const { area } = req.body;
  await AreaService.addOne(area);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one area.
 */
async function update(req: IReq<{ area: IArea }>, res: IRes) {
  const { area } = req.body;
  await AreaService.updateOne(area);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one area.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await AreaService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
