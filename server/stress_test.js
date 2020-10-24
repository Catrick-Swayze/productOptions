import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 250,
    duration: '600s',
};

export default function () {
  http.get('http://localhost:3002/products/8000');
  sleep(1);
}