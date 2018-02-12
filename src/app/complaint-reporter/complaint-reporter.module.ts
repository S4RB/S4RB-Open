import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ComplaintReporterService } from './service/complaint-reporter.service';

import { ComplaintReporterComponent } from './complaint-reporter-view/complaint-reporter.component';

const routes: Routes = [
    {
        path: '',
        component: ComplaintReporterComponent,
        resolve: {
            complaints: ComplaintReporterService
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ComplaintReporterService
    ],
    declarations: [
        ComplaintReporterComponent
    ]
})
export class ComplaintReporterModule { }
