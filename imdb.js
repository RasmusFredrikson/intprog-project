

$('#imdb').on("submit", function(e) {
  var form = $(this);
  e.preventDefault();
  $.ajax({
     url: "http://imdb.wemakesites.net/api/search?q=cage",
     data: form.serialize(), // assuming the form has a hidden input with api_key name, containing your API key
     crossDomain: true,
     data: {
      api_key: 'd314fc0b-41c9-467b-8370-718bf69b9922'
     },
     dataType: "jsonp",
     success: function(data) {
       window.console.log(data);
     }
  });
});