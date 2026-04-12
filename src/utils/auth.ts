export const login = (role: "admin" | "vendor" | "user") => {
  localStorage.setItem("isAuth", "true");
  localStorage.setItem("role", role);
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuth") === "true";
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const logout = () => {
  localStorage.removeItem("isAuth");
  localStorage.removeItem("role");
};