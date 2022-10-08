import { useState } from "react";

const useQuantityBoxHook = (quantityP: number = 1) => {
  const [quantity, setQuantity] = useState(quantityP);

  return { quantity, setQuantity };
};

export default useQuantityBoxHook;
