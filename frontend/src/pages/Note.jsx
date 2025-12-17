import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../schemas/noteSchema";
import Layouts from "../components/Layouts";
import { Label, Textarea, TextInput, Button, Card } from "flowbite-react";
import { HiOutlinePlus, HiOutlinePencil, HiTrash } from "react-icons/hi";
import ReminderInput from "../components/ReminderInput";

export default function Note() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
      reminders: [],
    },
  });

  const [notes, setNotes] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [loading, setLoading] = useState(false); // NEW

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/notes/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setNotes(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
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
        setIsEditOpen(false);
        setEditNoteId(null);
      } else {
        await axios.post("http://localhost:3000/api/notes/", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        window.location.reload();
      }
      reset({ title: "", content: "", reminders: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsEditOpen(true);
    setEditNoteId(note.id);
    reset({
      title: note.title,
      content: note.content,
      reminders: note.reminders,
    });
  };

  const handleDelete = async (id) => {
    const previousNotes = [...notes];
    setLoading(true);
    try {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      setConfirmDeleteId(null);

      await axios.delete(`http://localhost:3000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete note");
      setNotes(previousNotes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layouts>
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800"></div>
        </div>
      )}

      <div className="min-h-screen py-10 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Form Card */}
          <Card className="shadow-xl rounded-2xl p-8 border border-gray-200 bg-white">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 mb-6">
              {isEditOpen ? "Edit Note" : "Create a New Note"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <TextInput
                  id="title"
                  placeholder="Enter a clear and descriptive title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  rows={5}
                  placeholder="Write your note here..."
                  {...register("content")}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <Controller
                name="reminders"
                control={control}
                render={({ field }) => (
                  <ReminderInput
                    initialValue={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <div className="flex gap-3">
                <Button type="submit" className="flex items-center gap-2">
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
                      reset({ title: "", content: "", reminders: [] });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Notes List */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>

            {notes.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-gray-500">You have no notes yet.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notes.map((note) => (
                  <Card key={note.id} className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{note.title}</h3>
                        <p className="mt-2 whitespace-pre-wrap">
                          {note.content}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Button color="light" onClick={() => handleEdit(note)}>
                          <HiOutlinePencil className="h-5 w-5" />
                        </Button>

                        <Button
                          color="failure"
                          onClick={() => setConfirmDeleteId(note.id)}
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
