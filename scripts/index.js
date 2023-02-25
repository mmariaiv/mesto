let editProfileButton = document.querySelector(".profile__edit-button");
let closeForm = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_bio");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__bio");

let photoInput = document.querySelector(".popup__input_type_picture-name");
let linkInput = document.querySelector(".popup__input_type_link");
let addButton = document.querySelector(".profile__add-button");

function openPopup() {
	popup.classList.add("popup_opened");
	nameInput.value = profileName.textContent;
	jobInput.value = profileDescription.textContent;
}

function closePopup() {
	popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
	evt.preventDefault();

	let nameDefinition = nameInput.value;
	let jobDefinition = jobInput.value;

	if (nameDefinition.replaceAll(" ", "") != "") {
		profileName.textContent = `${nameDefinition}`;
	}

	if (jobDefinition.replaceAll(" ", "") != "") {
		profileDescription.textContent = `${jobDefinition}`;
	}

	closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);
closeForm.addEventListener("click", closePopup);
editProfileButton.addEventListener("click", openPopup);
addButton.addEventListener("click", openPopup);
