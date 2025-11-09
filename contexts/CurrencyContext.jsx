"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// USD)
const DEFAULT_RATES = { USD: 1, BDT: 120, EUR: 0.92, INR: 84 };

// Context
const Ctx = createContext(null);

export function CurrencyProvider({ children }) {
  // initial currency: localStorage > 'USD'
  const [currency, setCurrency] = useState(() => {
    if (typeof window === "undefined") return "USD";
    return localStorage.getItem("currency") || "USD";
  });

  const [rates] = useState(DEFAULT_RATES);

  // currency
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", currency);
    }
  }, [currency]);

  // usd amount
  const convert = (usdAmount, target) => {
    const tgt = target || currency;
    const rate = rates[tgt] ?? 1;

    return Number(usdAmount) * rate;
  };

  const format = (usdAmount, opts = {}) => {
    const tgt = currency;
    const amount = convert(usdAmount, tgt);
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: tgt,
        ...opts,
      }).format(amount);
    } catch {
      return `${amount.toFixed(2)} ${tgt}`;
    }
  };

  const value = useMemo(
    () => ({ currency, setCurrency, rates, convert, format }),
    [currency, rates]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

export default CurrencyProvider;
