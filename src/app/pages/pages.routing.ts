import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthGuard } from '../guard/auth.guard';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesComponent } from './promes/promes.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
        { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
        { path: 'graphic1', component: Graphic1Component, data: { title: 'Graphic' } },
        { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Theme' } },
        { path: 'promes', component: PromesComponent, data: { title: 'Promes' } },
        { path: 'rxjs', component: RxjsComponent, data: { title: 'Rjxs' } },
        { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
        //  Maintenance
        { path: 'users', component: UsersComponent, data: { title: 'Mantenimiento usuarios' } },
        { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento hospitales' } },
        { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento médicos' } },
        { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Mantenimiento médicos' } },
        ]
    }
];

@NgModule({
    imports:[ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class PagesRoutingModule {}