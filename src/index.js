let addToy = false;
const URL = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch(URL)
    .then((resp) => resp.json())
    .then((toyArray) => {
      toyArray.forEach((toy) => getToys(toy));
    });

    document.querySelector('form').addEventListener('submit', (event)=> {
        event.preventDefault();
        let inputObj = {}
        inputObj.name = event.target.name.value
        inputObj.image = event.target.image.value
        createToy(inputObj)
    })

});

function getToys(toyArray) {
  let div = document.getElementById("toy-collection");

  let h2 = document.createElement("h2");
  h2.innerText = toyArray.name;
  h2.id = 'head-2'

  let img = document.createElement("img");
  img.classList.add('toy-avatar')
  img.src = toyArray.image;

  let newP = document.createElement("p");
  newP.id = toyArray.id
  newP.innerText = toyArray.likes;


  let button = document.createElement("button");
  button.innerText = "like";
  addLikes(button, newP)

  let deleteButton = document.createElement('button')
  deleteButton.innerText = "x"
  removeToy(deleteButton, newP.id)
  let divButton = document.createElement('div')

  let newSpace = document.createTextNode( '\u00A0\u00A0\u00A0' ) 


  newP.appendChild(button);

  img.appendChild(newP);

  h2.appendChild(img);

  h2.appendChild(newP);

  div.append(h2);

  newP.appendChild(divButton)
  
  divButton.append(button, newSpace, deleteButton);
}


function createToy(toy) {
  let data = {}
  data.name = toy.name
  data.image = toy.image
  data.likes = 0

 fetch(URL, {
   method: 'POST',
   headers: {"Content-Type": "application/json"},
   body: JSON.stringify(data)
 })
}

function addLikes(button, pElement) {
  button.addEventListener('click', (event) => {
    //when button is clicked, increase likes by 1. 
  let currentLikes = document.getElementById(pElement.id)
  let pInnerText = currentLikes.childNodes[0]
  pInnerText.nodeValue = +pInnerText.nodeValue + 1
  console.log(currentLikes)
   let newData = {}
   newData.likes = pInnerText.nodeValue

  fetch(`${URL}/${pElement.id}`, {
     method: 'PATCH',
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify(newData)
   })
  })
}

function removeToy(deleteButton, id) {
  deleteButton.addEventListener('click', ()=> {
    fetch(`${URL}/${id}`, {
      method: "DELETE"
    }).then(document.getElementById(id).remove())
})
}



