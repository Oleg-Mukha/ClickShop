import { useState, useEffect } from "react";

const useExchangeRateHook = () => {
  const [exchangeRate, setExchangeRate] = useState(0.0);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      const rate = data.rates.UAH;
      setExchangeRate(rate);
    };
    fetchExchangeRate();
  }, []);

  return exchangeRate;
};

export default useExchangeRateHook;
