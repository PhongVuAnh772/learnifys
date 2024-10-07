import React, { createContext, useContext, useState, ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import ToastCustom from "../app/common/ToastNotification";

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (newMessage: string) => {
    setMessage(newMessage);
  };

  const handleHide = () => {
    setMessage(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && <ToastCustom message={message} onHide={handleHide} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
  },
});
