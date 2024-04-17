import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import PersonalService from '@src/services/PersonalService';
import { IPersonal } from '@src/models/Personal';
import { IReq, IRes } from './types/express/misc';



async function getAll(_: IReq, res: IRes) {
  const personal = await PersonalService.getAll();
  return res.status(HttpStatusCodes.OK).json({ personal });
}


async function add(req: IReq<{personal: IPersonal}>, res: IRes) {
  const { personal } = req.body;
  await PersonalService.addOne(personal);
  return res.status(HttpStatusCodes.CREATED).end();
}


async function update(req: IReq<{personal: IPersonal}>, res: IRes) {
  const { personal } = req.body;
  await PersonalService.updateOne(personal);
  return res.status(HttpStatusCodes.OK).end();
}


async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await PersonalService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
