import { useState } from "react";

const useQuantityHook = (initialQty) => {
  const [quantity, setQuantity] = useState(initialQty);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return [quantity, handleIncrement, handleDecrement];
};

export default useQuantityHook;
