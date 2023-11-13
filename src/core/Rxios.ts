import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Observable } from "rxjs";

export type RxiosConfig = AxiosRequestConfig;

export type JSONValue =
  | string
  | number
  | boolean
  | undefined
  | { [x: string]: JSONValue }
  | Array<JSONValue>
  | ArrayBuffer
  | Blob
  | FormData

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export class Rxios {
  private httpClient: AxiosInstance;

  getHttpClient = () => {
    return this.httpClient;
  };

  constructor(options: AxiosRequestConfig = {}) {
    this.httpClient = axios.create(options);
  }

  /**
   * It takes an AxiosRequestConfig object, makes a request with it, and returns an Observable that
   * emits the response data
   * @param {AxiosRequestConfig} config - AxiosRequestConfig - This is the configuration object that
   * Axios uses to make the request.
   * @returns An observable that will emit the data from the response.
   */
  private observableRequest<T>(config: AxiosRequestConfig) {
    const request = this.httpClient.request<T>(config);

    return new Observable<T>((subscriber) => {
      request
        .then((response) => {
          subscriber.next(response.data);
        })
        .catch((err: Error) => {
          subscriber.error(err);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
  }

  /**
   * "This function returns an observable that emits the response data of a GET request."
   *
   * The first parameter is the URL of the request. The second parameter is an object that contains the
   * query parameters of the request. The third parameter is an object that contains the configuration
   * of the request
   * @param {string} url - The url to make the request to.
   * @param [params] - Record<string, string>
   * @param {AxiosRequestConfig} [config] - AxiosRequestConfig
   * @returns An observable of type T
   */
  public get<T>(url: string, params?: JSONValue | Blob | FormData | ArrayBuffer, config?: AxiosRequestConfig) {
    const request = { method: HttpMethod.GET, url, params, ...config };
    return this.observableRequest<T>(request);
  }

  /**
   * "This function makes a POST request to the given URL with the given payload and returns an
   * observable of the response."
   *
   * The first parameter is the URL to which we want to make the request. The second parameter is the
   * payload we want to send to the server. The third parameter is an optional AxiosRequestConfig
   * object
   * @param {string} url - The url to make the request to.
   * @param {JSONValue} payload - JSONValue
   * @param {AxiosRequestConfig} config - AxiosRequestConfig = {}
   * @returns An observable of type T
   */
  public post<T>(
    url: string,
    payload: JSONValue | Blob | FormData | ArrayBuffer,
    config: AxiosRequestConfig = {}
  ) {
    const request = {
      method: HttpMethod.POST,
      url,
      data: payload,
      ...config,
    };
    return this.observableRequest<T>(request);
  }

  /**
   * It takes a URL, a payload, and an optional AxiosRequestConfig, and returns an Observable of type T
   * @param {string} url - The url to make the request to.
   * @param payload - Record<string, string>
   * @param {AxiosRequestConfig} config - AxiosRequestConfig = {}
   * @returns An observable of type T
   */
  public put<T>(
    url: string,
    payload: JSONValue | Blob | FormData | ArrayBuffer,
    config: AxiosRequestConfig = {}
  ) {
    const request = {
      method: HttpMethod.PUT,
      url,
      data: payload,
      ...config,
    };
    return this.observableRequest<T>(request);
  }

  /**
   * This function makes a PATCH request to the given URL with the given payload and returns an
   * observable of the response data.
   * @param {string} url - The url to make the request to.
   * @param payload - Record<string, string>
   * @param {AxiosRequestConfig} config - AxiosRequestConfig = {}
   * @returns An observable of type T
   */
  public patch<T>(
    url: string,
    payload: Record<string, string> | Blob | FormData | JSONValue | ArrayBuffer,
    config: AxiosRequestConfig = {}
  ) {
    const request = {
      method: HttpMethod.PATCH,
      url,
      data: payload,
      ...config,
    };
    return this.observableRequest<T>(request);
  }

  /**
   * A function that takes in a url and a config object. It returns an observable request.
   * @param {string} url - The url to make the request to.
   * @param {AxiosRequestConfig} config - AxiosRequestConfig = {}
   * @returns An observable of type T
   */
  public delete<T>(url: string, config: AxiosRequestConfig = {}) {
    const request = {
      method: HttpMethod.DELETE,
      url,
      ...config,
    };
    return this.observableRequest<T>(request);
  }
}

export default Rxios;