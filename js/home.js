import postApi from './api/postApi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { initPagination, initSearch, renderPostList, renderPagination } from './utils';

dayjs.extend(relativeTime);

async function handleFilterChange(filterName, filterValue) {
  // update query params
  try {
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);

    // Reset page = 1 if filter name = title like;

    if (filterName === 'title_like') {
      url.searchParams.set('_page', 1);
    }

    history.pushState({}, '', url);

    // fetch API

    // re-render post list

    const { data, pagination } = await postApi.getAll(url.searchParams);
    renderPostList('postsList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log('failed to fetch postlist pagination', error);
  }
}

(async () => {
  try {
    const url = new URL(window.location);

    // update search params if needed
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

    // url.searchParams.set(filiterName, filterValue);
    const queryParams = url.searchParams;
    history.pushState({}, '', url);

    // attach click event for links
    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page),
    });

    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    });

    // set default pagination (_page, _limit) on URL

    // render post list based URL params
    // const queryParams = new URLSearchParams(window.location.search);
    const { data, pagination } = await postApi.getAll(queryParams);
    renderPostList('postsList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log('error', error.response);
  }
})();
