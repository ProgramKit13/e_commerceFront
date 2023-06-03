import React, { createContext, useState, ReactNode, useContext } from 'react';
import './Switch.css';
import { FaMoon, FaSun } from 'react-icons/fa';

type ThemeContextType = {
  isTheme: boolean;
  toggleTheme: () => void;
}

const initialStateTheme = {
  isTheme: false,
  toggleTheme: () => {},
}

type TopBarContextType = {
  isTopBar: boolean;
  toggleTopBar: () => void;
}

const initialStateTopBar = {
  isTopBar: false,
  toggleTopBar: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(initialStateTheme);
export const TopBarContext = createContext<TopBarContextType>(initialStateTopBar);

interface SwitchThemeProps {
  children: ReactNode; 
}

function SwitchThemeControl() {
  const { isTheme, toggleTheme } = useContext(ThemeContext);
  const { isTopBar, toggleTopBar } = useContext(TopBarContext);

  return (
    <div>
      <div className="bodySwitch">
        <label className="switch">
          <input type="checkbox" checked={isTheme} onChange={toggleTheme} />
          <span className="slider round">
            <div className={`iconTheme ${isTheme ? "iconMoon" : "iconSun"}`}>
              {isTheme ? <FaMoon /> : <FaSun />}
            </div>
          </span>
        </label>
      </div>

      <div className="bodySwitch2">
        <label className="switch">
          <input type="checkbox" checked={isTopBar} onChange={toggleTopBar} />
          <span className="slider round">
            <div className={`iconTheme ${isTopBar ? "iconMoon" : "iconSun"}`}>
              {isTopBar ? <FaMoon /> : <FaSun />}
            </div>
          </span>
        </label>
      </div>
    </div>
  );
}

export default SwitchThemeControl;

export const SwitchTheme: React.FC<SwitchThemeProps> = ({children}) => {
  const [isTheme, setTheme] = useState<boolean>(false);
  const [isTopBar, setTopBar] = useState<boolean>(false);

  const toggleTheme = () => {
    setTheme(!isTheme);
  }

  const toggleTopBar = () => {
    setTopBar(!isTopBar);
  }

  return (
    <ThemeContext.Provider value={{ isTheme, toggleTheme }}>
      <TopBarContext.Provider value={{ isTopBar, toggleTopBar }}>
        {children}
        <SwitchThemeControl />
      </TopBarContext.Provider>
    </ThemeContext.Provider>
  );
}