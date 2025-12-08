// import { Button, Card, Navbar } from "flowbite-react";
// import { HiOutlinePlus } from "react-icons/hi";

// export function Home({ onCreate }) {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* TOP NAVBAR */}
//       <Navbar fluid rounded className="shadow-sm bg-white">
//         <Navbar.Brand>
//           <span className="self-center whitespace-nowrap text-2xl font-bold text-blue-600">
//             NotesApp
//           </span>
//         </Navbar.Brand>

//         <div className="flex gap-3">
//           <Button color="blue" onClick={onCreate}>
//             <HiOutlinePlus />
//             New Note
//           </Button>

//           {/* Toggle Login / Logout */}
//           {localStorage.getItem("accessToken") ? (
//             <Button
//               color="gray"
//               onClick={() => {
//                 localStorage.removeItem("accessToken");
//                 window.location.reload();
//               }}
//             >
//               Logout
//             </Button>
//           ) : (
//             <Button
//               color="blue"
//               onClick={() => (window.location.href = "/login")}
//             >
//               Login
//             </Button>
//           )}
//         </div>
//       </Navbar>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 container mx-auto px-6 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Notes</h1>

//         {/* Example Notes Grid */}
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {[1, 2, 3].map((n) => (
//             <Card
//               key={n}
//               className="hover:shadow-lg transition-all duration-200"
//             >
//               <h2 className="text-xl font-semibold">Sample Note {n}</h2>
//               <p className="mt-2 text-gray-600">
//                 This is a demo note. Replace with your actual notes data.
//               </p>

//               <div className="flex gap-2 mt-4">
//                 <Button color="light">Edit</Button>
//                 <Button color="failure">Delete</Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Home;
import { Layouts } from "../components/Layouts";
import { CreatedNotes } from "../components/CreatedNotes";

export function Home() {
  return (
    <Layouts>
      <h1>this is home page</h1>
    </Layouts>
  );
}
