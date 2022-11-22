import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../reducer/context";
import { productType } from "../reducer/Types";

export function Payment({ cart }: any) {
  const [preferenceId, setPreferenceId] = useState(null);
  const { state, dispatch } = useContext(AppContext);
  const token = window.localStorage.getItem("token");
  const Authorization = token ? "Bearer " + JSON.parse(token) : "";
  const FORM_ID = "payment-form";

  const getpreference = useCallback(async () => {
    const res: any = await axios.post("http://localhost:5000/api/pay", cart, {
      headers: { Authorization },
    });
    if (res.data.global) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.setAttribute("data-preference-id", res.data.global);

      const form = document.getElementById(FORM_ID);
      if (form !== null) {
        form.appendChild(script);
      }
      function createCheckoutButton(preference: string) {
        const script = document.createElement("script");
        script.src =
          "https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = preference;
        script.dataset;
        document.getElementById("button-checkout")!.innerHTML = "";
        document.querySelector("#button-checkout")?.appendChild(script);
      }
      createCheckoutButton(res.data.global);
    }
  }, [cart]);

  useEffect(() => {
    getpreference();
  }, [getpreference]);

  return <form id={FORM_ID} method="GET" />;
}

{
  /* <script src="https://sdk.mercadopago.com/js/v2"></script>
<script>
  const mp = new MercadoPago("TEST-23a0ed4f-27e9-4a7f-aa36-d66114374b17", {
    locale: "es-CO",
  });

  mp.checkout({
    preference: {
      id: "YOUR_PREFERENCE_ID",
    },
    render: {
      container: ".cho-container",
      label: "PAY NOW",
    },
  });
</script> */
}
