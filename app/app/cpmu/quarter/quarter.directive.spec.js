'use strict';

describe('cpmuQuarter directive', function(){
    var element, scope;

    beforeEach(module('cpmuCore'));

    beforeEach(inject(function($rootScope, $compile){
        element = angular.element('<cpmu-quarter></cpmu-quarter>');

        scope = $rootScope.$new();

        $compile(element)(scope);

        jasmine.addCustomEqualityTester(angular.equals);
    }));

    it('should not throw an error if complaints is not set in the scope', function(){
        scope.$digest();
    });

    it('should set the title to "CPMU by Quarter"', function(){
        scope.complaints = [];

        scope.$digest();

        expect(scope.cpmuTitle).toEqual("CPMU by Quarter");
    });

    it('should contain nothing', function () {
        scope.complaints = [];

        scope.$digest();

        expect(scope.cpmu_by_quarter).toEqual([]);
    });

    it('should create a list of CPMU compiled by quarter/year', function(){
        scope.complaints = [
            {"Quarter": "1", "Month": "2012-01-01T00:00:00", "Complaints": 27, "UnitsSold": 4932508 },
            {"Quarter": "1", "Month": "2012-02-01T00:00:00", "Complaints": 5, "UnitsSold": 86720 },
            {"Quarter": "1", "Month": "2012-03-01T00:00:00", "Complaints": 10, "UnitsSold": 824680 },
            {"Quarter": "2", "Month": "2012-05-01T00:00:00", "Complaints": 8, "UnitsSold": 118029 },
            {"Quarter": "2", "Month": "2012-06-01T00:00:00", "Complaints": 15, "UnitsSold": 160122 },
            {"Quarter": "3", "Month": "2012-07-01T00:00:00", "Complaints": 25, "UnitsSold": 436337 },
            {"Quarter": "3", "Month": "2012-09-01T00:00:00", "Complaints": 13, "UnitsSold": 424758 },
            {"Quarter": "4", "Month": "2012-10-01T00:00:00", "Complaints": 35, "UnitsSold": 4104195 },
            {"Quarter": "4", "Month": "2012-11-01T00:00:00", "Complaints": 42, "UnitsSold": 4086052 },
            {"Quarter": "4", "Month": "2012-12-01T00:00:00", "Complaints": 40, "UnitsSold": 1919000 },
            {"Quarter": "1", "Month": "2013-02-01T00:00:00", "Complaints": 38, "UnitsSold": 509845 },
            {"Quarter": "1", "Month": "2013-03-01T00:00:00", "Complaints": 11, "UnitsSold": 184738 },
            {"Quarter": "2", "Month": "2013-04-01T00:00:00", "Complaints": 5, "UnitsSold": 1412719 },
            {"Quarter": "2", "Month": "2014-04-01T00:00:00", "Complaints": 5, "UnitsSold": 1000000 }
        ];

        scope.$digest();

        expect(scope.cpmu_by_quarter).toEqual([
            {Year: 2012, Quarter: "1", "CPMU": "7.19"},
            {Year: 2012, Quarter: "2", "CPMU": "82.69"},
            {Year: 2012, Quarter: "3", "CPMU": "44.13"},
            {Year: 2012, Quarter: "4", "CPMU": "11.57"},
            {Year: 2013, Quarter: "1", "CPMU": "70.55"},
            {Year: 2013, Quarter: "2", "CPMU": "3.54"},
            {Year: 2014, Quarter: "2", "CPMU": "5.00"}

        ]);
    });
});