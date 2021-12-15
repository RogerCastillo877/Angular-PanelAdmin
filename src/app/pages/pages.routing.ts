import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
        { path: '', component: DashboardComponent},
        { path: 'progress', component: ProgressComponent},
        { path: 'graphic1', component: Graphic1Component},
        ]
    }
];

@NgModule({
    imports:[ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class PagesRoutingModule {}