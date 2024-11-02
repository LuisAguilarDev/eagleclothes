import { useEffect, useCallback } from 'react';
import axios from 'axios';

export function Payment({ cart }: any) {
  const token = window.localStorage.getItem('token');
  const Authorization = token ? 'Bearer ' + JSON.parse(token) : '';
  const FORM_ID = 'button-checkout';

  const getpreference = useCallback(async () => {
    const res: any = await axios.post(
      import.meta.env.VITE_BACKEND_URL + '/api/pay',
      cart,
      {
        headers: { Authorization },
      },
    );
    if (res.data.global) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.setAttribute('data-preference-id', res.data.global);

      const form = document.getElementById(FORM_ID);
      if (form !== null) {
        form.appendChild(script);
      }
      function createCheckoutButton(preference: string) {
        const script = document.createElement('script');
        script.src =
          'https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js';
        script.type = 'text/javascript';
        script.dataset.preferenceId = preference;
        document.getElementById('button-checkout')!.innerHTML = '';
        document.querySelector('#button-checkout')?.appendChild(script);
      }
      createCheckoutButton(res.data.global);
    }
  }, [cart]);

  useEffect(() => {
    getpreference();
  }, [getpreference]);

  return <div id={FORM_ID} />;
}
