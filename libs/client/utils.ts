export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

export function imgFn(img: string, variants: string) {
  return `https://imagedelivery.net/eIv5P4hDW8zI1jHvbe5XNg/${img}/${variants}`;
}
