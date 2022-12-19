import {useCallback, useEffect} from "react";
import {differenceInMinutes} from "date-fns";

export const useTimer = (storageTimerKey: string, timeBeforeRefresh: number, onTimeIsUp: () => void) => {
  const timeTicker = useCallback(() => {
    const time = localStorage.getItem(storageTimerKey);
    const differenceFromLastRequest = differenceInMinutes(Date.now(), Number(time));
    if (differenceFromLastRequest >= timeBeforeRefresh) {
      onTimeIsUp();
    }
  }, [timeBeforeRefresh, onTimeIsUp])

  useEffect(() => {
    const timer = setInterval(timeTicker, 7000)
    return () => {
      clearInterval(timer)
    };
  }, [timeTicker])
}