import { useState } from "react";
import { Card, Button } from "flowbite-react";
import { HiOutlinePencil, HiTrash, HiChevronDown, HiX } from "react-icons/hi";

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
      <Card
        className="p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
            {note.title}
          </h3>
          <span className="text-gray-500">
            {/* <HiChevronDown className="h-5 w-5" /> */}
          </span>
        </div>
        {note.reminders && note.reminders.length > 0 && (
          <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
            {formatReminderText(note.reminders[0].at)}
          </p>
        )}
      </Card>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{note.title}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
              >
                <HiX className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed break-words mb-4">
              {note.content}
            </p>

            {note.reminders && note.reminders.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                  Reminders:
                </p>
                {note.reminders.map((r) => (
                  <div key={r.id} className="text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(r.at).toLocaleString()}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                      Status: {r.emailed ? "Email sent" : "Pending"}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                color="light"
                className="shadow-sm hover:bg-gray-100 flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  onEdit(note);
                }}
              >
                <HiOutlinePencil className="h-5 w-5 mr-2" />
                Edit
              </Button>

              <Button
                color="failure"
                className="shadow-sm flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDeleteId(note.id);
                }}
              >
                <HiTrash className="h-5 w-5 mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}

      {confirmDeleteId === note.id && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Confirm Deletion</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this note? This action is
              permanent and cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800 transition"
                onClick={() => onDelete(confirmDeleteId)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
