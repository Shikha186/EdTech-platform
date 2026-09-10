import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOTP, signUp } from "../services/operations/authAPI.js"; // Assume signUp API exists

function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    // Retrieve the signup data passed from the previous page
    const signupData = location.state?.signupData;

    useEffect(() => {
        // Redirect back to signup if accessed directly without data
        if (!signupData) {
            navigate("/signup");
        }
    }, [signupData, navigate]);

    // Timer logic
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleVerifyAndSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Combine the previous form data with the OTP
            const finalData = { ...signupData, otp };
            
            // Call your API to verify OTP and create the user
            await signUp(finalData); 
            
            alert("Account created successfully!");
            navigate("/"); // Redirect to home page
            
        } catch (error) {
            console.log("Verification error:", error);
            alert(error?.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            setLoading(true);
            await sendOTP(signupData.email);
            setTimer(30); // Reset timer on success
            alert("A new OTP has been sent to your email.");
        } catch (error) {
            console.log("Resend OTP error:", error);
            alert("Failed to resend OTP.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
            <p className="text-muted-foreground mb-6">A verification code has been sent to you.</p>

            <form onSubmit={handleVerifyAndSignup} className="flex flex-col gap-4 w-[300px]">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest rounded-md h-12 bg-muted shadow-sm shadow-muted-foreground px-2"
                    required
                />
                
                <button 
                    type="submit" 
                    disabled={loading || otp.length < 6}
                    className="bg-[#4a6cf7e6] hover:bg-blue-600 h-11 text-white text-lg rounded-md transition-all duration-300 disabled:opacity-50 mt-2"
                >
                    {loading ? "Verifying..." : "Verify & Sign Up"}
                </button>
            </form>

            <div className="mt-6 flex items-center gap-2">
                {timer > 0 ? (
                    <p className="text-sm text-muted-foreground">Resend OTP in {timer}s</p>
                ) : (
                    <button 
                        onClick={handleResendOTP} 
                        disabled={loading}
                        className="text-sm text-[#4a6cf7e6] hover:underline"
                    >
                        Resend OTP
                    </button>
                )}
            </div>
        </div>
    );
}

export default VerifyOTP;