import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complaint-reporter',
  templateUrl: './complaint-reporter.component.html',
  styleUrls: ['./complaint-reporter.component.less']
})
export class ComplaintReporterComponent implements OnInit {

    private complaints: any;
    private stats: any[];

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data
            .subscribe((data: { complaints: any }) => {
                this.complaints = data.complaints;
                console.log(this.complaints);
            });
    }

}
