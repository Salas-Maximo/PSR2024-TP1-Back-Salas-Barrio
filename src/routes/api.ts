import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import Area from 'src/models/Area';
import Jefe from 'src/models/Jefe';
import AreaRoutes from './AreaRoutes';
import JefeRoutes from './JefeRoutes';
import Personal from 'src/models/Personal';
import PersonalRoutes from './PersonalRoutes';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// ** Add areaRouter ** //

const areaRouter = Router();

// Get all areas
areaRouter.get(
  Paths.Areas.Get,
  AreaRoutes.getAll,
);

// Add one area
areaRouter.post(
  Paths.Areas.Add,
  validate(['area', Area.isArea]),
  AreaRoutes.add,
);

// Update one area
areaRouter.put(
  Paths.Areas.Update,
  validate(['area', Area.isArea]),
  AreaRoutes.update,
);

// Delete one area
areaRouter.delete(
  Paths.Areas.Delete,
  validate(['id', 'number', 'params']),
  AreaRoutes.delete,
);

// Add areaRouter
apiRouter.use(Paths.Areas.Base, areaRouter);

// Jefe FUNCTIONS

const jefeRouter = Router({ mergeParams: true });

// Get all jefes
jefeRouter.get(
  Paths.Jefes.Get,
  validate(['idA', 'number', 'params']),
  JefeRoutes.getAll,
);

// Add one jefe
jefeRouter.post(
  Paths.Jefes.Add,
  validate(['jefe', Jefe.isJefe]),
  JefeRoutes.add,
);

// Update one jefe
jefeRouter.put(
  Paths.Jefes.Update,
  validate(['jefe', Jefe.isJefe]),
  JefeRoutes.update,
);

// Delete one jefe
jefeRouter.delete(
  Paths.Jefes.Delete,
  validate(['id', 'number', 'params']),
  JefeRoutes.delete,
);

// Add jefeRouter
apiRouter.use(Paths.Jefes.Base, jefeRouter);

// Personal FUNCTIONS

const personalRouter = Router({ mergeParams: true });

// Get all personales
personalRouter.get(
  Paths.Personales.Get,
  PersonalRoutes.getAll,
);

// Add one personal
personalRouter.post(
  Paths.Personales.Add,
  validate(['personal', Personal.isPersonal]),
  PersonalRoutes.add,
);

// Update one personal
personalRouter.put(
  Paths.Personales.Update,
  validate(['personal', Personal.isPersonal]),
  PersonalRoutes.update,
);

// Delete one personal
personalRouter.delete(
  Paths.Personales.Delete,
  validate(['id', 'number', 'params']),
  PersonalRoutes.delete,
);

// Add personalRouter
apiRouter.use(Paths.Personales.Base, personalRouter);

// **** Export default **** //

export default apiRouter;
