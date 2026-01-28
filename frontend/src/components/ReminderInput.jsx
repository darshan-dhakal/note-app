import { useState, useEffect } from "react";

// initialValue: [{ at: ISO string }] or []
// onChange: field.onChange from RHF
export default function ReminderInput({ initialValue = [], onChange }) {
  const [enabled, setEnabled] = useState(initialValue.length > 0);
  const [localValue, setLocalValue] = useState(
    initialValue[0]?.at
      ? new Date(initialValue[0].at).toISOString().slice(0, 16)
      : ""
  );
  const [error, setError] = useState("");

  // emit changes to RHF safely whenever localValue or enabled changes
  useEffect(() => {
    if (!enabled || !localValue) {
      onChange([]);
      return;
    }

    const iso = new Date(localValue).toISOString();
    onChange([{ at: iso }]);
  }, [enabled, localValue, onChange]);

  const handleToggle = () => {
    setEnabled((prev) => {
      const next = !prev;

      if (next && !localValue) {
        // set default 5-min future
        const future = new Date(Date.now() + 60 * 1000);
        const pad = (n) => String(n).padStart(2, "0");
        const local = `${future.getFullYear()}-${pad(
          future.getMonth() + 1
        )}-${pad(future.getDate())}T${pad(future.getHours())}:${pad(
          future.getMinutes()
        )}`;
        setLocalValue(local);
      }

      if (!next) setLocalValue("");

      return next;
    });
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (new Date(value) <= new Date()) {
      setError("Reminder must be in the future");
      return;
    }
    setError("");
    setLocalValue(value);
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={enabled} onChange={handleToggle} />
        <span className="font-medium dark:text-white">Set reminder</span>
      </label>

      {enabled && (
        <div className="space-y-1">
          <input
            type="datetime-local"
            value={localValue}
            onChange={handleInput}
            className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
          />
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
}
