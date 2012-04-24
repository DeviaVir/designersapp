// The main URL (subject to change)
var url = 'http://designers.sillevis.net/',
    parent = $( '.designers ul' )

$( window ).load( function() {
	// Show a beatiful full background
	$.backstretch( url + '/app/assets/img/bg.png' );
	
	// Only show everything when the JS has loaded
	$( 'body' ).css( 'visibility', 'visible' )

	setTimeout(
		function() {
			$( 'header' ).css( 'display', 'none' )
		}
	, 3100 )
	
	$( '#main .designers ul' ).css( 'width', '200px' )

	// Get all of the designers
	$.post( url + 'nl/ajax', function(response) {
		if( response.response ) {
			$.each( response.persons, function() {
				$( '#main .designers ul' ).css( 'width', ( $( '#main .designers ul ' ).outerWidth()+200 ) + 'px' )
				$( '<li />' )
					.attr( 'id', 'designer-' + this.id )
					.append(
						$( '<span />' )
							.addClass( 'hover' )
							.append(
								$( '<strong />' ).text( this.name )
							)
							.append(
								$( '<a />' )
									.attr({
										'href': this.url,
										'title': this.url_title,
										'target': '_blank'
									})
									.text( this.url )
							)
					)
					.append(
						$( '<a />' )
							.addClass( 'avatar' )
							.attr({
								'href': this.url,
								'title': this.name,
								'target': '_blank'
							})
							.append(
								$( '<img />' )
									.attr({
										'src': this.avatar
									})
							)
					)
					.append(
						$( '<span />' )
							.addClass( 'twitter' )
							.attr( 'data-user', this.twitter )
							.append(
								$( '<em />' )
							)
					)
					.append(
						$( '<span />' )
							.addClass( 'dribbble' )
							.attr( 'data-user', this.dribbble )
							.append(
								$( '<em />' )
							)
					)
					.appendTo( parent )
			})
		} else {
			alert( 'Something went wrong! Please try this app again later.' )
		}
	}, "json" ).complete( function() {
		// Run this after getting the designers
		$.each( $( '.designers ul li' ), function() {
			$( this ).children( '.twitter, .dribbble' ).bind( 'click', function() {
				var user = $( this ).attr( 'data-user' )
			
				if( $( this ).hasClass( 'twitter' ) )
					setTimeout( function() { window.open( 'https://twitter.com/intent/user?screen_name=' + user ) }, 500 )
					
				if( $( this ).hasClass( 'dribbble' ) )
					setTimeout( function() { window.open( 'http://dribbble.com/' + user ) }, 500 )
					
				if( $( this ).hasClass( 'enabled' ) ) {
					$( this ).removeClass( 'enabled' )
				} else {
					$( this ).addClass( 'enabled' )
				}
			})
		})
	})
})