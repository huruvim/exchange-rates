import {useCallback, useEffect, useMemo, useState} from "react";
import {GetExchangeRate, getExchangeRate} from "../api/exchangeHandlers";
import {LocalStorageKeys} from "../constants/localStorageKeys";
import {useTimer} from "./useTimer";

const TIMER_TO_REFETCH = 60

export const useExchange = () => {
  const [data, setData] = useState<GetExchangeRate | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFetchCurrencyData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getExchangeRate();
      localStorage.setItem(LocalStorageKeys.CURRENCIES, JSON.stringify(data));
      localStorage.setItem(LocalStorageKeys.TIMER, JSON.stringify(Date.now()));
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [])

  useTimer(LocalStorageKeys.TIMER, TIMER_TO_REFETCH, onFetchCurrencyData)

  useEffect(() => {
    const data = localStorage.getItem(LocalStorageKeys.CURRENCIES);
    if (data) {
      setData(JSON.parse(data));
    } else {
      onFetchCurrencyData();
    }
  }, [onFetchCurrencyData])

  return {
    data,
    isLoading,
    onRefresh: onFetchCurrencyData
  };
}