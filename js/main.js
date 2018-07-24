
(function() {

  const $h1 = $('<h1></h1>');

  pagination.init(".page", 10)
            .new("ul.student-list");

  search.init(".page-header", "student-search", "Search for students")
        .new("ul.student-list", (results, text) => {

          if(!results.length) {
            $h1.text(`No results when searching for "${text}".`)
            $('.page').append($h1);
          }
          else {
            $h1.remove();
          }

          pagination.new(results);

        });
        
})();
