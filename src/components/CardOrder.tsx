import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { productType } from "../reducer/Types";

//id={o._id}
// key={i}
// total={o.total}
// recipient={o.recipient}
// items={o.items}
// date={o.date}
// delivery={o.estimated_delivery}
// address={o.address}

const Card = (props: any) => {
  const date = new Date(props.date);
  const formatDate = date.toLocaleDateString();
  const deliveryDate = new Date(props.delivery);
  const formatdeliveryDate = deliveryDate.toLocaleDateString();
  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 2,
  });
  return (
    <div key={props.key} className="CardContainer">
      <div className="Card_Header">
        <div className="Card_label">
          <span className="Card_span">Order placed</span>
          <span className="Card_span">Estimated delivery date</span>
          <span className="Card_span">Total</span>
          <span className="Card_span">Send to</span>
          <span className="Card_span">Order ID: </span>
        </div>
        <div className="Card_label">
          <span className="Card_span">{formatDate}</span>
          <span className="Card_span">{formatdeliveryDate}</span>
          <span className="Card_span">{`${nf.format(props.total)}`}</span>
          <span className="Card_span">{props.recipient}</span>
          <span className="Card_span">{props.id}</span>
        </div>
      </div>
      <>
        {props.items.map((item: productType, i: number) => {
          return (
            <div className="Item_resumen" key={i}>
              <img className="Item_small" src={item.galleryImages[0].url} />
              <div className="verticalAlign">
                <span className="Card_span2">
                  {item.name} x {item.quantity}
                </span>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export { Card };
