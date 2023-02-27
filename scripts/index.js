let editProfileButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");

let formElement = document.querySelector(".popup__form_profile");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_bio");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__bio");

let popups = document.querySelectorAll(".popup");
let popupEdit = document.querySelector(".popup_edit");
let popupAdd = document.querySelector(".popup_add");

let photoAddForm = document.querySelector(".popup__form_add-photo");
let photoInput = document.querySelector(".popup__input_type_picture-name");
let linkInput = document.querySelector(".popup__input_type_link");

const elementContainer = document.querySelector(".elements");

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

function addPhotoFormSubmit(evt) {
	evt.preventDefault();

	let photoDescription = photoInput.value;
	let photoLink = linkInput.value;
	const cardTemplate = document.querySelector("#element-template");
	const elementCard = cardTemplate.content.cloneNode(true);

	elementCard.querySelector(".element__image").src = photoLink;
	elementCard.querySelector(".element__image").alt = photoDescription;
	elementCard.querySelector(".element__title").textContent = photoDescription;

	const likeButton = elementCard.querySelector(".element__like-button");
	likeButton.addEventListener("click", function (likeButtonEvt) {
		let likeTarget = likeButtonEvt.target;
		likeTarget.classList.toggle("element__like-button_active");
	});

	const deleteButton = elementCard.querySelector(".element__delete-button");
	deleteButton.addEventListener("click", function (deleteEvt) {
		const deleteTarget = deleteEvt.target;
		const deleteCard = deleteTarget.closest(".element");
		deleteCard.remove();
	});

	elementContainer.prepend(elementCard);

	closePopup();
}

editProfileButton.addEventListener("click", function () {
	popupEdit.classList.add("popup_opened");
	nameInput.value = profileName.textContent;
	jobInput.value = profileDescription.textContent;
});
addButton.addEventListener("click", function () {
	popupAdd.classList.add("popup_opened");
});

function closePopup() {
	popups.forEach(function (popup) {
		popup.classList.remove("popup_opened");
	});
}

let closeForms = document.querySelectorAll(".popup__close-button");
closeForms.forEach(function (closeForm) {
	closeForm.addEventListener("click", closePopup);
});

formElement.addEventListener("submit", handleFormSubmit);
photoAddForm.addEventListener("submit", addPhotoFormSubmit);

const initialCards = [
	{
		name: "Архыз",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
		name: "Челябинская область",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
		name: "Иваново",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
		name: "Камчатка",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
		name: "Холмогорский район",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		name: "Байкал",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
];

initialCards.forEach(function (card) {
	const cardTemplate = document.querySelector("#element-template");
	const elementCard = cardTemplate.content.cloneNode(true);

	elementCard.querySelector(".element__image").src = card.link;
	elementCard.querySelector(".element__image").alt = card.name;
	elementCard.querySelector(".element__title").textContent = card.name;

	elementContainer.prepend(elementCard);
});

const deleteButtons = document.querySelectorAll(".element__delete-button");
deleteButtons.forEach(function (deleteButton) {
	deleteButton.addEventListener("click", function (evt) {
		let deleteTarget = evt.target;

		const deleteCard = deleteTarget.closest(".element");
		deleteCard.remove();
	});
});

let likeButtons = document.querySelectorAll(".element__like-button");
likeButtons.forEach(function (likeButton) {
	likeButton.addEventListener("click", function (evt) {
		let likeTarget = evt.target;

		likeTarget.classList.toggle("element__like-button_active");
	});
});
