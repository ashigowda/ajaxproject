function dataAccess() {
    this.ajax = new ajaxLibrary();
    this.baseUrl = "http://data.dev.stralenhoop.com"
    this.mappings = [];
}

dataAccess.prototype = {

    // PUBLIC functionalities

    // POST section
    getPosts: function (pageNumber, pageLimit, callback) {
        var url = this.baseUrl + "/posts?_page=" + pageNumber + "&_limit=" + pageLimit + "&_embed=comments";
        this.ajax.get(url, {}, callback);
    },
    getPost: function (postId, callback) {
        var url = this.baseUrl + "/posts/" + postId;
        this.ajax.get(url, {}, callback);
    },
    // ALBUM section
    getAlbums: function (pageNumber, pageLimit, callback) {
        var url = this.baseUrl + "/albums?_page=" + pageNumber + "&_limit=" + pageLimit + "&_embed=photos";
        this.ajax.get(url, {}, callback);
    },
    getAlbum: function (albumId, callback) {
        var url = this.baseUrl + "/albums/" + albumId;
        //   alert(url)
        this.ajax.get(url, {}, callback);
    },

    //Private functionalities
    //USER section
    getUsers: function (pageNumber, pageLimit, callback) {
        var url = this.baseUrl + "/users?_page=" + pageNumber + "&_limit=" + pageLimit + "&_embed=posts&_embed=albums&_embed=todos";
        this.ajax.get(url, {}, callback);
    },
    getUser: function (userId, callback) {
        var url = this.baseUrl + "/users?id=" + userId + "&_embed=posts&_embed=albums&_embed=todos";
        alert(url)
        this.ajax.get(url, {}, callback);
    },
    updateUser: function (userId,userData, callback) {
        var url = this.baseUrl + "/users/" + userId ;
          alert(url)
        this.ajax.put(url, userData, callback);
    },
    deleteUser: function (userId, callback) {
        var url = this.baseUrl + "/users/" + userId;
        this.ajax.delete(url, {}, callback);
    },
    createUser: function (data, callback) {
        var url = this.baseUrl + "/users"
      
        this.ajax.post(url, data, callback);
    },

    //POST By User Section
    getPostsByUser: function (pageNumber, pageLimit, callback) {

        var url = this.baseUrl + "/posts?_page=" + pageNumber + "&_limit=" + pageLimit + "&_embed=comments";
        this.ajax.get(url, {}, callback);
    },
    getPostByUser: function (postId, callback) {

        var url = this.baseUrl +  "/posts?id=" + postId;
        this.ajax.get(url, {}, callback);
    },
    updatePostByUser: function (updatePostId, updateData, callback) {
        var url = this.baseUrl + "/posts/" + updatePostId
        alert(url)
        this.ajax.put(url, updateData, callback);
    },
    createPostByUser: function (data, callback) {
        var url = this.baseUrl + "/posts";
        this.ajax.post(url, data, callback);
    },
    deletePostByUser: function (postId, callback) {
        var url = this.baseUrl + "/posts/" + postId;
        this.ajax.delete(url, {}, callback);
    },

    //Album By User Section
    getAlbumsByUser: function (pageNumber, pageLimit, callback) {
        var url = this.baseUrl + "/albums?_page=" + pageNumber + "&_limit=" + pageLimit + "&_embed=photos";
        this.ajax.get(url, {}, callback);
    },
    getAlbumByUser: function (albumId, callback) {
        var url = this.baseUrl + "/albums?id=" + albumId;
        this.ajax.get(url, {}, callback);
    },
    updateAlbumByUser: function (albumId, updateData, callback) {
        var url = this.baseUrl + "/albums/" + albumId;
        this.ajax.put(url, updateData, callback);
    },
    createAlbumByUser: function (data, callback) {
        var url = this.baseUrl + "/albums";
        this.ajax.post(url, data, callback);
    },
    deleteAlbumByUser: function (albumId, callback) {
        var url = this.baseUrl + "/albums/" + albumId;
        this.ajax.delete(url, {}, callback);
    },

    //Todo By User Section
    getTodosByUser: function (pageNumber, pageLimit, callback) {
        var url = this.baseUrl + "/todos?_page=" + pageNumber + "&_limit=" + pageLimit;

        this.ajax.get(url, {}, callback);
    },

    updateTodosbyUser: function (todoId, updateData, callback) {
        var url = this.baseUrl + "/todos/" + todoId;
        this.ajax.put(url, updateData, callback);
    },
    createTodosByUser: function (userId, data, callback) {
        var url = this.baseUrl + "/todos";
        this.ajax.post(url, data, callback);
    },
    deleteTodosByUser: function (userId, todosId, callback) {
        var url = this.baseUrl + "/todos/" + todosId;
        this.ajax.delete(url, {}, callback);
    },

    // Comment By Post section
    createCommentByPost: function (postId, data, callback) {
        var url = this.baseUrl + "/comments";
        this.ajax.post(url, data, callback);
    },
    getCommentsByPost: function (postId, pageNumber, pageLimit, callback) {
        var url = this.baseUrl + "/posts/" + postId + "/comments?_page=" + pageNumber + "&_limit=" + pageLimit;
        this.ajax.get(url, {}, callback);
    },
    getCommentByPost: function (postId, commentId, callback) {
        var url = this.baseUrl + "/posts/" + postId + "/comments?id=" + commentId;
        this.ajax.get(url, {}, callback);
    },
    updateCommentByPost: function (postId, commentId, userData, callback) {
        var url = this.baseUrl + "/comments/" + commentId;
        this.ajax.put(url, userData, callback);
    },
    deleteCommentByPost: function (postId, commentId, callback) {
        var url = this.baseUrl + "/comments/" + commentId;
        this.ajax.delete(url, {}, callback);
    },

    //Photo By Album
    getPhotosByAlbum: function (albumId, pageNumber, pageLimit, callback) {
        var url = this.baseUrl + "/albums/" + albumId + "/photos?_page=" + pageNumber + "&_limit=" + pageLimit + "&_embed=photos";
        this.ajax.get(url, {}, callback);
    },
    getPhotoByAlbum: function (photoId, callback) {
        var url = this.baseUrl +  "/photos?id=" + photoId + "&_embed=photos";
        this.ajax.get(url, {}, callback);
    },
    createPhotoByAlbum: function (data, callback) {
        var url = this.baseUrl + "/photos";
        this.ajax.post(url, data, callback);
    },
    updatePhotoByAlbum: function (albumId, photoId, userData, callback) {
        var url = this.baseUrl + "/photos/" + photoId;
        this.ajax.put(url, userData, callback);
    },

    deletePhotoByAlbum: function (albumId, photoId, callback) {
        var url = this.baseUrl + "/photos/" + photoId;
        this.ajax.delete(url, {}, callback);
    },
  
}
