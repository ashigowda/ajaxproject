$(document).ready(function () {
    var service = new serviceLayer();
    var logger = service.utils.getLogger();

    var userData = {
        "id": 18,
        "name": "ashagowda",
        "username": "ashakv",
        "email": "asharani.kv@stralenhoop.com",
        "address": {
            "street": "Basaveshwara Nagar",
            "suite": "Aanjanadri nilaya",
            "city": "KKP",
            "zipcode": "562117",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "8888888888",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    }
    var createUserData = {
        "id": 17,
        "name": "ashigowda",
        "username": "asha",
        "email": "rani.kv@stralenhoop.com",
        "address": {
            "street": "Basaveshwara Nagar",
            "suite": "Aanjanadri nilaya",
            "city": "KKP",
            "zipcode": "562117",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "8888888888",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    }

    describe("userSpecTestSuite", function () {
        describe("testGetUsers", function () {
            var users = [];
            var pageNumber = 1;
            var pageLimit = 10;
            beforeAll(function (done) {
                service.dataAccess.getUsers(pageNumber, pageLimit, function (err, response) {
                    //   alert("total records is:" + response.totalRecords);
                    users = response.data;
                    done();
                })

            });

            it("should fetch " + pageLimit + " users from the server", function () {
                expect(users.length).toEqual(pageLimit);
            });

            it("should the id of the first user is 1", function () {
                expect(users[0].id).toEqual(1);
            });

        });

        describe("testGetUser", function () {
            var userId = 1;
            var users = {};
            beforeAll(function (done) {
                service.dataAccess.getUser(userId, function (err, response) {
                    users = response.data
                    done();
                })

            });

            it("should the id of the first user is 1", function () {
                expect(users[0].id).toEqual(1);
            });

        });
        describe("testUpdateUser", function () {
            var updatedUser = null;
            var userId = 18;
            beforeAll(function (done) {
                service.dataAccess.updateUser(userId, userData, function (err, response) {
                    updatedUser = response.data;
                   // alert("data is:"+updatedUser)
                    logger.debug("Updated User: " + JSON.stringify(updatedUser));
                    done();
                })
            });

            it("should update the user on the server and response is equal to sent user", function () {
                expect(_.isEqual(userData, updatedUser)).toEqual(true);
            });

        });
        describe("testCreateUser", function () {
            var deleteUserId = 17;
            var deletedUserData = null;
            var createdUserData = null;
            beforeEach(function (done) {
                service.dataAccess.deleteUser(deleteUserId, function (err, deletedResponse) {
                    deletedUserData = deletedResponse.data;
                      logger.debug("deleted User: " + deleteUserId + ", Response: " + deletedUserData);

                    service.dataAccess.createUser(createUserData, function (err, createResponse) {
                        createdUserData = createResponse.data;
                        logger.debug("created User: " + createdUserData);

                        done();
                    })

                });
            });
            it("should create the user on the server and response is equal to sent user", function () {
                expect(_.isEqual(createUserData, createdUserData)).toEqual(true);
            });
        })
        
        
     /* describe("testDeleteUser", function () {
            var deleteUserId = 17;
            var deleteErr = null;
            var deletedUserData = null;
            var createdUserData = null;
            beforeEach(function (done) {
                service.dataAccess.createUser(createUserData, function (err, createResponse) {
                    createdUserData = createResponse.data;
                    logger.debug("created User: " + createdUserData);

                    service.dataAccess.deleteUser(deleteUserId, function (err, deletedResponse) {
                        deletedUserData = deletedResponse.data;
                        deleteErr = err;
                        logger.debug("deleted User: " + deleteUserId + ", Err Response: " + deleteErr);
                        done();
                    })

                });
            });
            it("should delete the user on the server and response having no error", function () {
                expect(deleteErr).toEqual('');
            });
        })*/


    });
});

