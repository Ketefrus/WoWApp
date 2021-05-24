import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/app/containers/TheContainer')

// Views
const Dashboard = () => import('@/app/views/Dashboard')

const Colors = () => import('@/app/views/theme/Colors')
const Typography = () => import('@/app/views/theme/Typography')

const Charts = () => import('@/app/views/charts/Charts')
const Widgets = () => import('@/app/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/app/views/base/Cards')
const Forms = () => import('@/app/views/base/Forms')
const Switches = () => import('@/app/views/base/Switches')
const Tables = () => import('@/app/views/base/Tables')
const Tabs = () => import('@/app/views/base/Tabs')
const Breadcrumbs = () => import('@/app/views/base/Breadcrumbs')
const Carousels = () => import('@/app/views/base/Carousels')
const Collapses = () => import('@/app/views/base/Collapses')
const Jumbotrons = () => import('@/app/views/base/Jumbotrons')
const ListGroups = () => import('@/app/views/base/ListGroups')
const Navs = () => import('@/app/views/base/Navs')
const Navbars = () => import('@/app/views/base/Navbars')
const Paginations = () => import('@/app/views/base/Paginations')
const Popovers = () => import('@/app/views/base/Popovers')
const ProgressBars = () => import('@/app/views/base/ProgressBars')
const Tooltips = () => import('@/app/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/app/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/app/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/app/views/buttons/Dropdowns')
const BrandButtons = () => import('@/app/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/app/views/icons/CoreUIIcons')
const Brands = () => import('@/app/views/icons/Brands')
const Flags = () => import('@/app/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/app/views/notifications/Alerts')
const Badges = () => import('@/app/views/notifications/Badges')
const Modals = () => import('@/app/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/app/views/pages/Page404')
const Page500 = () => import('@/app/views/pages/Page500')
const Login = () => import('@/app/views/pages/Login')
const Register = () => import('@/app/views/pages/Register')

// Users
const Users = () => import('@/app/views/users/Users')
const User = () => import('@/app/views/users/User')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Icons library',
              component: CoreUIIcons
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
}

