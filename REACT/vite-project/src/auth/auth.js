
export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  console.log(payload);
  const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "unknown";
    return role;
};
