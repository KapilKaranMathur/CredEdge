import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedUser = localStorage.getItem("user"); 
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
          setUser({ token }); 
      }
    }
    setLoading(false);
  }, []);

  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const clearUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
