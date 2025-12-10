import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../schemas/noteSchema";
import Layouts from "../components/Layouts";
import {
  Label,
  Textarea,
  TextInput,
  Button,
  Card,
  Toast,
  ToastToggle,
} from "flowbite-react";
import {
  HiOutlinePlus,
  HiCheck,
  HiExclamation,
  HiX,
  HiOutlinePencil,
  HiTrash,
} from "react-icons/hi";

export function Note() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
  });

  const [notes, setNotes] = useState([]);

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
    try {
      const res = await axios.post("http://localhost:3000/api/notes/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      alert("Note created successfully!");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create note");
    }
  };

  return (
    <Layouts>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <Card>
          <h2 className="text-2xl font-bold mb-3">Create a New Note</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <TextInput
                id="title"
                placeholder="Title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={4}
                placeholder="Your note..."
                {...register("content")}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>
            <Button type="submit">
              <HiOutlinePlus className="h-5 w-5 " />
              <p className="p-2">Create Note</p>
            </Button>
          </form>
        </Card>
      </div>
      <h2 className="text-xl font-bold mt-6">Your Notes</h2>

      {notes.length === 0 ? (
        <Card>
          <p>No notes yet — create one!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <Card key={note.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{note.title} </h3>
                  <p className="mt-2 whitespace-pre-wrap">{note.content}</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Button color="light" onClick={() => handleEdit(note.id)}>
                    <HiOutlinePencil className="h-5 w-5" />
                  </Button>
                  <Button color="failure" onClick={() => handleDelete(note.id)}>
                    <HiTrash className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Layouts>
  );
}
export default Note;
