import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../schemas/noteSchema";
import Layouts from "../components/Layouts";
import { Label, Textarea, TextInput, Button, Card } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
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
      <div className="section-shell py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">My Workspace</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">All your notes and reminder plans in one place.</p>
            </div>
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
            >
              <HiOutlinePlus className="h-6 w-6" />
              New Note
            </button>
          </div>

          {notes.length === 0 ? (
            <Card className="glass-card rounded-2xl border-0 p-8 text-center">
              <p className="text-lg font-semibold text-slate-800 dark:text-white">No notes yet</p>
              <p className="mt-2 text-slate-500 dark:text-slate-300">
                Create your first note by clicking the "New Note" button.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
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

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-2xl"
              >
                <Card className="glass-card max-h-[90vh] overflow-y-auto rounded-2xl border-0 p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                  {editNoteId ? "Edit Note" : "Create a New Note"}
                    </h2>
                    <button
                      onClick={handleCloseModal}
                      className="rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <HiX className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="font-medium text-slate-700 dark:text-slate-300">
                        Title
                      </Label>
                      <TextInput
                        id="title"
                        placeholder="Enter a clear and descriptive title"
                        sizing="lg"
                        {...register("title")}
                      />
                      {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content" className="font-medium text-slate-700 dark:text-slate-300">
                        Content
                      </Label>
                      <Textarea
                        id="content"
                        rows={6}
                        placeholder="Write your note here..."
                        className="text-base"
                        {...register("content")}
                      />
                      {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
                    </div>

                    <Controller
                      name="reminders"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <ReminderInput initialValue={field.value} onChange={field.onChange} />
                      )}
                    />

                    <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-700 sm:flex-row">
                      <Button color="light" type="button" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                      <Button type="submit" color="blue" className="flex items-center gap-2">
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layouts>
  );
}
