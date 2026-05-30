
exports.contactUsEmail= (name,email,message,contactNumber)=>{
    return `
    <h1>New Contact Us Query</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Contact Number:</strong> ${contactNumber}</p>
    <p><strong>Message:</strong> ${message}</p>
    `
}