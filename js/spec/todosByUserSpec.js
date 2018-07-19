$(document).ready(function () {
    var service = new serviceLayer();
    var logger = service.utils.getLogger();
    var dataTodo = {
        "userId": 10,
        "id": 511,
        "title": "delectus aut autem",
        "completed": false
    }
    describe("todosByUserTestSuite", function () {


        describe("testGetTodosByUser", function () {
            var userTodo = null;
            var pageNumber = 1;
            var pageLimit = 10;
            var userId = 1;
            beforeAll(function (done) {
                service.dataAccess.getTodosByUser(userId, pageNumber, pageLimit, function (err, response) {
                    userTodo = response.data;
                    done();
                });
            });

            it("should the id of the first todo is 1", function () {
                expect(userTodo[0].id).toEqual(1);
            });
        });
        describe("testCreateTodoByUser", function () {
            var createdTodo = {};
            beforeAll(function (done) {
                service.dataAccess.deleteTodosByUser(dataTodo.userId, dataTodo.id, function (err, response) {
                    service.dataAccess.createTodosByUser(dataTodo.userId, dataTodo, function (err, response) {
                        console.log("The created todo is: " + JSON.stringify(response));
                        createdTodo = response.data;
                        done();
                    })
                })
            });
            it("Should the created todo be equal to the dataTodo", function () {
                expect(createdTodo).toEqual(dataTodo);
            });
        });

        describe("testDeleteTodosByUser", function () {
            var todo = {};
            var deletederr = null;
            beforeAll(function (done) {
                service.dataAccess.createTodosByUser(dataTodo.userId, dataTodo, function (err, response) {
                          alert(response.data)
                    service.dataAccess.deleteTodosByUser(dataTodo.userId, dataTodo.id, function (err, response) {
                        alert("response delete" + JSON.stringify(response));
                        console.log("The deleted todo is: " + JSON.stringify(response.data));
                        todo = response.data;
                        //alert("todo data " + todo)
                        deletederr = err;
                        done();
                    })
                })
            });
            it("Should delete the todo on the server and responce having no error", function () {
                expect(deletederr).toEqual('');
            });
        })
    })
})

