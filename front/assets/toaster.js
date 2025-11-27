import Toastify from 'toastify-js'
import "toastify-js/toastify.css"

export default function toastify(message, isError) {
    Toastify({
        text: message,
        close: true,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: isError ? "red" : "linear-gradient(to right, #3668a1, #4b96e3)",
            fontSize: '1rem',
            borderRadius: '0.25rem',
            color: 'white',
            border: '1px solid white'
        }
    }).showToast();
}