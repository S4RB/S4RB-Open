/**
 * Directive for aggregating the quarter values
 */
'use strict'

angular.module('cpmuCore').
    directive('cpmuQuarter',  function() {
    return {
        restrict: 'E',
        // language=HTML
        template:
        '<div class="cpmu-month">\
            <table>\
                <thead>\
                    <tr>\
                        <th class="cpmu-year">Year</th>\
                        <th class="cpmu-quarter">Quarter</th>\
                        <th class="cpmu-cpmu">CPMU</th>\
                    </tr>\
                </thead>\
                <tbody>\
                    <tr ng-repeat="cpmu_data in cpmu_by_quarter">\
                        <td>{{cpmu_data.Year}}</td>\
                        <td>{{cpmu_data.Quarter}}</td>\
                        <td>{{cpmu_data.CPMU}}</td>\
                    </tr>\
                </tbody>\
            </table>\
        </div>',
        link: function (scope) {
            scope.cpmu_by_quarter = [];
            scope.$parent.cpmuTitle = "CPMU by Quarter";

            // watch for changes in the complaints data
            scope.$watch('complaints', function() {
                // check it exists and is an array
                if(scope.complaints && scope.complaints.length > 0)
                {
                    var complaint_index = 0;

                    // grab the first data
                    var first_date = new Date(scope.complaints[complaint_index].Month);
                    // initialise last_year and last_quarter,
                    // these will be used for comparison against current values and aggregation
                    var last_year = first_date.getFullYear();
                    var last_quarter = scope.complaints[complaint_index].Quarter;

                    // vars for storing the data we're currently working on
                    var quarter_total_complaints = 0;
                    var quarter_total_units = 0;
                    var num_current_quarter = 0;

                    while (complaint_index < scope.complaints.length)
                    {
                        // grab current complaint data that we're looking at
                        var complaint_data = scope.complaints[complaint_index];

                        var date = new Date(complaint_data.Month);
                        var year = date.getFullYear();
                        var quarter = complaint_data.Quarter;

                        // check if we have moved from one quarter to another
                        if (quarter !== last_quarter || year !== last_year)
                        {
                            // if we have then calculate the values required
                            var total_units_m = (quarter_total_units / 1000000);
                            scope.cpmu_by_quarter.push({
                                "Year": last_year,
                                "Quarter": last_quarter,
                                "CPMU": Number(quarter_total_complaints / total_units_m).toFixed(2)
                            });

                            // reset values for current quarter
                            quarter_total_complaints = 0;
                            quarter_total_units = 0;
                            num_current_quarter = 0;

                            // update last_quarter and last_year to previous values
                            last_quarter = quarter;
                            last_year = year;
                        }

                        // increment data
                        quarter_total_complaints += complaint_data.Complaints;
                        quarter_total_units += complaint_data.UnitsSold;
                        num_current_quarter++;
                        complaint_index++;
                    }

                    // set final quarter values
                    total_units_m = (quarter_total_units / 1000000);
                    scope.cpmu_by_quarter.push({
                        "Year": last_year,
                        "Quarter": last_quarter,
                        "CPMU": Number(quarter_total_complaints / total_units_m).toFixed(2)
                    });
                }
            });
        }
    }
});