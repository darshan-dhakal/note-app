// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { noteSchema } from "../schemas/noteSchema";
// import Layouts from "../components/Layouts";
// import {
//   Label,
//   Textarea,
//   TextInput,
//   Button,
//   Card,
//   Toast,
//   ToastToggle,
// } from "flowbite-react";
// import {
//   HiOutlinePlus,
//   HiCheck,
//   HiExclamation,
//   HiX,
//   HiOutlinePencil,
//   HiTrash,
// } from "react-icons/hi";

// export function Note() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(noteSchema),
//   });

//   const [notes, setNotes] = useState([]);

//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [editNoteId, setEditNoteId] = useState(null);

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const fetchNotes = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/notes/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });

//       setNotes(res.data);
//     } catch (err) {
//       alert(err.response?.data?.error || "Failed to fetch notes");
//     }
//   };

//   const onSubmit = async (data) => {
//     if (isEditOpen && editNoteId !== null) {
//       await axios.put(`http://localhost:3000/api/notes/${editNoteId}`, data, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       window.location.reload();
//       setNotes((prev) =>
//         prev.map((n) => (n.id === editNoteId ? { ...n, ...data } : n))
//       );
//       const newNote = { ...data, id: Date.now() };
//       setNotes([newNote, ...notes]);
//       reset();
//       setIsEditOpen(false);
//       setEditNoteId(null);
//       reset({ title: "", content: "" });
//       console.log(isEditOpen, editNoteId);
//     } else {
//       const res = await axios.post("http://localhost:3000/api/notes/", data, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       window.location.reload();

//       alert("Note created successfully!");
//       // window.location.reload();
//       reset({ title: "", content: "" });
//     }
//   };

//   const handleEdit = (note) => {
//     window.scrollTo({ top: 0, behavior: "smooth" });

//     setIsEditOpen(true);
//     setEditNoteId(note.id);
//     reset({
//       title: note.title,
//       content: note.content,
//     });
//   };
//   return (
//     <Layouts>
//       <div className="p-6 max-w-4xl mx-auto space-y-6">
//         <Card>
//           <h2 className="text-2xl font-bold mb-3">Create a New Note</h2>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <Label htmlFor="title">Title</Label>
//               <TextInput
//                 id="title"
//                 placeholder="Title"
//                 {...register("title")}
//               />
//               {errors.title && (
//                 <p className="text-red-500 text-sm">{errors.title.message}</p>
//               )}
//             </div>

//             <div>
//               <Label htmlFor="content">Content</Label>
//               <Textarea
//                 id="content"
//                 rows={4}
//                 placeholder="Your note..."
//                 {...register("content")}
//               />
//               {errors.content && (
//                 <p className="text-red-500 text-sm">{errors.content.message}</p>
//               )}
//             </div>
//             <div className="flex gap-2">
//               <Button
//                 // onClick={() => setIsEditOpen(true)}
//                 type="submit"
//               >
//                 {isEditOpen ? (
//                   <HiOutlinePencil className="h-5 w-5" />
//                 ) : (
//                   <HiOutlinePlus className="h-5 w-5" />
//                 )}
//                 <p className="p-2">
//                   {isEditOpen ? "Update Note" : "Create Note"}
//                 </p>
//               </Button>
//               {isEditOpen && (
//                 <Button
//                   onClick={() => {
//                     setEditNoteId(null);
//                     setIsEditOpen(false);
//                     reset({ title: "", content: "" });
//                   }}
//                   type="button"
//                 >
//                   <p className="p-2">Cancel Update</p>
//                 </Button>
//               )}
//             </div>
//           </form>
//         </Card>
//       </div>
//       <h2 className="text-xl font-bold mt-6">Your Notes</h2>

//       {notes.length === 0 ? (
//         <Card>
//           <p>No notes yet — create one!</p>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {notes.map((note) => (
//             <Card key={note.id}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-semibold">{note.title} </h3>
//                   <p className="mt-2 whitespace-pre-wrap">{note.content}</p>
//                 </div>
//                 <div className="flex flex-col gap-2 ml-4">
//                   <Button
//                     color="light"
//                     onClick={() => {
//                       handleEdit(note);
//                     }}
//                   >
//                     <HiOutlinePencil className="h-5 w-5" />
//                   </Button>

//                   <Button color="failure" onClick={() => handleDelete(note.id)}>
//                     <HiTrash className="h-5 w-5" />
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}
//     </Layouts>
//   );
// }
// export default Note;
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../schemas/noteSchema";
import Layouts from "../components/Layouts";
import { Label, Textarea, TextInput, Button, Card } from "flowbite-react";
import { HiOutlinePlus, HiOutlinePencil, HiTrash } from "react-icons/hi";

export function Note() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
  });

  const [notes, setNotes] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notes/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setNotes(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch notes");
    }
  };

  const onSubmit = async (data) => {
    if (isEditOpen && editNoteId !== null) {
      await axios.put(`http://localhost:3000/api/notes/${editNoteId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      window.location.reload();
      setNotes((prev) =>
        prev.map((n) => (n.id === editNoteId ? { ...n, ...data } : n))
      );
      reset();
      setIsEditOpen(false);
      setEditNoteId(null);
      reset({ title: "", content: "" });
    } else {
      await axios.post("http://localhost:3000/api/notes/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      window.location.reload();
      reset({ title: "", content: "" });
    }
  };

  const handleEdit = (note) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsEditOpen(true);
    setEditNoteId(note.id);
    reset({ title: note.title, content: note.content });
  };

  return (
    <Layouts>
      <div className="min-h-screen py-10 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Form Card */}
          <Card className="shadow-xl rounded-2xl p-8 border border-gray-200 bg-white">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 mb-6">
              {isEditOpen ? "Edit Note" : "Create a New Note"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-medium text-gray-700" />
                <TextInput
                  id="title"
                  placeholder="Enter a clear and descriptive title"
                  className="text-lg"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="content"
                  className="font-medium text-gray-700"
                />
                <Textarea
                  id="content"
                  rows={5}
                  placeholder="Write your note here..."
                  className="text-base"
                  {...register("content")}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex items-center gap-2 px-5">
                  {isEditOpen ? (
                    <HiOutlinePencil className="h-5 w-5" />
                  ) : (
                    <HiOutlinePlus className="h-5 w-5" />
                  )}
                  {isEditOpen ? "Update Note" : "Create Note"}
                </Button>

                {isEditOpen && (
                  <Button
                    color="gray"
                    type="button"
                    onClick={() => {
                      setEditNoteId(null);
                      setIsEditOpen(false);
                      reset({ title: "", content: "" });
                    }}
                    className="px-5"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Notes List */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Notes
            </h2>

            {notes.length === 0 ? (
              <Card className="p-6 text-center shadow-md bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg">You have no notes yet.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notes.map((note) => (
                  <Card
                    key={note.id}
                    className="p-6 rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {note.title}
                        </h3>
                        <p className="mt-3 text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {note.content}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 ml-4">
                        <Button
                          color="light"
                          className="shadow-sm hover:bg-gray-100"
                          onClick={() => handleEdit(note)}
                        >
                          <HiOutlinePencil className="h-5 w-5" />
                        </Button>

                        <Button
                          color="failure"
                          className="shadow-sm"
                          onClick={() => handleDelete(note.id)}
                        >
                          <HiTrash className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layouts>
  );
}

export default Note;
