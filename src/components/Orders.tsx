import React, { useState, useEffect } from "react";
import * as services from "../services/functions";
import { Card } from "./CardOrder";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const answer = await services.getOrders();
      setOrders(answer);
    };
    getOrders();
    return;
  }, []);

  return (
    <>
      <div className="Orders_mainContainer">
        {orders.length > 0 ? (
          orders.map((o: any, i) => {
            return (
              <Card
                id={o._id}
                key={i}
                total={o.total}
                recipient={o.recipient}
                items={o.items}
                date={o.date}
                delivery={o.estimated_delivery}
                address={o.address}
              />
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
