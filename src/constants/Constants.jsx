export function setUserObject(obj) {
    const object = JSON.stringify(obj);
    sessionStorage.setItem('user', object);
}
export function getUserObject(obj) {
    return JSON.parse(sessionStorage.getItem('user'));
}

export const endpoint = 'http://localhost:4000/api/v1/';


// "_id": "",
//     "name": "",
//     "email": "",
//     "role": "user",
//     "createdAt": "",
//     "__v": 0,
//     "score": 0