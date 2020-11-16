import useSWR from "swr";
import { API } from "../../config";
import axios from "axios";
import { getCookie } from "../../actions/setAuthToken";

const token = getCookie("token");
const payload = {
  headers: {
    Authorization: ` Bearer ${token}`,
  },
};

const fetcher = (url) => axios.get(url, payload).then((res) => res.data);
console.log(fetcher);

const baseUrl = `${API}/api/services-cart`;

export const getProducts = () => {
  const { data: services, error } = useSWR(baseUrl, fetcher);
  console.log(services);
  return { services, error };
};
