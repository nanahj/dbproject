import React, { createContext, useContext, useState } from "react";

// UserContext 생성
const UserContext = createContext();

// Provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Context를 사용하기 위한 커스텀 훅
export const useUser = () => useContext(UserContext);
