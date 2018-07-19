function utilLibrary() {
  this.debug = 1;

}

utilLibrary.prototype = {
  urlParam: function (param) {
    var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
      return null;
    }
    else {
      return decodeURI(results[1]) || 0;
    }
  },
  getLogger: function () {
    return {
      "debug": function (msg) {
        if (this.debug) console.log("DEBUG: " + msg);
      },
      "info": function (msg) {
        console.info("INFO: " + msg);
      },
      "error": function (msg) {
        console.error("ERROR: " + msg);
      },
      "warn": function (msg) {
        console.warn("WARNING: " + msg);
      }
    }
  },
  generatePagination: function (baseUrl, noOfRecords, pageNumber, recordsPerPage) {
    var totalNoOfPages = Math.ceil(noOfRecords / recordsPerPage);
    var currentPage = pageNumber;
    var segmentSize = 10;
    var currentSegment = Math.ceil(pageNumber / segmentSize);
    var startPage = ((currentSegment - 1) * 10) + 1;
    var lastPage = ((currentSegment - 1) * 10) + recordsPerPage;
    //var lastPage = startPage + 9;
    var beginPage = 1;
    var endPage = totalNoOfPages;
    if (lastPage > totalNoOfPages) {
      lastPage = totalNoOfPages;
    }
    console.log("Total no of pages: " + totalNoOfPages)
    if (pageNumber > totalNoOfPages) {
      pageNumber = 1;
    }
    console.log("pageNumber: " + pageNumber)
    console.log("lastPage: " + lastPage)

    var template = `
    <ul class="pagination justify-content-center">
                   
         <li class=" <%=(pageNumber == 1)? "page-item disabled" : " "%>"> <a class="page-link" href="<%= baseUrl %>pageNumber=<%=(pageNumber-1) %>" aria-label="Previous"> <span aria-hidden="true">prev</span> </a></li>
                        <% for (i = startPage; i <= lastPage; i++) {  %>
                                <li class=" <%= (pageNumber == i) ? "page-item active" : "" %>"><a class="page-link " href="<%= baseUrl %>pageNumber=<%= i %>"><%= i %></a></li>
                        <% } %>
                        <li class=" <%=(pageNumber== endPage)? "page-item disabled" : " "%>"><a class="page-link" aria-label="Next" href="<%= baseUrl %>pageNumber=<%= parseInt(pageNumber)+1 %>" <span aria-hidden="true">next</span> </a></ul>
                    `;
    var compiledTemplate = _.template(template);

    var input = {
      "startPage": startPage,
      "lastPage": lastPage,
      "baseUrl": baseUrl,
      "pageNumber": pageNumber,
      "endPage": endPage,
    }

    var output = {};

    output["startPage"] = startPage;
    output["lastPage"] = lastPage;
    output["endPage"] = endPage;
    output["pageNumber"] = pageNumber;
    output["currentSegment"] = currentSegment;
    output["content"] = compiledTemplate(input);

    return output;
  },
  getTemplate: function (pageName, callback) {
    $.ajaxSetup({ async: false });
    var url = "/templates/" + pageName + ".html"
    $.get(url, function (template) {
      // alert(template)
      callback("", template);
    });
  },
  generateNavigation: function (input, callback) {
    var compiledTemplate = null;
    this.getTemplate("navigation", function (err, template) {
      compiledTemplate = _.template(template);
      var content = compiledTemplate(input);
      callback("", content);
    });
  },
  generateBreadcrumb: function (input, callback) {

    var bc = {
      home: [
        { title: "Home", href: "/" }
      ],
      posts: [
        { title: "Home", href: "/index.html" },
        { title: "Posts", href: "/posts/listPosts.html" },
      ],
      albums: [
        { title: "Home", href: "/index.html" },
        { title: "Albums", href: "/albums/listAlbums.html" },
      ],
      users: [
        { title: "Home", href: "/index.html" },
        { title: "Users", href: "/user/usersList.html" },
      ]
    }
    var selectedBc = bc[input["pageName"]];
    selectedBc ? selectedBc : [];
    input.currentTitle ? selectedBc.push({ title: input.currentTitle }) : "";

    var compiledTemplate = null;
    this.getTemplate("breadcrumb", function (err, template) {
      compiledTemplate = _.template(template);
      var content = compiledTemplate({
        selectedBc: selectedBc
      });
      callback("", content);
    })
  },
  generatePage: function (pageInput, callback) {
    // alert(pageName)
    var that = this;
    var input = {
      "pageName": pageInput.pageName,
      "currentTitle": pageInput.breadcrumbTitle,
      "data": {
        albums: [],
        posts: [],
        todos: [],
        album: {}
      }
    }

    var output = {}

    var compiledTemplate = null;
    this.getTemplate("container", function (err, template) {
      compiledTemplate = _.template(template);
      that.generateNavigation(input, function (err, navigation) {
        output["navigation"] = navigation;
        that.generateBreadcrumb(input, function (err, breadcrumb) {
          output["breadcrumb"] = breadcrumb;
          output["content"] = "content";
          var data = compiledTemplate(output);
          callback("", data)

        })
      })
    })
  }
}