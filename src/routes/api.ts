import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import User from '@src/models/User';
import UserRoutes from './UserRoutes';
import Personal from '@src/models/Personal';
import PersonalRoutes from './PersonalRoutes';
import Area from '@src/models/Area';
import AreaRoutes from './AreaRoutes';
import Jefe from '@src/models/Jefe';
import JefeRoutes from './JefeRoutes';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.isUser]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.isUser]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);




// **  PERSONAL  ** //

const personalRouter = Router();

personalRouter.get(
  Paths.Personal.Get,
  PersonalRoutes.getAll,
);

personalRouter.post(
  Paths.Personal.Add,
  validate(['personal', Personal.isPersonal]),
  PersonalRoutes.add,
);

personalRouter.put(
  Paths.Personal.Update,
  validate(['personal', Personal.isPersonal]),
  PersonalRoutes.update,
);

personalRouter.delete(
  Paths.Personal.Delete,
  validate(['id', 'number', 'params']),
  PersonalRoutes.delete,
);

apiRouter.use(Paths.Personal.Base, personalRouter);


// **  JEFE  ** //

const jefeRouter = Router();

jefeRouter.get(
  Paths.Jefe.Get,
  JefeRoutes.getAll,
);

jefeRouter.post(
  Paths.Jefe.Add,
  validate(['jefe', Jefe.isJefe]),
  JefeRoutes.add,
);

jefeRouter.put(
  Paths.Jefe.Update,
  validate(['jefe', Jefe.isJefe]),
  JefeRoutes.update,
);

jefeRouter.delete(
  Paths.Jefe.Delete,
  validate(['id', 'number', 'params']),
  JefeRoutes.delete,
);

apiRouter.use(Paths.Jefe.Base, jefeRouter);

// **  AREA  ** //

const areaRouter = Router();

areaRouter.get(
  Paths.Area.Get,
  AreaRoutes.getAll,
);

areaRouter.post(
  Paths.Area.Add,
  validate(['area', Area.isArea]),
  AreaRoutes.add,
);

areaRouter.put(
  Paths.Area.Update,
  validate(['area', Area.isArea]),
  AreaRoutes.update,
);

areaRouter.delete(
  Paths.Area.Delete,
  validate(['id', 'number', 'params']),
  AreaRoutes.delete,
);

apiRouter.use(Paths.Area.Base, areaRouter);


// **** Export default **** //

export default apiRouter;
