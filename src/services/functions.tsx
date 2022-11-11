import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ResponseType } from "axios";
import Swal from "sweetalert2";

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
  Swal.fire({
    title: answer.data.message,
    icon: "success",
    timer: 1000,
    showConfirmButton: false,
  });
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

export async function getCart<T>(): Promise<any> {
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  const answer: any = await axios
    .get(`http://localhost:5000/api/users/cart`, {
      headers: { Authorization },
    })
    .then((res) => {
      return res.data.cart;
    })
    .catch((err) => {
      return err;
    });
  return answer;
}

export async function addToCart(evt: Event, item: any) {
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  if (Authorization === "") {
    return "";
  }
  const answer: any = await axios
    .post(`http://localhost:5000/api/users/cart`, item[0], {
      headers: { Authorization },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  Swal.fire({
    title: answer.data.message,
    icon: "success",
    timer: 1000,
    showConfirmButton: false,
  });
}

export async function deleteFromCart(item: any) {
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  if (Authorization === "") {
    return "";
  }
  const answer: any = await axios
    .delete(`http://localhost:5000/api/users/cart/${item.code}`, {
      headers: { Authorization },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  Swal.fire({
    title: answer.data.message,
    icon: "success",
    timer: 1000,
    showConfirmButton: false,
  });
}
