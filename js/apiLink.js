 $( document ).ready(function() {
    let endpoint = 'https://newsapi.org/v2/top-headlines?'
    let apiKey = 'b510c88a3e8b4ec7bf1def5804e60bf6'
    let country = 'country=us'

    $( ".container a" ).each(function( index, element ) {
  
      $.ajax({
          url: endpoint + country+ "?apiKey=" + apiKey + " &q=" + $( this ).text(),
          contentType: "application/json",
          dataType: 'json',
          success: function(result){
              console.log(result);
          }
      })
    });
  });