import { API_URL } from '../utils/constants';
export async function getFontaines() {
  const response = await fetch(API_URL + '/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records?limit=20');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}