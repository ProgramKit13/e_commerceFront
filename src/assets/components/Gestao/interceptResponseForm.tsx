import { createContext, useState, useContext, FunctionComponent } from 'react';

interface InterceptResponseFormContextProps {
  confirm: boolean;
  interceptResponseForm: (status: number) => void;
}

const defaultContextValue: InterceptResponseFormContextProps = {
  confirm: false,
  interceptResponseForm: () => {},
};

const InterceptResponseFormContext = createContext<InterceptResponseFormContextProps>(defaultContextValue);

interface ProviderProps {
  children: React.ReactNode;
}

export const InterceptResponseFormProvider: FunctionComponent<ProviderProps> = ({ children }) => {
  const [confirm, setConfirm] = useState(false);

  const interceptResponseForm = (status: number) => {
    if (status === 200 || status === 201) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };

  return (
    <InterceptResponseFormContext.Provider value={{ confirm, interceptResponseForm }}>
      {children}
    </InterceptResponseFormContext.Provider>
  );
};

export const useInterceptResponseFormContext = () => useContext(InterceptResponseFormContext);
