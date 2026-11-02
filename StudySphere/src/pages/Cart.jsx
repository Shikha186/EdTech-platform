import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
// Adjust this path to wherever your StoreContext is located
import { StoreContext } from "../StoreContext/StoreContext"; 

const Cart = () => {
  const { cart = [], setCart } = useContext(StoreContext);
  const navigate = useNavigate();

  // =========================================================
  // LOGIC & CALCULATIONS
  // =========================================================
  
  // Calculate the total price of all items in the cart
  const totalAmount = cart.reduce((acc, course) => acc + (course.price || 0), 0);

  // Remove item from cart and update local storage
  const handleRemoveFromCart = (courseId) => {
    const updatedCart = cart.filter((item) => item._id !== courseId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Placeholder for your Razorpay integration
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // In the future, this will call your buyCourse/capturePayment API 
    // passing the array of cart item IDs: cart.map(item => item._id)
    console.log("Proceeding to checkout with:", cart);
    alert("Checkout integration pending! Check console for cart data.");
  };

  // =========================================================
  // RENDER UI
  // =========================================================
  return (
    <div className="mx-auto w-full max-w-6xl text-foreground pb-10">
      
      {/* HEADER & BREADCRUMBS */}
      <div className="mb-8 flex flex-col gap-y-2">
        {/* <p className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link> / 
          <Link to="/dashboard" className="hover:text-brand transition-colors"> Dashboard</Link> / 
          <span className="text-brand font-medium"> Cart</span>
        </p> */}
        <h1 className="text-3xl font-bold mt-3">Your Cart</h1>
        <p className="text-muted-foreground font-medium border-b border-border pb-4">
          {cart.length} {cart.length === 1 ? "Course" : "Courses"} in Cart
        </p>
      </div>

      {/* CART CONTENT */}
      {cart.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xl font-semibold mb-2">Your cart is empty</p>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any courses yet.</p>
          <button 
            onClick={() => navigate("/catalog")}
            className="rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-opacity-90 shadow-sm"
          >
            Browse Catalog
          </button>
        </div>
      ) : (
        <div className="flex flex-col-reverse items-start gap-8 lg:flex-row">
          
          {/* LEFT: CART ITEMS LIST */}
          <div className="flex w-full flex-col gap-6 lg:w-[65%] xl:w-[70%]">
            {cart.map((course, index) => (
              <div 
                key={course._id} 
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 ${
                  index !== cart.length - 1 ? "border-b border-border" : ""
                }`}
              >
                {/* Course Thumbnail */}
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-[150px] w-full sm:h-[120px] sm:w-[180px] rounded-lg object-cover shadow-sm border border-border"
                />

                {/* Course Details */}
                <div className="flex flex-1 flex-col justify-between w-full">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground line-clamp-1">
                      {course.courseName}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {course.courseDescription}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-medium text-yellow-500">
                        ⭐ {course.ratingAndReviews?.length || 0} Ratings
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Remove Button */}
                <div className="flex w-full sm:w-auto flex-row sm:flex-col items-center justify-between sm:items-end gap-4 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleRemoveFromCart(course._id)}
                    className="flex items-center gap-x-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 hover:border-red-500/50"
                  >
                    <VscTrash className="text-lg" />
                    <span>Remove</span>
                  </button>
                  <p className="text-2xl font-bold text-brand">
                    ₹ {course.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: CHECKOUT SUMMARY */}
          <div className="w-full rounded-xl border border-border bg-card p-6 shadow-sm lg:w-[35%] xl:w-[30%] sticky top-24">
            <h3 className="text-lg font-semibold border-b border-border pb-3 mb-4">Order Summary</h3>
            
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground">Original Price:</p>
              <p className="font-medium">₹ {totalAmount}</p>
            </div>
            
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
              <p className="text-muted-foreground">Discount:</p>
              <p className="text-green-500 font-medium">- ₹ 0</p>
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-xl font-bold">Total:</p>
              <p className="text-2xl font-bold text-brand">₹ {totalAmount}</p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full rounded-md bg-brand py-3 text-center text-sm font-bold text-white transition-all hover:bg-opacity-90 shadow-sm"
            >
              Buy Now
            </button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Secure checkout powered by Razorpay.
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;