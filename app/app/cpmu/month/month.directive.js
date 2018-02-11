/**
 * Directive for aggregating the monthly values
 */
'use strict';

angular.module('cpmuCore').
    directive('cpmuMonth', function(){
        return {
            restrict: 'E',
            transclude: true,
            // language=HTML
            template:
                '<div class="cpmu-month">\
                    <table>\
                        <thead>\
                            <tr>\
                                <th class="cpmu-month">Month</th>\
                                <th class="cpmu-cpmu">CPMU</th>\
                            </tr>\
                        </thead>\
                        <tbody>\
                            <tr ng-repeat="data in cpmu_by_month">\
                                <td>{{data.Date}}</td>\
                                <td>{{data.CPMU}}</td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>',
            link: function(scope){
                scope.cpmu_by_month = [];
                scope.$parent.cpmuTitle = "CPMU by Month";

                scope.$watch('complaints', function(){
                    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                    if(scope.complaints && scope.complaints.length)
                    {
                        // grab first data values for date
                        var date = new Date(scope.complaints[0].Month);
                        var last_month = date.getMonth();
                        var last_year = date.getFullYear();

                        for(var complaint_index in scope.complaints)
                        {
                            // grab complaint data for ease of access
                            var complaint_data = scope.complaints[complaint_index];

                            // grab date data
                            date = new Date(complaint_data.Month);
                            var month_int = date.getMonth();
                            var year = date.getFullYear();

                            // temp month value including difference in years
                            var t_month_int = month_int + ((year - last_year) * 12);
                            var date_str;
                            while(t_month_int - last_month > 1)
                            {
                                // increase the month each iteration
                                last_month++;

                                // modular 12 for the date name
                                date_str = months[last_month % 12] + " " + year;

                                // add "No Data" to the complaints list for each month missing
                                scope.cpmu_by_month.push({"Date": date_str, "CPMU": "No Data"});
                            }

                            // create the date string for the actual data we're looking at at calculate the cpmu
                            date_str = months[month_int] + " " + year;
                            var cpmu = Number(complaint_data.Complaints / (complaint_data.UnitsSold / 1000000)).toFixed(2);

                            scope.cpmu_by_month.push({"Date": date_str, "CPMU": Number(cpmu)});

                            // reset last_month and last_year
                            last_month = month_int;
                            last_year = year;
                        }
                    }
                });
            }
        }
});