let addToy = false

function main() {

    document.addEventListener("DOMContentLoaded", () => {
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

        getToys();
        addNewToyEventListener();

    })
}

function addNewToyEventListener() {
    const toyForm = document.querySelector('.add-toy-form')

    toyForm.addEventListener('submit', event => {
        event.preventDefault()

        const newToyData = {
            name: event.target.name.value,
            image: event.target.image.value,
            likes: 0
        }

        addNewToy(newToyData)
        toyForm.reset()

    })

}

function addNewToy(toyData) {

    const reqObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(toyData)
    }

    fetch('http://localhost:3000/toys', reqObj)
        .then(resp => resp.json())
        .then(renderToy(toyData))

}

function getToys() {

    fetch('http://localhost:3000/toys')
        .then(resp => resp.json())
        .then(toyData => renderToys(toyData))
}

function renderToys(toyData) {
    toyData.forEach(toy => {renderToy(toy)})
}

function renderToy(toy) {
    const toyDiv = document.querySelector('#toy-collection')

    const toyCard = document.createElement('div')
    toyCard.className = 'card'
    toyCard.id = toy.id

    const h2 = document.createElement('h2')
    h2.innerText = toy.name

    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'

    const p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`

    const button = document.createElement('button')
    button.innerText = 'Like <3'
    button.className = 'like-btn'

    toyCard.append(h2, img, p, button)

    toyDiv.append(toyCard)

}

main()