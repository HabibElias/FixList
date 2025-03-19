import {
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  createContext,
} from "react";

interface ThemeContextType {
  isLight: boolean;
  setIsLight: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isLight, setIsLight] = useState<boolean>(true);

  return (
    <ThemeContext.Provider value={{ isLight, setIsLight }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
