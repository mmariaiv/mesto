let editProfileButton = document.querySelector(".profile__edit-button");
let closeForm = document.querySelector(".popup__close-button");
let submitForm = document.querySelector(".popup__submit-button");
let formElement = document.querySelector(".popup");
let nameInput = document.querySelector(".popup__name-input");
let jobInput = document.querySelector(".popup__description-input");

function openPopup() {
	formElement.classList.add("popup_opened");
}

function closePopup() {
	formElement.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
	evt.preventDefault();
	let nameDefinition = nameInput.value;
	let jobDefinition = jobInput.value;
	let profileName = document.querySelector(".profile__name");
	let profileDescription = document.querySelector(".profile__bio");

	if (nameDefinition.replaceAll(" ", "") != "") {
		profileName.textContent = `${nameDefinition}`;
		nameInput.setAttribute("placeholder", `${nameDefinition}`);
	}

	if (jobDefinition.replaceAll(" ", "") != "") {
		profileDescription.textContent = `${jobDefinition}`;
		jobInput.setAttribute("placeholder", `${jobDefinition}`);
	}

	nameInput.value = "";
	jobInput.value = "";
}

formElement.addEventListener("submit", handleFormSubmit);
submitForm.addEventListener("click", closePopup);
closeForm.addEventListener("click", closePopup);
editProfileButton.addEventListener("click", openPopup);

let likeButtons = document.querySelectorAll(".element__like-button");
function setLike(likeButton) {
	likeButton = likeButton.target;
	if (likeButton.classList.contains("element__like-button_disabled")) {
		likeButton.classList.remove("element__like-button_disabled");
		likeButton.classList.add("element__like-button_active");
	} else {
		likeButton.classList.remove("element__like-button_active");
		likeButton.classList.add("element__like-button_disabled");
	}
}

likeButtons.forEach((likeButton) => {
	likeButton.addEventListener("click", setLike);
});
