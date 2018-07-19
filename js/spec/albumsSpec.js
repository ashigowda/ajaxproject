$(document).ready(function () {
    var service = new serviceLayer();
    var logger = service.utils.getLogger();
    var createPhotoData = {
        "albumId": 100,
        "id": 5001,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "http://placehold.it/600/92c952",
        "thumbnailUrl": "http://placehold.it/150/92c952"
    }
    describe("albumsSpecTestSuite", function () {

        describe("testGetAlbums", function () {
            var pageNumber = 1;
            var pageLimit = 10;
            var albums = {};
            beforeAll(function (done) {
                service.dataAccess.getAlbums(pageNumber, pageLimit, function (err, response) {
                    albums = response.data;
                    done();
                });
            });
            it("should fetch " + pageLimit + " albums from the server", function () {
                expect(albums.length).toEqual(pageLimit);

            });

            it("should the id of the first albums is 1", function () {
                expect(albums[0].id).toEqual(1);
            });

        });
        describe("testGetAlbum", function () {
            var album = [];
            var albumId = 1;
            beforeAll(function (done) {
                service.dataAccess.getAlbum(albumId, function (err, response) {
                    album = response.data;
                    //  logger.debug("users list albums: " + JSON.stringify(userAlbums))
                    done();
                });
            });

            it("should the id of the first album is 1", function () {
                expect(album[0].id).toEqual(1);
            });
        });
        describe("testGetPhotosByAlbum", function () {
            var album = [];
            var userId = 1;
            var albumId = 102;
            var pageNumber = 1;
            var pageLimit = 5;
            var albumId = 1;
            beforeAll(function (done) {
                service.dataAccess.getPhotosByAlbum(albumId, pageNumber,pageLimit, function (err, response) {
                    album = response.data;
                    done();
                });
            });
            it("should fetch " + pageLimit + " photo from the server", function () {
                expect(album.length).toEqual(pageLimit);

            });

            it("should the id of the first photo is 1", function () {
                expect(album[0].id).toEqual(1);
            });

        });
       
    })
})