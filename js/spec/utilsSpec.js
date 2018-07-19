$(document).ready(function () {
    var service = new serviceLayer();
    var logger = service.utils.getLogger();

    describe("PaginationTestSuite", function () {
        describe("testgeneratePagination", function () {
            var noOfRecords = 150;
            var pageNumber = 1;
            var recordsPerPage = 10;
            var output = [];
            beforeAll(function (done) {
                output = service.utils.generatePagination("/run.html", noOfRecords, pageNumber, recordsPerPage)
                done();
            });

            it("Should the total No. of pages be equal to 15", function () {
                expect(output.endPage).toEqual(15);
            });
            it("Should the first page in the segment be equal to 1", function () {
                expect(output.startPage).toEqual(1);
            });
            it("Should the last page in the segment be equal to 10", function () {
                expect(output.lastPage).toEqual(10);
            });
            it("Should the current segment be equal to 1", function () {
                expect(output.currentSegment).toEqual(1);
            });

        });
    });
});