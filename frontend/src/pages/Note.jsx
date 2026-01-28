import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../schemas/noteSchema";
import Layouts from "../components/Layouts";
import { Label, Textarea, TextInput, Button, Card } from "flowbite-react";
import { HiOutlinePlus, HiOutlinePencil, HiX } from "react-icons/hi";
import { CreatedNotes } from "../components/CreatedNotes";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/notes/`,
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
    if (editNoteId !== null) {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/notes/${editNoteId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setNotes((prev) =>
        prev.map((n) => (n.id === editNoteId ? { ...n, ...data } : n))
      );
      reset();
      setIsModalOpen(false);
      setEditNoteId(null);
    } else {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/notes/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setNotes((prev) => [res.data, ...prev]);
      reset({ title: "", content: "", reminders: [] });
      setIsModalOpen(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditNoteId(null);
    reset({ title: "", content: "", reminders: [] });
    setIsModalOpen(true);
  };

  const handleEdit = (note) => {
    setEditNoteId(note.id);
    reset({
      title: note.title,
      content: note.content,
      reminders: note.reminders,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditNoteId(null);
    reset({ title: "", content: "", reminders: [] });
  };

  const handleDelete = async (id) => {
    const previousNotes = [...notes];
    try {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      setConfirmDeleteId(null);

      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete note");
      setNotes(previousNotes);
    }
  };

  return (
    <Layouts>
      <div className="min-h-screen py-10 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          {/* Header with Plus Button */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Your Notes</h1>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
            >
              <HiOutlinePlus className="h-6 w-6" />
              New Note
            </button>
          </div>

          {/* Notes Grid */}
          {notes.length === 0 ? (
            <Card className="p-6 text-center shadow-md bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-lg">You have no notes yet.</p>
              <p className="text-gray-400 dark:text-gray-500 mt-2">
                Create your first note by clicking the "New Note" button.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {notes.map((note) => (
                <CreatedNotes
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  confirmDeleteId={confirmDeleteId}
                  setConfirmDeleteId={setConfirmDeleteId}
                />
              ))}
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
                  {editNoteId ? "Edit Note" : "Create a New Note"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                >
                  <HiX className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </Label>
                  <TextInput
                    id="title"
                    placeholder="Enter a clear and descriptive title"
                    className="text-lg"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="content"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
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

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <Button
                    color="gray"
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex items-center gap-2 px-5"
                  >
                    {editNoteId ? (
                      <>
                        <HiOutlinePencil className="h-5 w-5" />
                        Update Note
                      </>
                    ) : (
                      <>
                        <HiOutlinePlus className="h-5 w-5" />
                        Create Note
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </Layouts>
  );
}
