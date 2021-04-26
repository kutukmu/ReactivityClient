import axios, { AxiosResponse } from "axios";
import { Activity } from "../../features/modules/activity";

const sleep = (num: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, num);
  });
};
axios.defaults.baseURL = " http://localhost:5000/api";

axios.interceptors.request.use((response) => {
  return sleep(1000)
    .then(() => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
});

const ActivitiesResolver = <T>(res: AxiosResponse<T>) => res.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(ActivitiesResolver),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(ActivitiesResolver),
  put: <T>(url: string, body: {}) =>
    axios.put<T>(url, body).then(ActivitiesResolver),
  delete: <T>(url: string) => axios.delete<T>(url).then(ActivitiesResolver),
  details: <T>(url: string) => axios.get<T>(url).then(ActivitiesResolver),
};

const Activities = {
  list: () => request.get<Activity[]>("/Activities"),
  create: (activity: Activity) => request.post<void>("/Activities", activity),
  update: (activity: Activity) =>
    request.put<void>(`/Activities/${activity.id}`, activity),
  delete: (id: string) => request.delete<void>(`/Activities/${id}`),
  details: (id: string) => request.get<Activity>(`/Activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
