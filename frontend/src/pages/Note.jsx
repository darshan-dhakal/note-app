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

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "https://note-app-hs3i.onrender.com/api/notes/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setNotes(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch notes");
    }
  };

  const onSubmit = async (data) => {
    if (isEditOpen && editNoteId !== null) {
      await axios.put(
        `https://note-app-hs3i.onrender.com/api/notes/${editNoteId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      window.location.reload();
      setNotes((prev) =>
        prev.map((n) => (n.id === editNoteId ? { ...n, ...data } : n))
      );
      reset();
      setIsEditOpen(false);
      setEditNoteId(null);
      reset({ title: "", content: "" });
    } else {
      await axios.post("https://note-app-hs3i.onrender.com/api/notes/", data, {
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
    reset({
      title: note.title,
      content: note.content,
      reminders: note.reminders,
    });
  };
  const handleDelete = async (id) => {
    const previousNotes = [...notes];
    try {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      setConfirmDeleteId(null); // close card immediately

      await axios.delete(`https://note-app-hs3i.onrender.com/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete note");
      setNotes(previousNotes);
    }
    // window.location.reload();
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
                <Label htmlFor="title" className="font-medium text-gray-700">
                  Title
                </Label>
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
                <Label htmlFor="content" className="font-medium text-gray-700">
                  Content
                </Label>
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
              <Controller
                name="reminders"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <ReminderInput
                    initialValue={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                {notes.map((note) => (
                  <Card
                    key={note.id}
                    className="p-6 rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 ">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {note.title}
                        </h3>
                        <p className="mt-3 text-gray-700 whitespace-pre-wrap leading-relaxed break-words">
                          {note.content}
                        </p>
                        {note.reminders.length > 0 && (
                          <div className="mt-3 space-y-1">
                            <p className="font-medium text-gray-600 text-sm">
                              Reminder:
                            </p>
                            {note.reminders.map((r) => (
                              <p key={r.id} className="text-sm text-gray-500">
                                {new Date(r.at).toLocaleString()}{" "}
                                {/* convert ISO -> readable */}
                              </p>
                            ))}
                          </div>
                        )}
                        {note.reminders?.length > 0 && (
                          <p className="text-sm text-gray-500">
                            Reminder status:{" "}
                            {note.reminders[0].emailed
                              ? "Email sent"
                              : "Pending"}
                          </p>
                        )}
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
                          onClick={() => setConfirmDeleteId(note.id)}
                        >
                          <HiTrash className="h-5 w-5" />
                        </Button>
                        {confirmDeleteId && (
                          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
                              <h3 className="text-xl font-semibold mb-3">
                                Confirm Deletion
                              </h3>

                              <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this note? This
                                action is permanent and cannot be undone.
                              </p>

                              <div className="flex justify-end gap-3">
                                <button
                                  className="px-4 py-2 rounded-md border border-gray-300"
                                  onClick={() => setConfirmDeleteId(null)}
                                >
                                  Cancel
                                </button>

                                <button
                                  className="px-4 py-2 rounded-md bg-red-600 text-white"
                                  onClick={() => handleDelete(confirmDeleteId)}
                                >
                                  Yes, Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
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
