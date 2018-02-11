import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complaint-reporter',
  templateUrl: './complaint-reporter.component.html',
  styleUrls: ['./complaint-reporter.component.less']
})
export class ComplaintReporterComponent implements OnInit {

    public complaints: any;
    public years: any[];
    public periods: any[];
    public period: string;
    public error = false;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data
            .subscribe((data: { complaints: any}) => {
                if (data.complaints) {
                    this.complaints = data.complaints;
                    this.years = Object.keys(this.complaints.month);
                    this.periods = Object.keys(this.complaints);
                    this.period = this.periods[0];
                } else {
                    this.error = true;
                }
            });
    }

}
