'use strict';

describe('cpmuMonth directive', function(){
    var element, scope;

    beforeEach(module('cpmuCore'));

    beforeEach(inject(function($rootScope, $compile){
        element = angular.element('<cpmu-month></cpmu-month>');

        scope = $rootScope.$new();

        $compile(element)(scope);

        jasmine.addCustomEqualityTester(angular.equals);
    }));

    it('should not throw an error if complaints is not set in the scope', function(){
        scope.$digest();
    });

    it('should set the title to "CPMU by Month"', function(){
        scope.complaints = [];

        scope.$digest();

        expect(scope.cpmuTitle).toEqual("CPMU by Month");
    });

    it('should contain nothing', inject(function () {
        scope.complaints = [];

        scope.$digest();

        expect(scope.cpmu_by_month).toEqual([]);
    }));

    it('should create a list of 3 elements', function () {
        scope.complaints = [
            {"Quarter": "1", "Month": "2012-01-01T00:00:00", "Complaints": 27, "UnitsSold": 4932508 },
            {"Quarter": "1", "Month": "2012-02-01T00:00:00", "Complaints": 5, "UnitsSold": 86720 },
            {"Quarter": "1", "Month": "2012-03-01T00:00:00", "Complaints": 10, "UnitsSold": 824680 }
        ];

        scope.$digest();

        expect(scope.cpmu_by_month).toEqual([
            {"Date": 'January 2012', "CPMU" : 5.47},
            {"Date": 'February 2012', "CPMU": 57.66},
            {"Date": 'March 2012', "CPMU": 12.13}
        ]);
    });

    it('should map any missing months to "No Data"', function(){
        scope.complaints = [
            {"Quarter": "1", "Month": "2012-01-01T00:00:00", "Complaints": 27, "UnitsSold": 4932508 },
            {"Quarter": "1", "Month": "2012-02-01T00:00:00", "Complaints": 5, "UnitsSold": 86720 },
            {"Quarter": "1", "Month": "2012-03-01T00:00:00", "Complaints": 10, "UnitsSold": 824680 },
            {"Quarter": "2", "Month": "2012-06-01T00:00:00", "Complaints": 15, "UnitsSold": 160122 },
            {"Quarter": "3", "Month": "2012-07-01T00:00:00", "Complaints": 25, "UnitsSold": 436337 },
            {"Quarter": "3", "Month": "2012-09-01T00:00:00", "Complaints": 13, "UnitsSold": 424758 },
            {"Quarter": "4", "Month": "2012-10-01T00:00:00", "Complaints": 35, "UnitsSold": 4104195 },
            {"Quarter": "4", "Month": "2012-11-01T00:00:00", "Complaints": 42, "UnitsSold": 4086052 },
            {"Quarter": "4", "Month": "2012-12-01T00:00:00", "Complaints": 40, "UnitsSold": 1919000 },
            {"Quarter": "1", "Month": "2013-02-01T00:00:00", "Complaints": 38, "UnitsSold": 509845 },
            {"Quarter": "1", "Month": "2013-03-01T00:00:00", "Complaints": 11, "UnitsSold": 184738 },
            {"Quarter": "2", "Month": "2013-04-01T00:00:00", "Complaints": 5, "UnitsSold": 1412719 }
        ];

        scope.$digest();

        expect(scope.cpmu_by_month).toEqual([
            {"Date": "January 2012",    "CPMU": 5.47},
            {"Date": "February 2012",   "CPMU": 57.66},
            {"Date": "March 2012",      "CPMU": 12.13},
            {"Date": "April 2012",      "CPMU": "No Data"},
            {"Date": "May 2012",        "CPMU": "No Data"},
            {"Date": "June 2012",       "CPMU": 93.68},
            {"Date": "July 2012",       "CPMU": 57.30},
            {"Date": "August 2012",     "CPMU": "No Data"},
            {"Date": "September 2012",  "CPMU": 30.61},
            {"Date": "October 2012",    "CPMU": 8.53},
            {"Date": "November 2012",   "CPMU": 10.28},
            {"Date": "December 2012",   "CPMU": 20.84},
            {"Date": "January 2013",    "CPMU": "No Data"},
            {"Date": "February 2013",   "CPMU": 74.53},
            {"Date": "March 2013",      "CPMU": 59.54},
            {"Date": "April 2013",      "CPMU": 3.54}

        ]);
    })
});