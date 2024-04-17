import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import JefeService from '@src/services/JefeService';
import { IJefe } from '@src/models/Jefe';
import { IReq, IRes } from './types/express/misc';



async function getAll(_: IReq, res: IRes) {
  const jefe = await JefeService.getAll();
  return res.status(HttpStatusCodes.OK).json({ jefe });
}


async function add(req: IReq<{jefe: IJefe}>, res: IRes) {
  const { jefe } = req.body;
  await JefeService.addOne(jefe);
  return res.status(HttpStatusCodes.CREATED).end();
}


async function update(req: IReq<{jefe: IJefe}>, res: IRes) {
  const { jefe } = req.body;
  await JefeService.updateOne(jefe);
  return res.status(HttpStatusCodes.OK).end();
}


async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await JefeService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
