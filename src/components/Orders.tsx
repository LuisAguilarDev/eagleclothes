import React, { useState, useEffect } from "react";
import * as services from "../services/functions";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const answer = await services.getOrders();
      console.log(answer, "orders?");
      setOrders(answer);
    };
    getOrders();
    return;
  }, []);

  return (
    <>
      <div className="Address_mainContainer">
        {orders.length > 0 ? (
          orders.map((o, i) => {
            return (
              <div className="Address_container" key={i}>
                Hola
              </div>
            );
          })
        ) : (
          <h1 className="Empty_Message">
            You don't have registered Orders, please add your main Orders.
          </h1>
        )}
      </div>
    </>
  );
};
