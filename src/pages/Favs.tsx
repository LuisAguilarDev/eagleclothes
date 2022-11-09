import React, { useState } from "react";
import * as services from "../services/functions";
import { Item } from "../components/Carrousel2";

export const Favorites = () => {
  const [estado, setEstado] = useState<{ answer: any[]; message: string }>({
    answer: [],
    message: "",
  });

  useState(async () => {
    const answer = await services.getFav();
    setEstado({ ...answer });
  });
  return (
    <>
      {estado.answer.map((item, i) => {
        return <Item key={i} item={item} />;
      })}
    </>
  );
};
