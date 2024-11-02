import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { productType, Types } from '../reducer/Types';
import { addToCart } from '../services/functions';
import { AppContext } from '../reducer/context';
import * as services from '../services/functions';
import { Button } from '@mui/material';

export default () => {
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('token', '');
  const [name, setName] = useLocalStorage('name', '');
  const [cart, setCart] = useLocalStorage('cart', []);
  const { state, dispatch } = useContext(AppContext);

  const search: any = useLocation().search;
  const token2 = new URLSearchParams(search).get('token');
  const Authorization = token2 ? 'Bearer ' + token2 : '';

  function validatePassword(evt: any) {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        evt.target.value,
      )
    ) {
      error && setError('');
      error2 && setError2('');
      const { name, value } = evt.target;

      if (name === 'password') {
        setPassword(value);
      } else if (name === 'password2') {
        setPassword2(value);
      }

      if (name === 'password2' && value !== password) {
        setError2('Passwords do not match');
      }

      return;
    }
    if (evt.target.name === 'password') {
      setError(
        'Password must be at least eight characters long and include at least one uppercase letter, one lowercase letter, and one number.',
      );
    }
    if (evt.target.name === 'password2') {
      setError2(
        'Password must be at least eight characters long and include at least one uppercase letter, one lowercase letter, and one number.',
      );
    }
  }

  async function hanldeSubmit(e: any, password: string) {
    e.preventDefault();
    if (error) return;
    await axios
      .post(
        import.meta.env.VITE_BACKEND_URL + `api/users/change/${password}`,
        password,
        {
          headers: { Authorization },
        },
      )
      .then((res) => {
        setToken(token2);
        setName(res.data.userBase.name);
      });

    if (cart.length > 0) {
      cart.forEach((item: productType) => {
        addToCart(e, [item]);
      });
    }
    dispatch({
      type: Types.Loading,
      payload: !state.loading,
    });
    setTimeout(async function delayed() {
      let dataCart = await services.getCart();
      setCart(dataCart[0]);
      function getQuantity(data: productType[]) {
        if (data.length === 0) return;
        const total = data.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
        dispatch({
          type: Types.SetQuantity,
          payload: total,
        });
        (async () => {
          const answer = await services.GetAddress();
          dispatch({ type: Types.GetAddress, payload: answer });
        })();
      }
      getQuantity(dataCart[0] ? dataCart[0] : []);
    }, 400);
    navigate('/');
  }

  return (
    <div>
      <div className="login_form">
        <div className="login_label">New password:</div>
        <input
          autoComplete="new-password"
          className="login_input"
          name="password"
          onChange={validatePassword}
          placeholder="New Password"
          type="password"
        />
      </div>
      <div className="login_error_container">
        {error ? <div className="login_error">{error}</div> : null}
      </div>
      <div className="login_form">
        <div className="login_label">Re-enter:</div>
        <input
          autoComplete="new-password"
          className="login_input"
          name="password2"
          onChange={validatePassword}
          type="password"
          placeholder="Confirm New Password"
        />
      </div>
      <div className="login_error_container">
        {error2 ? <div className="login_error">{error2}</div> : null}
      </div>
      <div className="login_form">
        <Button
          sx={{
            borderColor: '#222222',
            color: '#222222',
            height: '40px',
            padding: '12px',
            margin: '12px',
            width: '210px',
            ':hover': { color: 'blue' },
          }}
          variant="outlined"
          onClick={(e) => hanldeSubmit(e, password)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
