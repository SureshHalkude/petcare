import bcrypt from "bcryptjs";

const dbPassword = "$2a$10$hWfEAG2wlOueO4GgHg5UuODt27MRfYqEuzZvmDlO83XhMmk1AtgZa"; // from Compass
const inputPassword = "admin123"; // what you type in frontend

const match = await bcrypt.compare(inputPassword, dbPassword);
console.log("Password match:", match);
