import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesComponent } from './promes/promes.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
        { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
        { path: 'graphic1', component: Graphic1Component, data: { title: 'Graphic' } },
        { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Theme' } },
        { path: 'promes', component: PromesComponent, data: { title: 'Promes' } },
        { path: 'rxjs', component: RxjsComponent, data: { title: 'Rjxs' } },
        ]
    }
];

@NgModule({
    imports:[ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class PagesRoutingModule {}