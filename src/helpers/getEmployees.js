// import axios from "axios";
//
// function GetEmployees() {
//
//     const token = localStorage.getItem('token');
//     const source = axios.CancelToken.source();
//     let result = {};
//
//     async function getEmployees() {
//
//         try {
//             const result = await axios.get(`http://localhost:8081/employees`,
//                 {
//                 headers: {
//                     cancelToken: source.token,
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 }
//             });
//
//             console.log(result);
//             let result = result;
//
//             return function cleanup() {
//                 source.cancel();
//             }
//         } catch (e) {
//             console.error(e);
//         }
//
//     }
//
//     return result
// }
//
// export default GetEmployees;