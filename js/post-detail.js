import postApi from './api/postApi';
import dayjs from 'dayjs';
import { registerLightbox } from './utils';
// dayjs.extend(relativeTime);
async function renderPostDetail() {
  //   console.log(window.location.search);
  const url = new URL(window.location);
  //   console.log(url.searchParams);
  const postId = url.searchParams.get('id');
  const postItem = await postApi.getById(postId);
  console.log('postItem', postItem);
  const postHtml = `
  <div id="postDetail" data-uid="${postId}" >
  <div class="ratio radio-16x9">
  <section id="postHeroImage" class="hero" style="background-image: url(${
    postItem.imageUrl
  }); max-width: 1200px; max-height: 400px" ></section>
  </div>
    <section class="post-detail" >
            <div class="container">
                <div class="post-detail-main shadow-sm">
                    <div class="post-title-wrapper">
                        <h1 id="postDetailTitle">&nbsp; ${postItem.title}</h1>

                        <p>
                            <small class="text-muted">by</small>
                            <small id="postDetailAuthor" class="text-muted font-weight-bold">
                                &nbsp;
                                ${postItem.author}
                            </small>
                            <small id="postDetailTimeSpan" class="text-muted">&nbsp; - ${dayjs(
                              postItem.updatedAt
                            ).format('DD/MM/YYYY HH:mm')}</small>
                        </p>
                    </div>

                    <div class="post-content-wrapper">
                        <p id="postDetailDescription">
                            ${postItem.description}
                        </p>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                            totam pariatur quibusdam tenetur nemo tempora incidunt ex
                            doloremque exercitationem dicta. Corporis fuga totam nulla
                            voluptatibus possimus similique aliquid nobis illo.
                        </p>

                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Adipisci suscipit inventore hic tenetur, dolor iusto dolorum
                            rem, non error, saepe quia dignissimos quas ducimus aliquid.
                            Praesentium ea aspernatur vero deserunt.
                        </p>

                        <div class="ratio ratio-16x9">
                            <img class="post-image" data-album="sangtrandev" src="https://picsum.photos/id/124/1368/800" alt="Picsum photos" />
                        </div>


                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Adipisci suscipit inventore hic tenetur, dolor iusto dolorum
                            rem, non error, saepe quia dignissimos quas ducimus aliquid.
                            Praesentium ea aspernatur vero deserunt.
                        </p>

                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Adipisci suscipit inventore hic tenetur, dolor iusto dolorum
                            rem, non error, saepe quia dignissimos quas ducimus aliquid.
                            Praesentium ea aspernatur vero deserunt.
                        </p>

                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Adipisci suscipit inventore hic tenetur, dolor iusto dolorum
                            rem, non error, saepe quia dignissimos quas ducimus aliquid.
                            Praesentium ea aspernatur vero deserunt.
                        </p>
                        <div class="ratio ratio-16x9">
                            <img class="post-image" data-album="sangtrandev" src="https://picsum.photos/id/123/1368/1000" alt="Picsum photos" />
                        </div>

                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Adipisci suscipit inventore hic tenetur, dolor iusto dolorum
                            rem, non error, saepe quia dignissimos quas ducimus aliquid.
                            Praesentium ea aspernatur vero deserunt.
                        </p>
                        <div class="ratio ratio-16x9">
                            <img class="post-image" data-album="sangtrandev" src="https://picsum.photos/id/125/1368/800" alt="Picsum photos" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
        </div>
    `;

  //   console.log(document.querySelector('main'));

  document.querySelector('main').innerHTML = postHtml;

  // Render edit page link

  const editPageLink = document.getElementById('goToEditPageLink');
  editPageLink.setAttribute('href', `./add-edit-post.html?id=${postItem.id}`);
}

(() => {
  registerLightbox({
    modalId: 'lightbox',
    imageSelector: 'img[data-id="lightboxImg"]',
    prevSelector: 'button[data-id="lightboxPrev"]',
    nextSelector: 'button[data-id="lightboxNext"]',
  });

  renderPostDetail();
})();
