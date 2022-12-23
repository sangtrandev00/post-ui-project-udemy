import debounce from 'lodash.debounce';

export function initSearch({ elementId, defaultParams, onChange }) {
  const searchInput = document.getElementById(elementId);
  if (!searchInput) return;

  if (defaultParams && defaultParams.get('title_like')) {
    searchInput.value = queryParams.get('title_like');
  }

  const debounceSearch = debounce((event) => onChange?.(event.target.value), 500);

  // set default values from query params, title_like = aut
  searchInput.addEventListener('input', debounceSearch);
}
