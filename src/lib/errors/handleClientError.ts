import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function handleClientError(error: unknown) {
    let message = "An unexpected error occurred";
    let code = "UNKNOWN";

    if (error instanceof AxiosError) {
        code = `${error?.response?.status}` || "NO_CODE";
        message = error.response?.data?.error || error.message;
        console.error(`Error: ${message}, Code: ${code}`);
    } else {
        console.error(`Message: ${message}\nStatus: ${error}`);
    }

    toast.error(message);
}
