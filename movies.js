const https = require('https');
const axios = require('axios');

async function getMovieTitles(substr) {
  const BASE_URL = 'https://jsonmock.hackerrank.com/api/movies/search/?Title=';
  const TITLE_URL = BASE_URL + substr;
  const movies = [];

  function getPageData(pageNumber) {
    const PAGE_URL = TITLE_URL + `&page=${pageNumber}`;
    return axios.get(PAGE_URL).then((res) => res.data);
  }

  function getTotalPages() {
    return axios.get(TITLE_URL).then((res) => res.data.total_pages);
  }

  function getTitles() {
    const titles = [];
    movies.map((e) => {
      titles.push(e.Title);
    });
    return titles;
  }

  const total_pages = await getTotalPages();

  for (let i = 1; i <= total_pages; i++) {
    const data = await getPageData(i);
    movies.push(...data.data);
  }
  const titleArray = getTitles(movies);
  console.log(titleArray.sort());
}

const result = getMovieTitles('harry potter');
console.log(result);
