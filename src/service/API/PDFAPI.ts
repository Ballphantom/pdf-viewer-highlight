import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Rxios from '../../core/Rxios'; 
const rxios = new Rxios();

export const fetchPDFData = (): Observable<ArrayBuffer | null> => {
  const apiUrl = 'https://proxy.cors.sh/https://www.africau.edu/images/default/sample.pdf';
  const apiKey = 'temp_cb5213cc32d15c9a8ad8dcc8c2c1c9f3';

  return rxios.get<ArrayBuffer>(apiUrl, {
    headers: {
      'x-cors-api-key': apiKey,
    },
    responseType: 'arraybuffer',
  }).pipe(
    map((response) => response),
    catchError((error) => {
      throw `Error fetching PDF: ${error}`
    })
  );
};
