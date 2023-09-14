export function setUserObject(obj) {
  const object = JSON.stringify(obj);
  sessionStorage.setItem("user", object);
}
export function getUserObject(obj) {
  return JSON.parse(sessionStorage.getItem("user"));
}
export function deleteUserObject() {
  sessionStorage.removeItem("user");
  return true;
}

export const contestStartTimer = 19 * 60 * 60;

export const endpoint = "http://localhost:4000/api/v1/";
// export const endpoint = "https://techalegriaserver.onrender.com/api/v1/";
