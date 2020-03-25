$.get( "api/fun/data?arg=0", function( data ) {
    alert( data );
    $.get( "api/fun/data?arg=1", function( data ) {
        alert( data );
      });
  });