/*
Make fetch requests in the browser for each of the following tasks.
Paste your code for fetch requests here once you finish each task.
*/

/* =============================== Phase 1 ================================ */
/*
  Make a request with fetch request to GET /posts and print the response
  components to the console.
*/

// Your code here
async function sendRequest(){
  const response = await fetch('/posts')
  const data = response.json()
  console.log(data)
}



/* =============================== Phase 2 ================================ */
/*
  Make a request with fetch request to POST /posts and print the response
  components to the console.
*/

// Your code here

async function sendRequest(){
  const url = '/posts'


  const options ={
    method : 'POST',
    headers : {'Content-Type': 'application/json'},
    body: JSON.stringify({
      message: "New Post!"
    })
  }

  const response = await fetch(url, options)

  console.log(await response.json())
}
