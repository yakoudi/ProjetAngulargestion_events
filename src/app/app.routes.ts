import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { HomeComponent } from './components/home/home.component';
import { DemandeeventComponent } from './components/demandeevent/demandeevent.component';
import { ListeuserComponent } from './components/listeuser/listeuser.component';
import { DashbordSuperieurHeararchiqueComponent } from './components/dashbord-superieur-heararchique/dashbord-superieur-heararchique.component';
import { DashboardRHComponent } from './components/dashboard-rh/dashboard-rh.component';
import { AppSalesProfitComponent } from './components/sales-profit/sales-profit.component';
import { ModifierProfilComponent } from './components/modifier-profil/modifier-profil.component';
import { ReponseDemandeComponent } from './components/reponse-demande/reponse-demande.component';
import { ListefournisseurComponent } from './components/listefournisseur/listefournisseur.component';
import { AppBlogCardsComponent } from './components/blog-card/blog-card.component';
import { InvitationserviceService } from './services/invitationservice.service';
import { ListInvitationsComponent } from './components/list-invitations/list-invitations.component';
import { EnvoyerInvitationComponent } from './components/envoyer-invitation/envoyer-invitation.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ProfilComponent } from './components/profil/profil.component';



export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,  
  },

  



 {
    path: 'dashboard/RH',
    component: DashboardRHComponent,  
     children :[
       { path:'listeuser',  component:ListeuserComponent} ,
      {path:'modifier-profil', component: ModifierProfilComponent},
      {path:'reponse-demande', component:ReponseDemandeComponent},
     { path: 'fournisseurs', component: ListefournisseurComponent },
      {path:'card', component:AppBlogCardsComponent},
      {path:'invitation', component:ListInvitationsComponent},
      {path:'envoyerinvitation', component : EnvoyerInvitationComponent},
      {path:'profil', component:ProfilComponent}


    ]
 
},

 {
    path: 'dashboard/superieur',
    component: DashbordSuperieurHeararchiqueComponent,  
    children:[
      {path:'evenement',
        component:DemandeeventComponent
      },
      {path:'modifier-profil', component: ModifierProfilComponent},
      {path:'calander', component: CalendarComponent},
      {path:'profil', component:ProfilComponent}
      
    
     
    ]
     
  
 
},

  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),


          
     
      },
    

    ],
  },

  

  {
    path: '**',
    redirectTo: '',  // Toute route inconnue revient à la home
  },
    
];
