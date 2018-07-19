$(document).ready(function () {
    var service = new serviceLayer();
    var logger = service.utils.getLogger();

    var createCommentedData = {
        "postId": 3,
        "id": 508,
        "name": "gfgdgxta",
        "email": "Laaaaa@rod.tv",
        "body": "sfsfsfsfe"
    }

    describe("postsSpecTestSuite", function () {

        describe("testGetPosts", function () {
            var posts = [];
            var userId = 10;
            var pageNumber = 1;
            var pageLimit = 100;
            beforeAll(function (done) {
                service.dataAccess.getPosts(pageNumber,pageLimit, function (err, response) {
                    posts = response.data;
                    done();
                })

            });

            it("should fetch " + pageLimit + " post from the server", function () {
                expect(posts.length).toEqual(pageLimit);
            });

            it("should the id of the first post is 1", function () {
                expect(posts[0].id).toEqual(1);
            });

        });
        describe("testGetPost", function () {
            var posts = [];
            var postId = 1;
            beforeAll(function (done) {
                service.dataAccess.getPost(postId, function (err, response) {
                    //alert("total records is:" + response.totalRecords);
                    posts = response.data;

                   // alert(JSON.stringify(posts));
                    done();
                })

            });
            it("should the id of the first post is 1", function () {
                expect(posts.id).toEqual(1);
            });

        });
        describe("testGetCommentsByPost", function () {
            var comment = [];
            var userId = 1;
            var pageNumber = 1;
            var postId = 1;
            var pageLimit = 5;
            beforeAll(function (done) {
                service.dataAccess.getCommentsByPost(postId,pageNumber,pageLimit, function (err, response) {
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
        describe("testCreateCommentByPost", function () {
           var deleteCommentId = 508;
            var postId = 3;
            var deletedCommentedData = null;
            var createdCommentedData = null;
            beforeEach(function (done) {
                service.dataAccess.deleteCommentByPost(postId,deleteCommentId, function (err, deletedResponse) {
                    deletedCommentedData = deletedResponse.data;
                       //logger.debug("deleted User: " + deleteCommentId + ", Response: " + deletedCommentedData);

                    service.dataAccess.createCommentByPost(postId,createCommentedData, function (err, createResponse) {
                        createdCommentedData = createResponse.data;
                        logger.debug("created data: " + createdCommentedData);

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
    });
});

