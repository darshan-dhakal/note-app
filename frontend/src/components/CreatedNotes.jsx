import { useState } from "react";
import { Card, Button } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlinePencil, HiTrash, HiX } from "react-icons/hi";

export function CreatedNotes({
  note,
  onEdit,
  onDelete,
  confirmDeleteId,
  setConfirmDeleteId,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const formatReminderText = (reminderDate) => {
    const date = new Date(reminderDate);
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateStr = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return `Reminder is set at: ${timeStr} on ${dateStr}`;
  };

  return (
    <>
      <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Card
        className="glass-card cursor-pointer rounded-2xl border-0 p-5"
        onClick={toggleOpen}
      >
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 dark:text-white md:text-xl">
            {note.title}
          </h3>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-300">Note</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{note.content}</p>
        {note.reminders && note.reminders.length > 0 && (
          <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
            {formatReminderText(note.reminders[0].at)}
          </p>
        )}
      </Card>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="w-full max-w-2xl"
            >
              <Card className="glass-card max-h-[90vh] overflow-y-auto rounded-2xl border-0 p-7">
                <div className="mb-6 flex items-start justify-between">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{note.title}</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <HiX className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                  </button>
                </div>

                <p className="mb-5 whitespace-pre-wrap wrap-break-word leading-relaxed text-slate-700 dark:text-slate-200">
                  {note.content}
                </p>

                {note.reminders && note.reminders.length > 0 && (
                  <div className="mb-6 space-y-2 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Reminders</p>
                    {note.reminders.map((r) => (
                      <div key={r.id} className="text-sm">
                        <p className="text-slate-600 dark:text-slate-300">{new Date(r.at).toLocaleString()}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Status: {r.emailed ? "Email sent" : "Pending"}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                  <Button
                    color="light"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                      onEdit(note);
                    }}
                  >
                    <HiOutlinePencil className="mr-2 h-5 w-5" />
                    Edit
                  </Button>

                  <Button
                    color="failure"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDeleteId(note.id);
                    }}
                  >
                    <HiTrash className="mr-2 h-5 w-5" />
                    Delete
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDeleteId === note.id && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/55 p-4"
          >
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }} className="glass-card w-full max-w-md rounded-2xl p-6">
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">Confirm deletion</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-300">
                This note will be permanently removed and cannot be restored.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                  onClick={() => onDelete(confirmDeleteId)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
