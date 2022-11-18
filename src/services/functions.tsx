import axios from "axios";
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
  return answer.data === undefined ? [] : answer.data;
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

export async function addToCart(evt: Event, item: any[]) {
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

export async function deleteFromFav(item: any) {
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  if (Authorization === "") {
    return "";
  }
  const answer: any = await axios
    .delete(`http://localhost:5000/api/users/favs/${item[0].code}`, {
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

export async function getWomanClothes() {
  const answer: any = await axios
    .get(`http://localhost:5000/api/search/a?category=H%26M WOMAN`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return answer.data;
}

export async function getManClothes() {
  const answer: any = await axios
    .get(`http://localhost:5000/api/search/a?category=H%26M MAN`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return answer.data;
}
export async function updateQuantity(code: string, quantity: number) {
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  const answer: any = await axios
    .post(
      `http://localhost:5000/api/users/cart`,
      { code, quantity },
      {
        headers: { Authorization },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function GetAddress<T>(): Promise<any> {
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  const answer: any = await axios
    .get(`http://localhost:5000/api/users/address`, {
      headers: { Authorization },
    })
    .then((res) => {
      return res.data.answer;
    })
    .catch((err) => {
      return err;
    });
  return answer;
}

export async function postAddress<T>(newAddress: any): Promise<any> {
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  const answer: any = await axios
    .post(`http://localhost:5000/api/users/address`, newAddress, {
      headers: { Authorization },
    })
    .then((res) => {
      return res.data.answer;
    })
    .catch((err) => {
      return err;
    });
  return answer;
}

export async function deleteAddress<T>(index: any): Promise<any> {
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  console.log("delete");
  const answer: any = await axios
    .delete(`http://localhost:5000/api/users/address/${index}`, {
      headers: { Authorization },
    })
    .then((res) => {
      return res.data.answer;
    })
    .catch((err) => {
      return err;
    });
  return answer;
}
