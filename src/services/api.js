const BASE_URL = 'https://pixabay.com';
const API_KEY = '21930090-2f4bfee534669e28d6350f360';

export default class ApiService {
  constructor() {
    this.query = '';
    this.pageNumber = 1;
    this.perPage = 12;
  }

  async fetchImages() {
    const response = await fetch(
      `${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.pageNumber}&per_page=${this.perPage}&key=${API_KEY}`,
    );
    const parsedResponse = await response.json();
    this.incrementPage();
    return parsedResponse;
  }
  incrementPage() {
    this.pageNumber += 1;
  }
  resetPage() {
    this.pageNumber = 1;
  }
}
