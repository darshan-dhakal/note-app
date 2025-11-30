// import { useState } from "react";
// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/users/forgot-password",
//         { email }
//       );

//       alert("Password reset link sent to your email!");
//       console.log("Password reset link sent to:", res.data);

//       window.location.href = "/login";
//     } catch (err) {
//       setError(err.response?.data?.error || "Forgot password failed");
//     }
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "100vw",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f9f9f9",
//         padding: "20px",
//         borderRadius: "10px",
//         boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "400px",
//           width: "100%",
//           padding: "20px",
//           borderRadius: "10px",
//           background: "white",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
//         <form onSubmit={handleSubmit}>
//           <div
//             className="form-group"
//             style={{
//               display: "flex",
//               // marginTop: "10px",
//               // paddingLeft: "5px",
//               flexDirection: "column",
//               marginBottom: "15px",
//             }}
//           >
//             <label>Email</label>
//             <div style={{ display: "flex" }}>
//               <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-control"
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   flex: "1",
//                   marginTop: "10px",
//                 }}
//               />
//             </div>
//           </div>
//           <div className="form-group">
//             <button
//               type="submit"
//               className="btn btn-primary"
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 marginTop: "15px",
//                 backgroundColor: "black",
//                 color: "white",
//                 borderRadius: "5px",
//                 border: "none",
//               }}
//             >
//               Send Reset Link
//             </button>
//           </div>
//           {error && <div className="alert alert-danger">{error}</div>}
//         </form>
//       </div>
//     </div>
//   );
// }
// export { ForgotPassword };
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/forgot-password",
        { email }
      );

      alert("Password reset link sent to your email!");
      console.log("Password reset link sent:", res.data);

      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.error || "Forgot password failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
          borderRadius: "10px",
          background: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <label style={{ marginTop: "10px" }}>Email</label>
          <div style={{ display: "flex" }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                marginBottom: "15px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Send Reset Link
          </button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export { ForgotPassword };
