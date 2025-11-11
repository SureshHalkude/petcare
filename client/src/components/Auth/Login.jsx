// import { useState } from "react";

// function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ email, password });
//     // Later: connect this with backend API (Node/Express + MongoDB)
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Login
//         </h2>

//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-600 mb-1"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             autoComplete="off"
//             className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-600 mb-1"
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="new-password"
//             className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition font-medium"
//         >
//           Login
//         </button>

//         <p className="text-center text-sm text-gray-500 mt-4">
//           Don’t have an account?{" "}
//           <a href="/signup" className="text-blue-500 hover:underline">
//             Sign up
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;


import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your backend URL
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Success
      setMessage("Login successful 🎉");
      console.log(response.data);

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect (if using React Router)
      window.location.href = "/"; // or navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      setMessage(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition font-medium"
        >
          Login
        </button>

        {message && (
          <p className="text-center text-sm text-red-500 mt-4">{message}</p>
        )}

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
