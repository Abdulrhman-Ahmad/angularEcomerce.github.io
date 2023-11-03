const fs            = require ('fs')                        // this library used for reading a string text from an json file
const jwt           = require ('jsonwebtoken')              // this library used to create the JWT using .sign()
const jsonServer    = require ('json-server')               // this library used to open a localhost beside routing for an existing database in the json file
const crypto        = require ('crypto')                    // this library used to creat a secret key 64 hex 

// getting the secret key from json file  
const secretKey = JSON.parse(fs.readFileSync('secret_key.json', 'utf-8'));


// if we want to generate another key generating secret key 
const randomKey = crypto.randomBytes(64).toString('hex');


// Generating JWT Token                   
const token = jwt.sign({ userId: 123 }, secretKey, { expiresIn: '1h' });  // generating the token using payload / secret key / options   
const result= jwt.verify(token,secretKey)   // verifying the token throw an error if the token is tampered or not valid, or return the payload data and the time 




// creating a server in the local host as an api 
const server = jsonServer.create();                     // Creating a server 
const router = jsonServer.router('db.json')             // adding the router path for the db json file that holds the data
const middleWares = jsonServer.defaults();              // initializing the middlewares

server.use(middleWares)


// ---------------- [ Main Code ] ------------------

server.get('/login/:id', (r,s)=>{

    // lets get the params from the url
    const itemId = r.params.id;

    const users = router.db.get('users')
    const user = users.find(user=> user.id == itemId)
    const userId = user.get('id')
    const username = user.get('username')
   
    const token = jwt.sign({id: userId, user: username}, secretKey, {expiresIn:'1h'})

    s.json(token)
    

})

// server.get('/users', (r,s)=>{
//     const authHeader = r.header('Authorization')
//     console.log(authHeader)
//     const users = router.db.get('users')
//     s.json(authHeader)
// })


// -----------------------------------------------------


server.use('',router)                                   
server.listen(3000)                                     



