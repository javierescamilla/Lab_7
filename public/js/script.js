function init(){

	fetch('/blog-posts')
		.then( response => {

			if ( response.ok ){
                return response.json();
			}
			throw new Error ( response.statusText );
		})
		.then( responseJSON => {
            console.log("Ok");
			for ( let i = 0; i < responseJSON.length; i ++ ){
				$('#TCsList').append(`<li>
											${responseJSON[i].title}
										</li>`);
			}
		})
		.catch( err => {
			console.log( err );
		});

}

init();