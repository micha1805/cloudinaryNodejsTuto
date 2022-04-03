console.log('Hello from the frontend!')
const picturesDiv = document.querySelector('#my-images')


const singleCard = (url="https://picsum.photos/300/600", title="NO TITLE") => `<div class="image-div"><p>${title}</p><img src="${url}" alt=""></div>`

const populateWithPictures = async () => {
	const response = await fetch('/picture/indexjson')
	const data = await response.json()
	console.log(data)
	data.pictures.forEach((picture) => {
		picturesDiv.insertAdjacentHTML("beforeend", singleCard(picture.url, picture.title))
	})
	console.log(pictures)
}


populateWithPictures()
