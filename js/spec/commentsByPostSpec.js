$(document).ready(function () {
    var service = new serviceLayer();
    var logger = service.utils.getLogger();
    var updateComment = {
        "postId": 2,
        "id": 700,
        "name": "gfgdgxzszxta",
        "email": "Laaaaxazsxzxa@rod.tv",
        "body": "sfsfsfsvdfvfe"
    }
    var createCommentedData = {
        "postId": 2,
        "id": 600,
        "name": "gfgdgxta",
        "email": "Laaaaa@rod.tv",
        "body": "sfsfsfsfe"
    }

    describe("CommentsByPostSpecTestSuite", function () {
         describe("testGetPostByUser",function(){
             var posts = [];
             postId = 1;
            var userId = 1;
            beforeAll(function (done) {
                service.dataAccess.getPostByUser(userId,postId, function (err, response) {
                    posts = response.data;
                    logger.debug("list posts: " + JSON.stringify(posts));
                    done();
                });
            });
            it("should the id of the first post is 1", function () {
                expect(posts[0].id).toEqual(1);
            });

            it("should the userId of the first post is 1", function () {
                expect(posts[0].userId).toEqual(1);
            })
        });
        describe("testGetCommentsByPost", function () {
            var comment = [];
            var postId = 1;
            var pageNumber = 1;
            var pageLimit = 5;
            var userId = 10;
            beforeAll(function (done) {
                service.dataAccess.getCommentsByPost(postId, pageNumber, pageLimit, function (err, response) {
                    comment = response.data;
                    //  logger.debug("list comment: " + JSON.stringify(comment));
                    done();
                });
            });
            it("should fetch " + pageLimit + " comment from the server", function () {
                expect(comment.length).toEqual(pageLimit);

            });

            it("should the id of the first comment is 1", function () {
                expect(comment[0].id).toEqual(1);
            });

        });
       describe("testGetCommentByPost", function () {
            var comment = null;
            var postId = 1;
            var userId = 10;
            var commentId = 2;
            beforeAll(function (done) {
                service.dataAccess.getCommentByPost(postId,commentId,function (err, response) {
                    comment = response.data;
                      logger.debug("list comment: " + JSON.stringify(comment));
                    done();
                });
            });
            
            it("should the id of the first comment is 2", function () {
                expect(comment[0].id).toEqual(2);
            });

        });

        describe("testUpdateCommentByPost", function () {
            var CommentData = null;
            var userId  = 10
            var postId = 2;
            var commentId = 700;
            beforeAll(function (done) {
                service.dataAccess.updateCommentByPost(postId,commentId, updateComment, function (err, response) {
                    commentData = response.data;
                    done();
                })
            });

            it("should update the comment on the server and response is equal to sent comment", function () {
                expect(_.isEqual(commentData, updateComment)).toEqual(true);
            });

        });
        describe("testCreateCommentByPost", function () {
            var userId = 2;
            var postId = 2;
            var deleteCommentId = 600;
            var deletedCommentedData = null;
            var createdCommentedData = null;
            beforeEach(function (done) {
                service.dataAccess.deleteCommentByPost(postId,deleteCommentId, function (err, deletedResponse) {
                    deletedCommentedData = deletedResponse.data;
                    //   logger.debug("deleted User: " + deleteUserId + ", Response: " + deletedUserData);

                    service.dataAccess.createCommentByPost(postId,createCommentedData, function (err, createResponse) {
                        createdCommentedData = createResponse.data;
                        logger.debug("created comment: " + createdCommentedData);

                        done();
                    })

                });
            });
            it("should create the comment on the server and response is equal to sent comment", function () {
                // logger.info("createUser: " + JSON.stringify(createUserData));
                //logger.info("createdUser: " + JSON.stringify(createdUserData));
                expect(_.isEqual(createdCommentedData, createCommentedData)).toEqual(true);
            });
        });

       /*describe("testDeleteCommentByPost", function () {
            var deleteCommentId = 600;
            var userId = 2;
            var postId = 2;
            var deleteErr = null;
            var deletedCommentedData = null;
            var createdCommentedData = null;
            beforeEach(function (done) {
                service.dataAccess.createCommentByPost(postId,createCommentedData, function (err, createResponse) {
                    createdCommentedData = createResponse.data;
                    logger.debug("created comment: " + JSON.stringify(createdCommentedData));

                    service.dataAccess.deleteCommentByPost(postId,deleteCommentId, function (err, deletedResponse) {
                        deletedCommentedData = deletedResponse.data;
                        deleteErr = err;
                        logger.debug("deleted comment: " + deleteCommentId + ", Err Response: " + deleteErr);
                        done();
                    })

                });
            });
            it("should delete the comment on the server and response having no error", function () {
                expect(deleteErr).toEqual('');
            });
        })*/
        
    })
})