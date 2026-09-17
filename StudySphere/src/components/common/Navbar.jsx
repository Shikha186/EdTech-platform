
import ThemeToggle from "../ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import plogo from "../../assets/plogo.png";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../StoreContext/StoreContext";
import React, {  useEffect, useState } from "react";
import { getAllCategories } from "../../services/operations/categoryAPI";



function Navbar(){
    const location = useLocation();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    // Fetch categories 
    useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();

            console.log("Categories:", response);

            if (response.success) {
                setCategories(response.categories);
            }
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

        fetchCategories();
    }, []);


    const { token, user, setUser, setToken } = useContext(StoreContext);
    const handleLogout = () => { 
        localStorage.removeItem("token"); 
        // Remove token from context 
        setToken(null); 
        // Remove user from context 
        setUser(null); 
        // Go to home page 
        navigate("/"); 
    };

    // Helper function to conditionally apply the text-brand class
    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `md:text-lg text-sm sm:text-md font-semibold transition-colors duration-300 ${
            isActive ? "text-brand" : "text-muted-foreground hover:text-brand"
        }`;
    };

    return(
        <div className="w-full h-15 flex items-center border-[1px] border-b-muted ">
            <div className="w-11/12 flex items-center justify-between ">
                <Link to="/" className=" flex items-center text-sm md:text-2xl font-bold text-brand">
                    <img src={plogo} alt="Logo" className="md:h-15 md:w-15 h-8 w-8"  loading="lazy"/>
                    <span>StudySphere</span>
                </Link>

                <div className=" flex items-center justify-between md:gap-2 md:px-3">
                    <div>
                        <Link to="/" className={getLinkClass("/")}>Home</Link>
                    </div>
                    <div className="relative group iteems-center ml-2">
                        {/* Catalog button */}
                        <button className="flex items-center gap-1 md:text-lg text-sm font-semibold text-muted-foreground hover:text-brand transition-colors duration-300">
                            Catalog
                            <span className="text-[10px] mt-[2px]">▼</span>
                        </button>
                        {/* Dropdown Menu */}
                        {/* Adds a slight invisible padding block at the top so the menu doesn't close when moving the mouse down */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div className=" bg-muted  border-[1px] border-muted-foreground rounded-lg shadow-xl overflow-hidden flex flex-col">
                                {categories?.length > 0 ? (
                                    categories.map((category) => (
                                        <button
                                            key={category._id}
                                            onClick={() => navigate(`/catalog/${category._id}`)}
                                            className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand transition-colors duration-200"
                                        >{category.name}</button>
                                    ))
                                ) : (
                                    <p className="px-4 py-4 text-sm text-center text-muted-foreground">
                                        No categories found
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="ml-4">
                        <Link to="/about" className={getLinkClass("/about")}>About</Link>
                    </div>
                    <div className="ml-4">
                        <Link to="/contact" className={getLinkClass("/contact")}>Contact</Link>
                    </div>
                </div>
                <div className="flex items-center justify-between md:gap-2 md:px-3">
                    {!token && (
                        <div className="flex items-center gap-4">
                            <div>
                                <Link to="/login" className={getLinkClass("/login")}>
                                    Login
                                </Link>
                            </div>
                            <div>
                                <Link to="/signUp" className={getLinkClass("/signup")}>
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    )}
                    {token && (
                        <div className="flex items-center gap-4">
                            <div>
                               {user?.accountType === "Student" && ( <Link to="/cart" className={getLinkClass("/cart")}>
                                    Cart
                                </Link> )}
                            </div>
                            <div>
                                <Link to="/profile" className={getLinkClass("/profile")}>
                                    {user?.name || "Profile"}
                                </Link>
                            </div>
                            <div>
                                <button onClick={handleLogout} className={getLinkClass("/logout")}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div><ThemeToggle /></div>
            
            </div>

            
        </div>
    )

}
export default Navbar;