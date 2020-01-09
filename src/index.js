let addToy = false
function main(){
  document.addEventListener("DOMContentLoaded", ()=>{
    const addBtn = document.querySelector('#new-toy-btn')
    const toyForm = document.querySelector('.container')
    addBtn.addEventListener('click', () => {
      // hide & seek with the form
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
      } else {
        toyForm.style.display = 'none'
      }
    })

    fetchToys();
  })
}

function fetchToys() {
  return fetch('http://localhost:3000/toys')
    .then( resp => resp.json())
    .then( json => addToys(json) )
}

function addToys(json) {
  const toyDiv = document.querySelector("div#toy-collection");
  const toys = json;

  console.log(toys);
}

main();