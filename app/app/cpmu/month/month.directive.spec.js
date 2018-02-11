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

        expect(scope.cpmu_by_month).toEqual({});
    }));

    it('should create a list of 3 elements', function () {
        scope.complaints = [
            {"Quarter": "1", "Month": "2012-01-01T00:00:00", "Complaints": 27, "UnitsSold": 4932508 },
            {"Quarter": "1", "Month": "2012-02-01T00:00:00", "Complaints": 5, "UnitsSold": 86720 },
            {"Quarter": "1", "Month": "2012-03-01T00:00:00", "Complaints": 10, "UnitsSold": 824680 }
        ];

        scope.$digest();

        expect(scope.cpmu_by_month).toEqual({
            'January 2012': 5.47,
            'February 2012': 57.66,
            'March 2012': 12.13
        });
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

        expect(scope.cpmu_by_month).toEqual({
            "January 2012":      5.47,
            "February 2012":    57.66,
            "March 2012":       12.13,
            "April 2012":       "No Data",
            "May 2012":         "No Data",
            "June 2012":        93.68,
            "July 2012":        57.30,
            "August 2012":      "No Data",
            "September 2012":   30.61,
            "October 2012":      8.53,
            "November 2012":    10.28,
            "December 2012":    20.84,
            "January 2013":     "No Data",
            "February 2013":    74.53,
            "March 2013":       59.54,
            "April 2013":        3.54

        });
    })
});