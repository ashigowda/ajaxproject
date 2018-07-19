$(document).ready(function () {
    var service = new serviceLayer();
    var logger = service.utils.getLogger();

    var updateAlbum = {
        "userId": 10,
        "id": 103,
        "title": "nature photo",
        "body": "bamng is a very gd city"
    }

    var createAlbumData = {
        "userId": 10,
        "id": 102,
        "title": "doll photo",
        "body": "kkp is a very gd city"
    }

    describe("testalbumsByUserSpec", function () {
        var service = new serviceLayer();

        describe("testGetAlbumsByUser", function () {
            var albums = [];
            var userId = 10;
            var albumId = 1;
            var pageNumber = 1;
            var pageLimit = 5;
            beforeAll(function (done) {
                service.dataAccess.getAlbumsByUser(userId, pageNumber, pageLimit, function (err, response) {
                    albums = response.data;
                    //   logger.debug("list albums: " + JSON.stringify(albums));
                    done();
                });
            });
            it("should fetch " + pageLimit + " albums from the server", function () {
                expect(albums.length).toEqual(pageLimit);

            });

            it("should the id of the first album is 1", function () {
                expect(albums[0].id).toEqual(91);
            });

        });

        describe("testUpdateAlbumByUser", function () {
            var userId = 10;
            var albumData = null;
            var updateAlbumId = 103;
            beforeAll(function (done) {
                service.dataAccess.updateAlbumByUser(userId, updateAlbumId, updateAlbum, function (err, response) {
                    albumData = response.data;
                    done();
                })
            });

            it("should update the album on the server and response is equal to sent album", function () {
                expect(_.isEqual(albumData, updateAlbum)).toEqual(true);
            });

        });

        describe("testCreateAlbumByUser", function () {
            var userId = 10;
            var deletedAlbumId = 102;
            var createdAlbumData = null;
            var deletedAlbumData = null;
            beforeAll(function (done) {
                service.dataAccess.deleteAlbumByUser(userId, deletedAlbumId, function (err, deletedResponse) {
                    deletedAlbumData = deletedResponse.data;
                    service.dataAccess.createAlbumByUser(userId, createAlbumData, function (err, createdResponse) {
                        createdAlbumData = createdResponse.data;
                        done();
                    })
                });
            });
            it("should create the album on the server and response is equal to sent album", function () {
                logger.info("createAlbum: " + JSON.stringify(createAlbumData));
                logger.info("createAlbum: " + JSON.stringify(createdAlbumData));
                expect(_.isEqual(createAlbumData, createdAlbumData)).toEqual(true);
            });


        });
        describe("testDeleteAlbumByUser", function () {
                    var deletedAlbumId = 102;
                    var userId = 10;
                    var deletedErr = null;
                    var createdAlbumData = null;
                    var deletedAlbumData = null;
                    beforeAll(function (done) {
                        service.dataAccess.createAlbumByUser(userId,createAlbumData, function (err, createResponse) {
                            createdAlbumData = createResponse;
                            service.dataAccess.deleteAlbumByUser(userId,deletedAlbumId, function (err, deletedResponse) {
                                deletedAlbumData = deletedResponse.data;
                                deletedErr = err;
                                done();
                            })
                        })
                    });
                    it("should delete the album on the server", function () {
                        expect(deletedErr).toEqual('');
        
                    })
                });
    })
});




