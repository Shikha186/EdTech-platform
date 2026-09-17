import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../services/operations/authAPI.js";


function SignUp() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "", password: "", confirmPassword: "", accountType: "Student", otp: "", });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => { const { name, value } = e.target; setFormData((prev) => ({ ...prev, [name]: value, })); };
    const handleSendOTP = async (e) => { 
        e.preventDefault(); 
        if( !formData.firstname || !formData.lastname || !formData.email || !formData.password || !formData.confirmPassword || !formData.accountType){ 
            alert("Please fill all the fields"); 
            return; 
        } 
        if(formData.password !== formData.confirmPassword){ 
            alert("Password and confirm password do not match"); 
            return; 
        }
        try { 
            setLoading(true);
            const response = await sendOTP(formData.email); 
            console.log("OTP response:", response); 
            alert("OTP sent successfully to your email"); 
            navigate("/sendOTP", { state: { signupData: formData, }, }); 
        } catch (error) { 
            console.log("Send OTP error:", error); 
            alert( error?.response?.data?.message || "Unable to send OTP" ); 
        }finally{ 
            setLoading(false); 
        }
     };
    return(
        <div className="flex flex-col items-center justify-center w-full  max-h-full bg-background text-foreground ">
          <div className="flex flex-col items-center  w-[70%] md:w-[40%] min-h-screen bg-background text-foreground  shadow-lg shadow-[#4a6cf7e6]  my-5 mx-auto px-1">
            <h1 className="text-3xl text-brand font-bold">StudySphere</h1>
            <p className="text-muted-foreground text-lg md:text-2xl">Welcome 👋 Let’s Get started!</p>
            <p className="text-[16px] md:text-xl italic text-[#4a6cf7e6] ">Join StudySphere and start learning today</p>
            <form onSubmit={handleSendOTP}>
                <div className="flex flex-col w-[180px] md:w-[350px] gap-1 my-4">
                        <label className="text-[12px] sm:text-sm">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Enter first name"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="text-foreground text-[16px] sm:text-lg md:text-xl rounded-md h-7.5 md:h-[45px] bg-muted shadow-sm shadow-muted-foreground px-0.5"
                        />
                </div>
                <div className="flex flex-col w-[180px] md:w-[350px] gap-1 my-4">
                        <label className="text-[12px] sm:text-sm">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Enter last name"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="text-foreground text-[16px] sm:text-lg md:text-xl rounded-md h-7.5 md:h-[45px] bg-muted shadow-sm shadow-muted-foreground px-0.5"
                        />
                </div>
                <div className="flex flex-col ">
                    <label >Account Type</label>
                    <select
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleChange}
                        className="text-foreground text-[16px] sm:text-lg md:text-xl rounded-md h-7.5 md:h-[45px] w-[180px] md:w-[350px] bg-muted shadow-sm shadow-muted-foreground px-0.5"
                    >
                        {/* <option value="">Select Account Type</option> */}
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </select>
                </div>
                <div className="flex flex-col w-[180px] md:w-[350px] gap-1 my-4 ">
                    <label className="text-[12px] sm:text-sm">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="text-foreground text-[16px] sm:text-lg md:text-xl rounded-md h-7.5 md:h-[45px] bg-muted shadow-sm shadow-muted-foreground px-0.5"
                    />
                </div>
                
                <div className="flex flex-col w-[180px] md:w-[350px] gap-1 my-4">
                        <label className="text-[12px] sm:text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="text-foreground text-[16px] sm:text-lg md:text-xl h-7.5 md:h-[45px] bg-muted shadow-sm shadow-muted-foreground rounded-md px-0.5"
                        />
                </div>
                <div className="flex flex-col w-[180px] md:w-[350px] gap-1 my-4">
                        <label className="text-[12px] sm:text-sm">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="text-foreground text-[16px] sm:text-lg md:text-xl h-7.5 md:h-[45px] bg-muted shadow-sm shadow-muted-foreground rounded-md px-0.5"
                        />
                    
                </div>
                <div className="flex justify-center items-center my-5 ">
                    <button type="submit" disabled={loading} className="bg-[#4a6cf7e6] w-[180px] md:w-[350px] h-7.5 md:h-[45px] my-4 text-foreground text-xl cursor-pointer rounded-md transition-all duration-300 hover:scale-95 ">
                        {loading ? "Sending OTP..." : "Send OTP" }
                    </button>
                </div>
                {/* <div className="flex justify-center items-center w-[180px] md:w-[350px] h-7.5 md:h-[45px] shadow-sm shadow-muted-foreground rounded-md transition-all duration-300 hover:scale-95  ">
                    <button type="submit" className="bg-[#4a6cf7e6] w-full h-full my-4 text-foreground text-xl cursor-pointer rounded-md">Sign Up</button>
                </div> */}
                
            </form>
          </div>

        </div>
    );
}
export default SignUp;