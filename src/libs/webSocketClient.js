const token = localStorage.getItem("token");
const wsc = new WebSocket(import.meta.env.VITE_WS_URL);

wsc.addEventListener("open", () => {
    console.log("collection initiated");
    wsc.send(token);
});

// if(token) {
//     wsc.addEventListener("open", () => {
//         console.log("collection initiated");
//         wsc.send(token);
//     });
// } else {
//     return false;
// }

export default function useWebSocket() {
    return wsc;
}