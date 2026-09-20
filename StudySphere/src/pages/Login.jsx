import React, { useState } from "react";
import {login} from "../services/operations/authAPI";
import { useContext } from "react";
import { StoreContext } from "../StoreContext/StoreContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setToken, setUser } = useContext(StoreContext);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const response = await login(
                email.trim(),
                password.trim()
            );
            // Store the token and user information in the context and localStorage
            setToken(response.token);
            setUser(response.user);
            console.log(response);

            // Store the token and user information in localStorage
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            // Navigate to the home page after successful login
            navigate("/");
        } catch (error) {
            console.log("Login Failed:", error.response?.data?.message || error.message);
            console.log(error);
        }

    };
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground mx-auto">
            <h1 className="text-3xl text-foreground font-bold">Welcome Back</h1>
            <p className="text-muted-foreground text-lg md:text-2xl">Build skills for today, tomorrow and beyond.</p>
            <p className="text-[16px] md:text-xl italic text-[#4a6cf7e6] ">Education to future-proof your career</p>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-[180px] md:w-[350px] gap-1 my-4 ">
                    <p className="text-[12px] sm:text-sm">Email Address</p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-foreground text-[16px] sm:text-lg md:text-xl rounded-md h-7.5 md:h-[45px] bg-muted shadow-sm shadow-muted-foreground px-0.5"
                    />
                </div>
                <div className="flex flex-col w-[180px] md:w-[350px] gap-1 my-4">
                    <p className="text-[12px] sm:text-sm">Password</p>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-foreground text-[16px] sm:text-lg md:text-xl h-7.5 md:h-[45px] bg-muted shadow-sm shadow-muted-foreground rounded-md px-0.5"
                    />
                </div>
                <div className="mt-2 text-right">
                    <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                         Forgot Password?
                    </Link>
                </div>
                <div className="flex justify-center items-center w-[180px] md:w-[350px] h-7.5 md:h-[45px] shadow-sm shadow-muted-foreground rounded-md transition-all duration-300 hover:scale-95  ">
                    <button type="submit" className="bg-[#4a6cf7e6] w-full h-full my-4 text-foreground text-xl cursor-pointer rounded-md">Login</button>
                </div>
            </form>
        </div>
    )
}
export default Login;