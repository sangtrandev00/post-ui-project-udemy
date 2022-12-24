import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { truncateTextlength } from './common';

dayjs.extend(relativeTime);

function createPostElement(post) {
  if (!post) return;

  // Find and clone teamplate
  const postTemplate = document.getElementById('postItemTemplate');
  if (!postTemplate) return;
  const liElement = postTemplate.content.firstElementChild.cloneNode(true);
  // console.log('liElement', liElement);
  if (!liElement) return;

  // Edit title, desc, author, thumnail

  const postIdElement = liElement.querySelector('[data-id="postId"]');
  console.log(postIdElement);
  if (postIdElement) postIdElement.setAttribute('data-uid', post.id);

  const titleElement = liElement.querySelector('[data-id="title"]');
  if (titleElement) titleElement.textContent = post.title;

  const descElement = liElement.querySelector('[data-id="description"]');
  if (descElement) descElement.textContent = truncateTextlength(post.description, 100);

  const authorElement = liElement.querySelector('[data-id="author"]');
  if (authorElement) authorElement.textContent = post.author;

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;
    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/468x60?text=NhatSang';
    });
  }
  // Calculate timestand
  dayjs(post.updatedAt).fromNow();
  // console.log('time spand', dayjs(post.updateAt).fromNow());
  const timeSpan = liElement.querySelector('[data-id="timeSpan"]');
  if (timeSpan) timeSpan.textContent = ' - ' + dayjs(post.updateAt).fromNow();

  return liElement;
}

export function renderPostList(elementId, postList) {
  //   console.log({ postList });
  if (!Array.isArray(postList)) return;
  const ulElement = document.getElementById(elementId);

  // Clear currentlist
  ulElement.textContent = '';

  postList.forEach((post, idx) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}
