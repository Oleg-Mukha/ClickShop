import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./DebugWindow.module.css";
import { CSSTransition } from "react-transition-group";

const DebugWindow = ({ history, show }) => {
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames={{
        enter: styles.debug_window_enter,
        enterActive: styles.debug_window_enter_active,
        exit: styles.debug_window_exit,
        exitActive: styles.debug_window_exit_active,
      }}
      unmountOnExit
    >
      <div className={styles.debug_window}>
        <h3>History:</h3>
        <ul>
          {history.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>
    </CSSTransition>
  );
};

const DebugRouter = ({ children }) => {
  const location = useLocation();
  const [history, setHistory] = useState([]);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, location.pathname]);
  }, [location]);

  const toggleDebug = () => {
    setShowDebug((prevShow) => !prevShow);
  };
  return (
    <>
      {children}
      <button onClick={toggleDebug}>Toggle Debug Window</button>
      <DebugWindow history={history} show={showDebug} />
    </>
  );
};

export default DebugRouter;
