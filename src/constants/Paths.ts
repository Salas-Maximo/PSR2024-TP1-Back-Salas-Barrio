/**
 * Express router paths go here.
 */

export default {
  Base: '/api',

  Areas: {
    Base: '/areas',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
    AgregarJefe: '/:id/agregarJefe',
  },
  Jefes: {
    Base: '/areas/:idA/',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:idB',
    AgregarPersonal: '/jefes/:idB/agregarPersonal',
  },
  Personales: {
    Base: '/areas/:idA/jefes/:idB/',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:idC',
    AgregarPersonal: '/jefes/:idB/agregarPersonal'
  }
} as const;
