$(document).ready(function () {
    var service = new serviceLayer();
    var logger = service.utils.getLogger();
    var updatePost = {
        "userId": 1,
        "id": 119,
        "title": "Bangalore",
        "body": "Mysore is a very clean city"
    }

    var createPostData = {
        "userId": 1,
        "id": 118,
        "title": "village nnnn",
        "body": "kkp is a khgh very nice city"
    }

    describe("PostsByUserSpecTestSuite", function () {
        describe("testGetPostsByUser", function () {
            var posts = [];
            var userId = 1;
            var pageLimit = 10;
            var pageNumber = 1;
            var recordsPerPage = 10;
            beforeAll(function (done) {
                service.dataAccess.getPostsByUser(userId, pageNumber, pageLimit, function (err, response) {
                    posts = response.data;
                    logger.debug("list posts: " + JSON.stringify(posts));
                    done();
                });
            });
            it("should fetch " + pageLimit + " posts from the server", function () {
                expect(posts.length).toEqual(pageLimit);

            });

            it("should the id of the first post is 1", function () {
                expect(posts[0].id).toEqual(1);
            });

            it("should the userId of the first post is 1", function () {
                expect(posts[0].userId).toEqual(1);
            })
        });

        describe("testUpdatePostByUser", function () {
            var postData = [];
            var userId = 1;
            var updatePostId = 119;
            beforeAll(function (done) {
                service.dataAccess.updatePostByUser(userId, updatePostId, updatePost, function (err, response) {
                    postData = response.data;
                    logger.debug("updated data is:" + postData);

                    done();
                })
            })
            it("should update the post on the server and response is equal to sent post", function () {
                expect(_.isEqual(updatePost, postData)).toEqual(true);
            });
        })


        describe("testDeletePostByUser", function () {
            var userId = 1;
            var deletePostId = 118;
            var deletedErr = null;
            var deletedPostData = null;
            var createdPostData = null;
            beforeAll(function (done) {
                service.dataAccess.createPostByUser(userId,createPostData, function (err, createdResponse) {
                    createdPostData = createdResponse.data;
                    logger.debug("created the post is:" + createdPostData);
                    service.dataAccess.deletePostByUser(userId,deletePostId, function (err, deletedResponse) {
                        deletedPostData = deletedResponse.data;
                        deletedErr = err;
                        logger.debug("deleted Post: " + deletePostId + ", Err Response: " + deletedErr);
                        done();
                    })
                })

            })
            it("should delete the post on the server", function () {
                expect(deletedErr).toEqual('');
            });
        });
        describe("testCreatePostByUser", function () {
            var deletePostId = 108;
            var userId = 10;
            var postId = 108;
            var deletedPostData = null;
            var createdPostData = null;
            beforeAll(function (done) {

                service.dataAccess.deletePostByUser(userId,deletePostId, function (err, deletedResponse) {
                    deletedPostData = deletedResponse.data;

                    logger.debug("deleted post is:" + deletedPostData);
                    service.dataAccess.createPostByUser(userId,createPostData, function (err, createdResponse) {
                        createdPostData = createdResponse.data;
                        done();
                    })
                });
            });

            it("should create the post on the server and response is equal to sent post", function () {
                logger.info("createPost: " + JSON.stringify(createPostData));
                logger.info("createdPost: " + JSON.stringify(createdPostData));
                expect(_.isEqual(createPostData, createdPostData)).toEqual(true);
            });
        })

    })
});



