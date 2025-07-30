import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "https://blog-api-12dh.onrender.com",
    plugins: [customSessionClient()],
})