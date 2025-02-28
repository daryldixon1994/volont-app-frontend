export const baseUrl = "http://localhost:5000/api";
export const baseUserUrl = "http://localhost:5000/api/user";
export const baseAssoUrl = "http://localhost:5000/api/association";
export function getToken() {
  return localStorage.getItem("token");
}
export function getId() {
  return localStorage.getItem("id");
}
