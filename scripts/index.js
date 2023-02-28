let editProfileButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");
const page = document.querySelector(".page");

let formElement = document.querySelector(".popup__form_profile");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_bio");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__bio");

let popups = document.querySelectorAll(".popup");
let popupEdit = document.querySelector(".popup_edit");
let popupAdd = document.querySelector(".popup_add");

let photoAddForm = document.querySelector(".popup__form_add-photo");
const photoInput = document.querySelector(".popup__input_type_picture-name");
const linkInput = document.querySelector(".popup__input_type_link");

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

	const elementImage = elementCard.querySelector(".element__image");
	elementImage.addEventListener("click", openCard);

	const likeButton = elementCard.querySelector(".element__like-button");
	likeButton.addEventListener("click", setLike);

	const deleteButton = elementCard.querySelector(".element__delete-button");
	deleteButton.addEventListener("click", deleteCard);

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
photoAddForm.addEventListener("submit", () => {
	photoInput.value = "";
	linkInput.value = "";
});

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
	deleteButton.addEventListener("click", deleteCard);
});

let likeButtons = document.querySelectorAll(".element__like-button");
likeButtons.forEach(function (likeButton) {
	likeButton.addEventListener("click", setLike);
});

function setLike(likeEvt) {
	let likeTarget = likeEvt.target;
	likeTarget.classList.toggle("element__like-button_active");
}

function deleteCard(deleteEvt) {
	let deleteTarget = deleteEvt.target;
	const deleteCard = deleteTarget.closest(".element");
	deleteCard.remove();
}

let images = document.querySelectorAll(".element__image");
images.forEach(function (image) {
	image.addEventListener("click", openCard);
});

function openCard(cardEvt) {
	let imgOpen = cardEvt.target;

	const photoTemplate = document.querySelector("#photo-template");
	const popupCard = photoTemplate.content.cloneNode(true);
	const title = imgOpen.parentElement.querySelector(".element__title");

	popupCard.querySelector(".popup__photo").src = imgOpen.src;
	popupCard.querySelector(".popup__photo").alt = imgOpen.alt;
	popupCard.querySelector(".popup__description").textContent =
		title.textContent;

	const closeButton = popupCard.querySelector(".popup__close-button");
	closeButton.addEventListener("click", (buttonEvt) => {
		const closeTarget = buttonEvt.target;
		const photoCard = closeTarget.closest(".popup");
		photoCard.classList.remove("popup_opened");
	});
	page.append(popupCard);
}
