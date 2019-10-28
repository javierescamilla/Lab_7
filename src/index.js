let express = require("express");
let morgan = require("morgan");
let uuid = require("uuid4");
let bodyParser = require("body-parser");

let app = express();
let jsonParser = bodyParser.json();

let found = 0;

//Middleware
app.use( express.static( "public" ) );
app.use( morgan( "dev" ) );

let TestCases = [{
    id: uuid(),
    title: "TestCase_0",
    content: "Testing low voltages limits",
    author: "Javier Escamilla",
    publishDate: "24/10/2019"
},
{
    id: uuid(),
    title: "TestCase_1",
    content: "Testing high voltages limits",
    author: "Next-e",
    publishDate: "24/10/2019"
},
{
    id: uuid(),
    title: "TestCase_2",
    content: "Testing harmonics distortion",
    author: "Next-e",
    publishDate: "24/10/2019"
}
]

app.get( "/blog-posts", ( req, res) => {
    let author = req.query.author;

    // If no paramethers are given, return all TCs
    if(! author){
        return res.status(200).json( TestCases );
    }
    // If author field is empty
    if(author == ''){
        return res.status(406).json({
            message: "Author field is empty",
            status: 406
        })
    }
    // If paramether author is given
    else{
        // Search for the author and return all TCs made by the author
        for(let i = 0; i < TestCases.length; i++){
            if (author == TestCases[i].author){
                return res.status(200).json(TestCases[i])
                found = 1;
            }
        }
        // If there are not TCs asociated woth that author, return 404
        if(!found){
            res.statusMessage = "Author not found";
            return res.status(404).json({
                message: "Author not found",
                status: 404
            });
        }
    }
});

app.post( "/blog-posts", jsonParser, (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;
    let publishDate = req.body.publishDate;

    if(!title | !content | !author | !publishDate){
        res.statusMessage = "Missing field in body";
        return res.status(406).json({
            message: "Missing field in body",
            status: 406
        });
    }
    let newTc = {
        id: uuid(),
        title: title,
        content: content,
        author: author,
        publishDate: publishDate
    }
    TestCases.push(newTc);
	return res.status(201).json({
		message : "Test case added",
		status : 201,
	});
})

app.delete("/blog-posts/:id", (req, res) =>{
    let id = req.params.id;
    for(let i = 0; i < TestCases.length; i++){
        if(TestCases[i].id == id){
            TestCases.splice(i,1);
            //res.send(TestCases)
            return res.status(200).json({
                message: "Test case deleted",
                status: 200
            })
        }
    }
    return res.status(404).json({
        message: "UUID not found",
        status: 404  
    })
})

app.put("/blog-post/:id", jsonParser, (req, res) =>{
    let params = req.params;
    let idToUpdate = params.id;
    
    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;
    let publishDate = req.body.publishDate;
    
    if(!id){
        res.statusMessage = "Missing field in body";
        return res.status(406).json({
            message: "Missing field in body",
            status: 406
        });
    }
    if(id != idToUpdate){
        res.statusMessage = "Old Id and new Id doesnt match"
        return res.status(409).json({
            message: "Old Id and new Id doesnt match",
            status: 409            
        })
    }
    for(let i = 0; i < TestCases.length; i++){
        if(idToUpdate == TestCases[i].id){
            if(title){
                TestCases[i].title = title;
            }
            if(content){
                TestCases[i].content = content;
            }
            if(author){
                TestCases[i].author = author;
            }
            if(publishDate){
                TestCases[i].publishDate = publishDate;
            }
            found = 1;
        }
    }
    if(!found){
        res.statusMessage = "There are not TCs asociated to that Id";
        return res.status(404).json({
            message: "There are not TCs asociated to that Id",
            status: 404
        })
    }
})

app.listen( "8080", () => {
	console.log( "App is running on port 8080" );
});