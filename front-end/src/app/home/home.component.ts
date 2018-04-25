import { Component, OnInit, OnDestroy } from '@angular/core';

import { UIControl } from '@app/core/ui-control';
import { Logger } from '@app/core/logger.service';
import { CpmuService, ICpmuData, ICpmuParams, GroupBy } from '@app/core/api/cpmu.service';

const log = new Logger('HomePage');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends UIControl implements OnInit, OnDestroy {
  public radioButtonGroupModel: string;
  public cpmu: ICpmuData;

  constructor(private cpmuService: CpmuService) {
    super();

    this.$loading = false;
  }

  ngOnInit() {
    const params: ICpmuParams = {
      groupBy: GroupBy.YEAR
    };

    this.getCpmuData(params);
    this.radioButtonGroupModel = GroupBy.YEAR;
  }

  ngOnDestroy() {
    super.unsubscribeAll();
  }

  public radioButtonGroupOnChange(event: any) {
    const groupType = event.target.defaultValue as GroupBy;
    const params: ICpmuParams = {
      groupBy: groupType
    };

    this.getCpmuData(params);
  }

  public parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }

  private getCpmuData(params: ICpmuParams) {
    this.$loading = true;
    this.safeSubscription(
      this.cpmuService.getCpmuData(params)
        .subscribe((res) => {
            this.cpmu = res;
            this.$loading = false;
          },
          (err) => {
            this.$loading = false;
            log.error(err.toString());
          })
    );
  }

}
