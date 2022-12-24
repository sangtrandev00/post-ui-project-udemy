function showModal(modalElement) {
  // make sure bootstrap script is loaded
  if (!window.bootstrap) return;

  const modal = new window.bootstrap.Modal(modalElement);

  if (modal) modal.show();
}

export function registerLightbox({ modalId, imageSelector, prevSelector, nextSelector }) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) return;

  if (modalElement.dataset.registered) return;

  // selectors

  const imageElement = modalElement.querySelector(imageSelector);
  const prevButton = modalElement.querySelector(prevSelector);
  const nextButton = modalElement.querySelector(nextSelector);

  if (!imageElement || !prevButton || !nextButton) return;

  let imgList = [];
  let currentIndex = 0;

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src;
  }

  document.addEventListener('click', (event) => {
    const { target } = event;

    if (target.tagName !== 'IMG' || !target.dataset.album) return;

    // img with data-album
    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`);
    currentIndex = [...imgList].findIndex((x) => x === target);
    console.log('album image click', { target, imgList, currentIndex });

    showImageAtIndex(currentIndex);
    showModal(modalElement);
  });

  prevButton.addEventListener('click', () => {
    // Show prev image of current album

    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
    showImageAtIndex(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    // Show next image of current album

    currentIndex = (currentIndex + 1) % imgList.length;
    showImageAtIndex(currentIndex);
  });

  // Mark this modal is already registered
  modalElement.dataset.registered = 'true';
}
