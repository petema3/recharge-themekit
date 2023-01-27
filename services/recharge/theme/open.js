import open from 'open';

const openTheme = async (url) => {
  await open(url, {wait: true});
}

export default openTheme