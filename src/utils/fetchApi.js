async function fetchSearch(url, changeSearch) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    changeSearch(data);
  } catch (error) {
    console.log(error);
  }
}

export { fetchSearch };
