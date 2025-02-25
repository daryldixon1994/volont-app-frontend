export const baseUserUrl = "http://localhost:5000/api/user";
export function getToken() {
  return localStorage.getItem("token");
}
