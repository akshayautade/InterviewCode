import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {path: '', component: UserlistComponent  },
  {path: 'register', component: RegistrationComponent  },
  {path: 'update/:id', component: RegistrationComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
