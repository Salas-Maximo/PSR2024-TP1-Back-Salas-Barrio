/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Personal: {
    Base: '/personal',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Jefe: {
    Base: '/jefe',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Area: {
    Base: '/area',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:nombre',
  },


} as const;
