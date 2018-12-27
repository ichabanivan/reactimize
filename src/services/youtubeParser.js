import { youtubeLink } from './validation';
// Image
import poster from '../assets/img/poster.jpg';

/**
 * @name youtubeParser
 * @param {String} url
 * @return {*} Youtube video id
 */
export default function youtubeParser(url) {
  if (!url) return false;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

/**
 * @name youtubePreview
 * @description Image for video
 * @param {String} url
 * @return {*} image
 */
export function youtubePreview(url) {
  return !youtubeLink(url) ? `https://img.youtube.com/vi/${youtubeParser(url)}/0.jpg` : poster;
}
