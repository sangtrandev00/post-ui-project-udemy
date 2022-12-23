export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId);
  if (!pagination || !ulPagination) return;

  const { _page, _limit, _totalRows } = pagination;
  console.log(_page, _limit, _totalRows);
  // calc total pages
  const totalPages = Math.ceil(_totalRows / _limit);

  // Save page and totalPages to ulPagination
  ulPagination.dataset.page = _page;
  ulPagination.dataset.totalPages = totalPages;

  // Check if enable/disable pre/next links
  if (_page <= 1) {
    ulPagination.firstElementChild?.classList.add('disabled');
  } else {
    ulPagination.firstElementChild?.classList.remove('disabled');
  }

  if (_page >= totalPages) {
    ulPagination.lastElementChild?.classList.add('disabled');
  } else {
    ulPagination.lastElementChild?.classList.remove('disabled');
  }
}

export function handlePrevClick(e) {
  e.preventDefault();
  console.log('prev click');

  const ulPagination = document.getElementById('pagination');
  if (!ulPagination) return;
  const page = ulPagination.dataset.page;
  // const page = ulPagination.getAttribute("data-page");

  if (page <= 1) return;
  // page = e.current.target.parentElement("pagination").getAttibute("data-page")
  // newpage = page - 1;

  handleFilterChange('_page', page - 1);
}

export function handleNextClick(e) {
  e.preventDefault();
  const ulPagination = document.getElementById('pagination');
  const page = Number.parseInt(ulPagination.dataset.page) || 0;
  // const page =  ulPagination.getAttribute('data-page');
  const totalPages = ulPagination.dataset.totalPages;
  if (page >= totalPages) {
    return;
  }
  handleFilterChange('_page', page + 1);
}

export function initPagination({ elementId, defaultParams, onChange }) {
  // bind click event for pre/next button
  const ulPagination = document.getElementById(elementId);
  console.log(ulPagination);
  if (!ulPagination) return;

  //   Set current active page
  //   Todo: use default params

  // add click event for prev link

  const prevLink = ulPagination.firstElementChild.firstElementChild;
  if (prevLink) {
    prevLink.addEventListener('click', (e) => {
      e.preventDefault();

      if (!ulPagination) return;
      const page = ulPagination.dataset.page;
      // const page = ulPagination.getAttribute("data-page");

      if (page <= 1) return;
      // page = e.current.target.parentElement("pagination").getAttibute("data-page")
      // newpage = page - 1;

      onChange?.(page - 1);
    });
  }
  const nextLink = ulPagination.lastElementChild?.firstElementChild;
  if (nextLink) {
    nextLink.addEventListener('click', (e) => {
      e.preventDefault();
      const page = Number.parseInt(ulPagination.dataset.page) || 0;
      // const page =  ulPagination.getAttribute('data-page');
      const totalPages = ulPagination.dataset.totalPages;
      if (page >= totalPages) {
        return;
      }
      onChange?.(page + 1);
    });
  }
}
