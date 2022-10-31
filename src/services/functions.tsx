import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ResponseType } from "axios";

export async function addFav(evt: Event, item: any) {
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  if (Authorization === "") {
    return "";
  }
  const answer: any = await axios
    .post(`http://localhost:5000/api/users/favs`, item[0], {
      headers: { Authorization },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  alert(answer.data.message);
}

export async function getFav<T>(): Promise<any> {
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  const answer: any = await axios
    .get(`http://localhost:5000/api/users/favs`, {
      headers: { Authorization },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return await answer.data;
}
