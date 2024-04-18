import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import AreaService from '@src/services/AreaService';
import { IArea } from '@src/models/Area';
import { IReq, IRes } from './types/express/misc';



async function getAll(_: IReq, res: IRes) {
  const area = await AreaService.getAll();
  return res.status(HttpStatusCodes.OK).json({ area });
}


async function add(req: IReq<{area: IArea}>, res: IRes) {
  const { area } = req.body;
  await AreaService.addOne(area);
  return res.status(HttpStatusCodes.CREATED).end();
}


async function update(req: IReq<{area: IArea}>, res: IRes) {
  const { area } = req.body;
  await AreaService.updateOne(area);
  return res.status(HttpStatusCodes.OK).end();
}


async function delete_(req: IReq, res: IRes) {
  const nombre = req.params.nombre;
  await AreaService.delete(nombre);
  return res.status(HttpStatusCodes.OK).end();
}



export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
