const path = require('path')
const express = require('express');
const app = express();
const fs = require('fs'); //to use fs module. we need require fs

app.use(express.json()); // Convert blob data to JSON data
app.use(express.urlencoded({ extended: true })); // Convert URL-encoded data. This two lines are settings of parser for form
app.use(express.static(path.join(__dirname,"public"))); //its used to render image, css and others file from frontend. _dirname is the path of your project folder like "users\murad\desktop\project1". to use this path.join, we need a require like: const path=require('path') Now we need to create a public folder and inside the public folder we will create folder like images, javaScripts, stylesheets. Backend will try to find your static files from public folder.
app.set('view engine','ejs'); //view render the data from frontend. view show the rendered data using ejs

app.get("/", function(req, res) {
    fs.readdir(`./files`,function(err,files){ //to read files directory using fs: fs.readdir(path[, options], callback)
        res.render("index",{files: files}); //data will render from views folder. So we need to mention any file from views folder. Not essential to mention extension like index.ejs. but its optional. We want read files directory first. then we will render index.ejs. we can send files using files: while rendering index.ejs
    }) 
});

app.get("/profile/:username",function(req, res){  //to make it dynamic use "/Profile/:anything"
           //to get the username into function we can use req.params.variableName
    res.send(`Welcome ${req.params.username}`)
})

app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){console.error(err)})

    res.redirect('/') //after creating file the page will return to home page.
})

app.get('/file/:filename',function(req, res){
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err, filedata){
        res.render('show', {filename: req.params.filename, filedata: filedata});
    })
})
app.get('/edit/:filename',function(req, res){
    res.render('edit', {filename: req.params.filename})
})

app.post('/edit',function(req, res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`, function(err){
        res.redirect('/')
    })
    
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
