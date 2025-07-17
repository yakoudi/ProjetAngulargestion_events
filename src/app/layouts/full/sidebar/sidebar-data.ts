import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:atom-line-duotone',
    route: '/dashboard/RH',
  },


  {
    divider: true,
    navCap: 'Apps',
  },
  {
    displayName: 'Chat',
    iconName: 'solar:chat-round-line-line-duotone',
    route: 'https://materialm-angular-main.netlify.app/apps/chat',
    chip: true,
    external: true,
  
  },
    {
    displayName: 'Utilisateurs',
    iconName: 'solar:chat-round-line-line-duotone',
    route: 'dashboard/RH/listeuser',
    chip: true,
    external: true,
  
  },
  {
    displayName: 'Calendar',
    iconName: 'solar:calendar-mark-line-duotone',
    route: 'https://materialm-angular-main.netlify.app/apps/calendar',
    chip: true,
    external: true,
   
  },
  {
    displayName: 'Email',
    iconName: 'solar:letter-line-duotone',
    chip: true,
    external: true,

  },
  
  {
    displayName: 'Contacts',
    iconName: 'solar:phone-line-duotone',
    route: 'https://materialm-angular-main.netlify.app/apps/contacts',
    chip: true,
    external: true,
 
  },
 

  {
    displayName: 'Employee',
    iconName: 'solar:user-id-line-duotone',
    route: 'https://materialm-angular-main.netlify.app/apps/employee',
    chip: true,
    external: true,
   
  },

 


  {
    divider: true,
    navCap: 'Pages',
  },
 

  {
    displayName: 'Account Setting',
    iconName: 'solar:accessibility-line-duotone',
    route: 'https://materialm-angular-main.netlify.app/theme-pages/account-setting',
    external: true,
  
  }
  ,

  {
    divider: true,
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/login',
      },
      {
        displayName: 'Side Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://materialm-angular-main.netlify.app/authentication/login',
        external: true,
        chip: true,
     
      },
    ],
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/register',
      },
   
    ],
  },
  {
    displayName: 'Forgot Pwd',
    iconName: 'solar:password-outline',
    route: '/authentication',
    chip: true,
    
 
  },


  {
    displayName: 'Maintenance',
    iconName: 'solar:settings-line-duotone',
    route: 'https://materialm-angular-main.netlify.app/authentication/maintenance',
    external: true,
    chip: true,
 
  },
  
];
