import { mainAxios } from "./http";

const http = mainAxios();
const url = "/example";

// 어쩌구 함수
async function getExample(params: {
  test1: string;
  test2: number;
  test3: number;
}) {
  const response = await http.get(url + "/example", { params });
  return response.data;
}

export { getExample };

// react-query

import { useQuery } from "react-query";

export function getQuery() {
  const test1 = () => {
    const { data, isLoading, status, error, isFetching } = useQuery(
      "고유키",
      async () => {
        return await http.get("https://jsonplaceholder.typicode.com/todos/1");
      }
    );
    console.log(data, isLoading, status, error, isFetching);
    // undefined true 'loading' null true
    // {data: {…}, status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}config: {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}adapter: (2) ['xhr', 'http']baseURL: "http://jongbum.site/api/"data: undefinedenv: {FormData: ƒ, Blob: ƒ}headers: AxiosHeaders {Accept: 'application/json, text/plain, */*', Content-Type: null}maxBodyLength: -1maxContentLength: -1method: "get"timeout: 0transformRequest: [ƒ]transformResponse: [ƒ]transitional: {silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false}url: "https://jsonplaceholder.typicode.com/todos/1"validateStatus: ƒ validateStatus(status)withCredentials: truexsrfCookieName: "XSRF-TOKEN"xsrfHeaderName: "X-XSRF-TOKEN"[[Prototype]]: Objectdata: {userId: 1, id: 1, title: 'delectus aut autem', completed: false}completed: falseid: 1title: "delectus aut autem"userId: 1[[Prototype]]: Objectheaders: AxiosHeaders {cache-control: 'max-age=43200', content-type: 'application/json; charset=utf-8', expires: '-1', pragma: 'no-cache'}request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}status: 200statusText: ""[[Prototype]]: Object false 'success' null false
  };

  const option = () => {
    const { data, isLoading, status, error, isFetching } = useQuery(
      "고유키",
      async () => {
        return await http.get("https://jsonplaceholder.typicode.com/todos/1");
      },
      {
        // enabled : 쿼리가 자동 실행되지 않도록 하는 옵션
        // retry (boolean | number | (failureCount: number, error: TError) => boolean) : default 3회 / 실패한 쿼리를 재시도 하는 횟수 / true 하면 무한시도 false 는 시도 X
        // staleTime (number | Infinity) : default 0 / 해당 시간이 지나면 stale 상태가 됨 / 데이터가 fresh 상태로 유지되는 시간 / fresh 상태에서 다시 mount 되어도 fetch 실행되지 않음
        // cacheTime (number | Infinity) : default 5분 / inactive 상태인 캐시 데이터가 메모리에 남아있는 시간이다. 이 시간이 지나면 캐시 데이터는 가비지 컬렉터에 의해 메모리에서 제거된다.
        // refetchOnMount (boolean | "always") : default true / 데이터가 stale 상태일때 마운트 시 마다 refetch 실행 / always 설정 시 마운트 마다 refetch 실행
        // refetchOnWindowFocus (boolean | "always") : default true / 데이터가 stale 상태일 경우 윈도우 포커싱 될 때 마다 refetch를 실행 / always 로 설정하면 항상 윈도우 포커싱 될 때 마다 refetch를 실행
        // refetchOnReconnect (boolean | "always") : default true / 데이터가 stale 상태일 경우 재 연결될 때 refetch를 실행 / always 위와 동일
        // onSuccess ((data: TDdata) => void) : 쿼리 성공 시 실행되는 함수 / 매개변수 data는 성공 시 서버에서 넘어오는 response 값
        // onError ((error: TError) => void) : 쿼리 실패 시 실행되는 함수 / 매개변수로 에러 값을 받을 수 있다.
        // onSettled ((data?: TData, error?: TError) => void) : 쿼리가 성공하면 성공한 데이터가 전달되거나, 실패하면 에러가 전달 될 때 실행 / 매개변수로 성공 시엔 성공 데이터, 실패 시에는 에러가 전달
        // initialData (TData | () => TData) : initialData 를 설정하면 쿼리 캐시의 초기 데이터로 사용 / staleTime 이 설정되지 않은 경우 초기 데이터는 기본적으로 stale 상태
      }
    );
  };
  const successExample = () => {
    const { data, isLoading, status, error, isFetching } = useQuery(
      "성공",
      async () => {
        return await http.get("https://jsonplaceholder.typicode.com/todos/1");
      },
      {
        onSuccess: (response) => {
          console.log("data :", response.data);
        },
      }
    );
  };
  // data : {userId: 1, id: 1, title: 'delectus aut autem', completed: false}

  const errorExample = () => {
    const { data, isLoading, status, error, isFetching } = useQuery(
      "에러",
      async () => {
        return await http.get("https://jsonplaceholder.typicode.com/todos/500");
      },
      {
        onError: (error) => {
          console.log("error :", error);
        },
      }
    );
    // error : AxiosError {message: 'Request failed with status code 404', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest, …}
  };

  successExample();
  errorExample();
}
