$(document).ready(function () {
    var service = new serviceLayer();
    var logger = service.utils.getLogger();

    var updatePhoto = {
        "albumId": 157,
        "id": 5151,
        "title": "nature photo",
        "url": "http://placehold.it/600/a91762",
        "thumbnailUrl": "http://placehold.it/150/a91762"
    }
    var createPhotoData = {
        "albumId": 127,
        "id": 5151,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "http://placehold.it/600/92c952",
        "thumbnailUrl": "http://placehold.it/150/92c952"
    }
    describe("PhotosByAlbumTestSuite", function () {
        describe("testGetAlbumByUser", function () {
            var userId = 1;
            var albumId = 1;
            var albums = {};
            beforeAll(function (done) {
                service.dataAccess.getAlbumByUser(userId,albumId, function (err, response) {
                    albums = response.data;
                    done();
                });
            });
            it("should the id of the first albums is 1", function () {
                expect(albums[0].id).toEqual(1);
            });

        });
        describe("testGetPhotosByAlbum", function () {
            var photos = {};
            var userId = 1;
            var albumId = 1;
            var pageNumber = 1;
            var pageLimit = 10;
            beforeAll(function (done) {
                service.dataAccess.getPhotosByAlbum(albumId, pageNumber, pageLimit, function (err, response) {
                    photos = response.data;
                    //  logger.debug("list photos: " + JSON.stringify(photo));
                    done();
                });
            });
            it("should fetch " + pageLimit + " photos from the server", function () {
                expect(photos.length).toEqual(pageLimit);

            });

            it("should the id of the first photo is 1", function () {
                expect(photos[0].id).toEqual(1);
            });

        });
        describe("testGetPhotoByAlbum", function () {
            var photos = null;
            var userId = 1;
            var albumId = 1;
            var photoId = 1;
            beforeAll(function (done) {
                service.dataAccess.getPhotoByAlbum(albumId,photoId,function (err, response) {
                    photos = response.data;
                     logger.debug("list photos: " + JSON.stringify(photos));
                    done();
                });
            });
           
            it("should the id of the first photo is 1", function () {
                expect(photos[0].id).toEqual(1);
            });

        });

        describe("testUpdatePhotoByAlbum", function () {
            var photoData = null;
            var updateId = 5151;
            var userId = 1;
            var albumId = 157;
            beforeAll(function (done) {
                service.dataAccess.updatePhotoByAlbum(albumId, updateId, updatePhoto, function (err, response) {
                    photoData = response.data;
                    done();
                })
            });

            it("should update the photo on the server and response is equal to sent photo", function () {
                expect(_.isEqual(photoData, updatePhoto)).toEqual(true);
            });

        });
         describe("testCreatePhotoByAlbum", function () {
           var deletePhotoId = 5151;
            var userId =  1;
            albumId = 157;
            var deletedphotoData = null;
            var createdPhotoData = null;
            beforeEach(function (done) {
               service.dataAccess.deletePhotoByAlbum(albumId, deletePhotoId, function (err, deletedResponse) {
                  deletedUserData = deletedResponse.data;
                     logger.debug("deleted User: " + deleteUserId + ", Response: " + deletedUserData);

                    service.dataAccess.createPhotoByAlbum(albumId, createPhotoData, function (err, createResponse) {
                        createdPhotoData = createResponse.data;
                        alert(createResponse)
                        logger.debug("created User: " + createdPhotoData);

                        done();
                    })

                });
          //  });
            it("should create the photo on the server and response is equal to sent photo", function () {
                // logger.info("createUser: " + JSON.stringify(createUserData));
                //logger.info("createdUser: " + JSON.stringify(createdUserData));
                expect(_.isEqual(createPhotoData, createdPhotoData)).toEqual(true);
            });
        });
      /*  describe("testDeletePhotoByAlbum", function () {
            var deletePhotoId = 5151;
            var userId = 1;
            var albumId = 157;
            var deleteErr = null;
            var deletedPhotoData = null;
            var createdPhotoData = null;
            beforeEach(function (done) {
                service.dataAccess.createPhotoByAlbum(albumId, createPhotoData, function (err, createResponse) {
                    createdPhotoData = createResponse.data;
                    logger.debug("created User: " + createdPhotoData);

                    service.dataAccess.deletePhotoByAlbum(albumId,deletePhotoId, function (err, deletedResponse) {
                        deletedPhotoData = deletedResponse.data;
                        deleteErr = err;
                        logger.debug("deleted User: " + deletePhotoId + ", Err Response: " + deleteErr);
                        done();
                    })

                });
            });
            it("should delete the photo on the server and response having no error", function () {
                expect(deleteErr).toEqual('');
            });
        })
       */

    })
})