import Cookies from "js-cookie";
import { useState, useCallback, useEffect, useMemo } from "react";

function useCookie(
  key: string,
  initialValue: string = ""
): [string, (value: string, type?: string) => void] {
  const _onGetInit = useMemo(() => {
    const cookieValue = Cookies.get(key);
    return cookieValue ? cookieValue : initialValue;
  }, [initialValue, key]);

  const [value, setValue] = useState("");

  const updateValue = useCallback(
    (newValue: string, type: string = "SET") => {
      if (type === "SET") {
        try {
          Cookies.set(key, newValue);
          setValue(newValue);
        } catch (error) {
          console.error(`Error setting cookie ${key}`, error);
        }
      } else if (type === "REMOVE") {
        try {
          Cookies.remove(key);
          setValue(initialValue);
        } catch (error) {
          console.error(`Error removing cookie ${key}`, error);
        }
      }
    },
    [initialValue, key]
  );

  const handleCookieChange = useCallback(() => {
    const cookieValue = Cookies.get(key);

    setValue(cookieValue || initialValue);
  }, [initialValue, key]);

  useEffect(() => {
    const initCookie = () => {
      const cookieValue = Cookies.get(key);
      if (!!cookieValue) {
        setValue(cookieValue);
      } else {
        Cookies.set(key, initialValue);
      }
    };

    initCookie();
  }, [key, initialValue]);

  useEffect(() => {
    window.addEventListener("change", handleCookieChange);

    return () => {
      window.removeEventListener("change", handleCookieChange);
    };
  }, [handleCookieChange]);

  return [value, updateValue];
}

export default useCookie;
