const editProfileButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const page = document.querySelector(".page");

const formElement = document.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_bio");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__bio");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");

const popupDescription = popupImage.querySelector(".popup__description");
const popupPhoto = popupImage.querySelector(".popup__photo");

const photoAddForm = document.querySelector(".popup__form_add-photo");
const photoInput = document.querySelector(".popup__input_type_picture-name");
const linkInput = document.querySelector(".popup__input_type_link");

const elementContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#element-template");

function handleFormSubmit(evt) {
	evt.preventDefault();

	const nameDefinition = nameInput.value;
	const jobDefinition = jobInput.value;

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
	const elementCard = cardTemplate.content.cloneNode(true);

	const photoDescription = photoInput.value;
	const photoLink = linkInput.value;

	if (
		photoLink.replaceAll(" ", "") != "" &&
		photoDescription.replaceAll(" ", "") != ""
	) {
		const doneCard = createCard(elementCard, photoLink, photoDescription);
		elementContainer.prepend(doneCard);
		closePopup();
		photoInput.value = "";
		linkInput.value = "";
	} else {
		photoInput.value = "";
		linkInput.value = "";
	}
}

function createCard(elementCard, linkCard, altCard) {
	elementCard.querySelector(".element__image").src = linkCard;
	elementCard.querySelector(".element__image").alt = altCard;
	elementCard.querySelector(".element__title").textContent = altCard;

	const elementImage = elementCard.querySelector(".element__image");
	elementImage.addEventListener("click", openCard);

	const likeButton = elementCard.querySelector(".element__like-button");
	likeButton.addEventListener("click", setLike);

	const deleteButton = elementCard.querySelector(".element__delete-button");
	deleteButton.addEventListener("click", deleteCard);

	return elementCard;
}

editProfileButton.addEventListener("click", function () {
	openPopup(popupEdit);
	nameInput.value = profileName.textContent;
	jobInput.value = profileDescription.textContent;
});
addButton.addEventListener("click", () => {
	openPopup(popupAdd);
});

function openPopup(popup) {
	popup.classList.add("popup_opened");
}

function closePopup() {
	popups.forEach(function (popup) {
		popup.classList.remove("popup_opened");
	});
}

const closeForms = document.querySelectorAll(".popup__close-button");
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
	const elementCard = cardTemplate.content.cloneNode(true);
	const cardLink = card.link;
	const cardName = card.name;

	const createdCard = createCard(elementCard, cardLink, cardName);
	elementContainer.prepend(createdCard);
});

function setLike(likeEvt) {
	const likeTarget = likeEvt.target;
	likeTarget.classList.toggle("element__like-button_active");
}

function deleteCard(deleteEvt) {
	const deleteTarget = deleteEvt.target;
	const deleteCard = deleteTarget.closest(".element");
	deleteCard.remove();
}

function openCard(cardEvt) {
	const imgOpen = cardEvt.target;
	const title = imgOpen.closest(".element").querySelector(".element__title");

	popupPhoto.src = imgOpen.src;
	popupPhoto.alt = imgOpen.alt;
	popupDescription.textContent = title.textContent;
	openPopup(popupImage);
}
