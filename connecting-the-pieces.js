  //------------------------rendering the noteList---------------------------------------------
  const renderNoteList = async (notes) => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
      noteList.forEach((el) => (el.innerHTML = ''));
    }
  
    let noteListItems = [];

    if (jsonNotes.length === 0) {
      noteListItems.push(createLi('No saved Notes', false));
    }
  
    jsonNotes.forEach((note) => {
      const li = createLi(note.title);
      li.dataset.note = JSON.stringify(note);
  
      noteListItems.push(li);
    });
  
    if (window.location.pathname === '/notes') {
      noteListItems.forEach((note) => noteList[0].append(note));
    }
  };
  const getAndRenderNotes = () => getNotes().then(renderNoteList);





  app.get("/api/db/:title", (req, res) => {
    const rQTitle = req.params.title.toLowerCase();
    const filter = dbData.filter((obj) => obj.title.toLowerCase() === rQTitle);
    if (filter.length !== 0) return res.json(filter);
  
    return res.json("No match found");
  });


//--------------------------------------------------------------GET-------------------------------------------

  //----------------------------------------Fetch-get (index.js)
  const getNotes = () =>
    fetch('/api/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
//----------------------------------------Get Request (server.js)
app.get('/api/reviews', (req, res) => {
  // Let the client know that their request was receive
  // Log our request to the terminal
  console.info(`${req.method} request received`);
});




//---------------------------------------------------------POST-----------------------------------------------------


//--------------------------------------Fetch-post (index.js)
const saveNote = (note) =>
fetch('/api/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },//content-type indicates the media type of the resource
  body: JSON.stringify(note),
});
  //-----------------------------------Post Request (server.js)

// POST request to add a review
    // Convert the data to a string so we can save it
    app.post('/notes', (req, res) => {
      // Log that a POST request was received
      console.info(`${req.method} request received to save a note`);
    
      // Destructuring assignment for the items in req.body
      const { title, text } = req.body;
      console.log(req.body)
    
      // If all the required properties are present
      if (title && text) {
        // Variable for the object we will save
        const newNote = {
          title,
          text,
          note_id: uuid(),
        };
        
        const noteStr = JSON.stringify(newNote)
        const file = fs.readFileSync('dbData')
        const json = JSON.parse(file.toString())
        //add json element to json object
        json.push(noteStr);
        fs.writeFileSync("/notes/db", JSON.stringify(json),(err) =>
        err
          ? console.error(err)
          : console.log(
              `Review for ${newNote.title} has been written to JSON file`
            ))
    
    
            const response = {
              status: 'success',
              body: newNote,
            };
            console.log(response);
            res.status(201).json(response);
          } else {
            res.status(500).json('Error in posting review');
          }
    })

//---------------------------------Fetch description:------------------------
fetch(resource)
//This defines the resource that you wish to fetch. This can either be:
// A string or any other object with a stringifier — including a URL object — that provides the URL of the resource you want to fetch.
// Or A Request object.
fetch(resource, options)
/*
An object containing any custom settings that you want to apply to the request. The possible options are:
-method
-headers
-body
-mode
-credentials
-omit
-same-origin
-include
------------------------
method: the request method, get or post
------------------------
Headers: Any headers you want to add to your request, contained within a Headers object or an object literal with String values.
A good use case for headers is checking whether the content type is correct before you process it further. For example:

*/
fetch(myRequest)
  .then((response) => {
     const contentType = response.headers.get('content-type');
     if (!contentType || !contentType.includes('application/json')) {
       throw new TypeError("Oops, we haven't got JSON!");
     }
     return response.json();
  })
  .then((data) => {
      /* process your data further */
  })
  .catch((error) => console.error(error));

/*





*/
// const myHeaders = new Headers();
// myHeaders.append('Content-Type', 'text/xml');
// myHeaders.get('Content-Type') // should return 'text/xml'

let myHeaders = new Headers({
    'Content-Type': 'text/xml'
});

// or, using an array of arrays:
myHeaders = new Headers([
    ['Content-Type', 'text/xml']
]);

myHeaders.get('Content-Type') // should return 'text/xml'
/*

Headers can be grouped according to their contexts:

Request headers contain more information about the resource to be fetched, or about the client requesting the resource.
Response headers hold additional information about the response, like its location or about the server providing it.
Representation headers contain information about the body of the resource, like its MIME type, or encoding/compression applied.
Payload headers contain representation-independent information about payload data, including content length and the encoding used for transport.





----------------------------------------------------------------Request.json()

The json() method of the Request interface reads the request body and returns it as a promise that resolves with the result of parsing the body text as JSON.

Return value
A Promise that resolves to a JavaScript object. This object could be anything that can be represented by JSON — an object, an array, a string, a number…
*/
const obj = {hello: 'world'};

const request = new Request('/myEndpoint', {
  method: 'POST',
  body: JSON.stringify(obj)
 });

request.json().then((data) => {
  // do something with the data sent in the request
});
/*
supplying request options:
*/

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });






/*

----------------------------------uploading to a json file
const data = { username: 'example' };

fetch('https://example.com/profile', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
-------------------------------
const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
  .then((response) => response.json())
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });





  ---------------------------------------------------------body-parser
  To go a little more in depth; body-parser gives you a middleware which uses nodejs/zlib to unzip the incoming request data if it's zipped and stream-utils/raw-body to await the full, raw contents of the request body before "parsing it" (this means that if you weren't going to use the request body, you just wasted some time).

After having the raw contents, body-parser will parse it using one of four strategies, depending on the specific middleware you decided to use:

bodyParser.raw(): Doesn't actually parse the body, but just exposes the buffered up contents from before in a Buffer on req.body.

bodyParser.text(): Reads the buffer as plain text and exposes the resulting string on req.body.

bodyParser.urlencoded(): Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) and exposes the resulting object (containing the keys and values) on req.body. For comparison; in PHP all of this is automatically done and exposed in $_POST.

bodyParser.json(): Parses the text as JSON and exposes the resulting object on req.body.

Only after setting the req.body to the desirable contents will it call the next middleware in the stack, which can then access the request data without having to think about how to unzip and parse it.
*/
