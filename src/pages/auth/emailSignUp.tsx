import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/button";

function EmailSignUp(){
     const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [name, setName] = useState("");
        const [loading, setLoading] = useState(false);
        const [errorMsg, setErrorMsg] = useState("");
        const navigate = useNavigate();

        const handleEmailSignup = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                const { data, error } = await authClient.signUp.email({
                    email, // user email address
                    password, // user password -> min 8 characters by default
                    name, // user display name
                    callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
                }, {
                    onRequest: (ctx) => {
                        setLoading(true);
                        console.log(name, password, email);
                    },
                    onSuccess: (ctx) => {
                        //redirect to the dashboard or sign in page
                        navigate("/dashboard");            
                      },
                    onError: (ctx) => {
                        // display the error message from server
                        setErrorMsg(ctx.error.message);
                        console.log(ctx.error.message);
                    },
                });
                // if(error) setErrorMsg(error.message);
            } catch (error) {
              console.error(error);
              setErrorMsg("Something went wrong, please try again.");
            } finally {
              setLoading(false);
            }
          };

    return(
        <>
            {/* --- Error Message --- */}
            {errorMsg && (
                <p className="mb-4 p-1 rounded-sm text-center bg-red-800">{errorMsg}</p>
            )}

        </>
    );
}