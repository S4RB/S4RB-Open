'use strict';

describe('end to end tests', function() {
    it('should redirect anything other than /cpmu to /', function(){
        browser.get('#!/hello');
        expect(browser.getLocationAbsUrl()).toBe('/');
    });

    it('should not redirect `#!/cpmu', function() {
        browser.get('#!/cpmu');
        expect(browser.getLocationAbsUrl()).toBe('/cpmu');
    });

    var subPages = ['', '?filter=quarter'];

    // test navigation from each sub-page of the CPMU module
    for(var subPage_i in subPages)
    {
        var subPage = subPages[subPage_i];

        describe('CPMU control from ' + subPage, function(){
            var groupByMonthButton = element(by.id('group-by-month'));
            var groupByQuarterButton = element(by.id('group-by-quarter'));

            beforeEach(function(){
                browser.get('#!/cpmu' + subPage);
            });

            it('should redirect to "#!/cpmu?filter=quarter" when the "Group by Quarter" button is clicked', function(){
                groupByQuarterButton.click();
                expect(browser.getLocationAbsUrl()).toBe('/cpmu?filter=quarter');
            });

            it('should redirect to "#!/cpmu" when the "Group by Month" button is clicked', function(){
                groupByMonthButton.click();
                expect(browser.getLocationAbsUrl()).toBe('/cpmu');
            });
        });
    }

    describe('CPMU by Month', function(){
        beforeEach(function(){
            browser.get('#!/cpmu');
        });

        it('should create a table containing all entries in the db + "No Data" entries for the missing months', function(){
            var data = element.all(by.repeater('(date, cpmu) in cpmu_by_month'));

            // data runs from jan 2012 to march 2017
            var num_months = (12 * (2017 - 2012)) + 3;
            expect(data.count()).toBe(num_months);
        });
    });

    describe('CPMU by Quarter', function(){
        beforeEach(function(){
            browser.get('#!/cpmu?filter=quarter');
        });

        it('should create a table containing all entries in the db + "No Data" entries for the missing months', function(){
            var data = element.all(by.repeater('cpmu_data in cpmu_by_quarter'));

            // number of months divided by the number of months per quarter
            var num_quarters = ((12 * (2017 - 2012)) + 3) / 3;
            expect(data.count()).toBe(num_quarters);
        });
    })
});