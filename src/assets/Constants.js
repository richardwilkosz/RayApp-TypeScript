const API_KEY = 'c273df1bacfdd9e48630cddba6ef4d18';
const API_READ_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjczZGYxYmFjZmRkOWU0ODYzMGNkZGJhNmVmNGQxOCIsInN1YiI6IjVkZmVmOGE4ZDFhODkzMDAxNDg4ZDM4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H24nFPugF0ekSvcffQhqxsVdViSOMyAwceOW0aaTzDs";
const SEARCH_QUERY = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=';
const IMAGE_QUERY = 'https://image.tmdb.org/t/p/w500';
const OWNED_LIST_QUERY = 'https://api.themoviedb.org/3/list/7072653?api_key=' + API_KEY;
const DETAILS_QUERY = 'https://api.themoviedb.org/3/movie/';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w500';
const GENRES_QUERY = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY + '&language=en-US';

const SEARCH_ALL = '*';

const SORT_ALPHA = 0;
const SORT_SHORT = 1;
const SORT_LONG = 2;
const SORT_NEW = 3;
const SORT_OLD = 4;
const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const FILTER_DEFAULT = 0;

export default {
    API_KEY: API_KEY,
    API_READ_ACCESS_TOKEN: API_READ_ACCESS_TOKEN,
    SEARCH_QUERY: SEARCH_QUERY,
    IMAGE_QUERY: IMAGE_QUERY,
    OWNED_LIST_QUERY: OWNED_LIST_QUERY,
    DETAILS_QUERY: function (id) { return DETAILS_QUERY.concat(id).concat('?api_key=').concat(API_KEY); },
    BACKDROP_PATH: BACKDROP_PATH,
    GENRES_QUERY: GENRES_QUERY,

    SEARCH_ALL: SEARCH_ALL,

    SORT_ALPHA: SORT_ALPHA,
    SORT_SHORT: SORT_SHORT,
    SORT_LONG: SORT_LONG,
    SORT_NEW: SORT_NEW,
    SORT_OLD: SORT_OLD,
    SORT_ASC: SORT_ASC,
    SORT_DESC: SORT_DESC,

    FILTER_DEFAULT: FILTER_DEFAULT,
}