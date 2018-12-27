import { get } from 'lodash';

export default function (response) {
  const status = get(response, 'status');
  return status => 200 && status < 300;
}
