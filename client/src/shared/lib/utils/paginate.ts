interface PagePlaceholder {
  type: 'placeholder';
  id: string;
}

type Page = { type: 'page'; num: number } | PagePlaceholder;

export function paginate(currentPage: number, totalPages: number, range = 1) {
  const pages: Page[] = [];
  const left = currentPage - range;
  const right = currentPage + range;
  let placeholderNum = 1;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      pages.push({ type: 'page', num: i });
    } else if (pages[pages.length - 1].type !== 'placeholder') {
      pages.push({
        type: 'placeholder',
        id: `placeholder-${placeholderNum++}`,
      });
    }
  }

  return pages;
}
