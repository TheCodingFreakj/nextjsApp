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

const baseUrl = `${API}/api/tools-cart`;
export const getTools = () => {
  const { data: products, error } = useSWR(baseUrl, fetcher);
  console.log(products);
  return { products, error };
};
