import { Spinner } from "@/components/Spinner";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

const localStorageKey = "y";

export type WhoamiContext = {
  whoami: {
    keyId: string;
    contractId: string;
  } | null;
  signin: (whoami: { keyId: string; contractId: string }) => void;
  signout: () => void;
};

export const WhoamiContext = createContext(null as unknown as WhoamiContext);

export const WhoamiContextProvider: React.FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  const [whoami, setWhoami] = useState<
    { keyId: string; contractId: string } | null | undefined
  >(undefined);

  useEffect(() => {
    if (!localStorage.hasOwnProperty(localStorageKey)) {
      return setWhoami(null);
    }

    try {
      const y = JSON.parse(localStorage.getItem(localStorageKey)!) as {
        keyId: string;
        contractId: string;
      };

      setWhoami(y);
    } catch {
      localStorage.removeItem(localStorageKey);

      setWhoami(null);
    }
  }, []);

  const signin = useCallback(
    (whoami: { keyId: string; contractId: string }) => {
      localStorage.setItem(localStorageKey, JSON.stringify(whoami));

      setWhoami(whoami);
    },
    []
  );

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKey);

    setWhoami(null);
  }, []);

  return whoami === undefined ? (
    <Spinner className="m-auto" />
  ) : (
    <WhoamiContext.Provider value={{ whoami: whoami, signin, signout }}>
      {children}
    </WhoamiContext.Provider>
  );
};
