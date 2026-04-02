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
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="font-medium text-slate-800 dark:text-slate-100">Enable reminder</span>
      </label>

      {enabled && (
        <div className="mt-3 space-y-1">
          <p className="text-xs text-slate-500 dark:text-slate-300">Pick date & time for notification</p>
          <input
            type="datetime-local"
            value={localValue}
            onChange={handleInput}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
}
