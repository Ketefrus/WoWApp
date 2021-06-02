export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Personajes',
        to: '/personajes',
        icon: 'cil-speedometer'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Hermandad',
        to: '/hermandad',
        icon: 'cil-speedometer'
      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Logout',
      //   to: '/logout',
      //   icon: 'cil-speedometer'
      // }
    ]
  }
]