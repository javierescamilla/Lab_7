function showTcs(){

	fetch('/blog-posts')
		.then( response => {

			if ( response.ok ){
                return response.json();
			}
			throw new Error ( response.statusText );
		})
		.then( responseJSON => {
            $('#myTable').find('tbody')
                .append(`<tr> 
                            <th>${'UUID'}</th>
                            <th>${'Title'}</th>
                            <th>${'Content'}</th>
                            <th>${'Author'}</th>
                            <th>${'Publish date'}</th>
                        </tr>`)            
			for ( let i = 0; i < responseJSON.length; i ++ ){
                $('#myTable').find('tbody')
                    .append(`<tr> 
                                <th>${responseJSON[i].id}</th>
                                <th>${responseJSON[i].title}</th>
                                <th>${responseJSON[i].content}</th>
                                <th>${responseJSON[i].author}</th>
                                <th>${responseJSON[i].publishDate}</th>
                            </tr>`)
			}
		})
		.catch( err => {
			console.log( err );
		});
}

function post(opts) {
    fetch('/blog-posts', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(opts)
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        $("#myTable tr").remove();
        showTcs()
    });
}

function myDelete(deletedId){
    fetch('/blog-posts/' + deletedId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'delete',
    })
    .then( response => {
        if ( response.ok ){
            return response.json();
        }
        throw new Error ( response.statusText );
    })
    .then( responseJSON => {
        $("#myTable tr").remove();
        showTcs()
    })
}

function update(deletedId, form){
    fetch('/blog-posts/' + deletedId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify(form)
    })
    .then( response => {
        if ( response.ok ){
            return response.json();
        }
        throw new Error ( response.statusText );
    })
    .then( responseJSON => {
        $("#myTable tr").remove();
        showTcs()
    })
}

showTcs();
$("#Post_submit").on("click", function(e){
    console.log("Post")
    let form = {}
    form['title'] = $("#Post_title").val()
    form['content'] = $("#Post_content").val()
    form['author'] = $("#Post_author").val()
    form['publishDate'] = $("#Post_date").val()
    post(form)
    e.preventDefault()
})
$("#Delete_submit").on("click", function(e){
    deletedId = $("#Delete_Id").val()
    myDelete(deletedId)
    e.preventDefault()
})
$("#Update_submit").on("click", function(e){
    OldId = $("#Update_OldId").val()
    let form = {}
    form['id'] = $("#Update_NewId").val()
    form['title'] = $("#Update_title").val()
    form['content'] = $("#Update_content").val()
    form['author'] = $("#Update_author").val()
    form['publishDate'] = $("#Update_date").val()
    console.log(form)
    update(OldId,form)
    e.preventDefault()
})