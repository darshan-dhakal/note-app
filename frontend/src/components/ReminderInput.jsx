// ReminderInput.jsx
// Props: initialReminder (ISO string or null), onChange({ reminderAt }) => void
// Usage: include this inside your Create/Edit Note form and send returned value to backend

import { useState, useEffect } from "react";

export default function ReminderInput({ initialReminder = null, onChange }) {
  // value used by <input type="datetime-local"> expects local datetime without timezone
  const [localValue, setLocalValue] = useState("");
  const [enabled, setEnabled] = useState(Boolean(initialReminder));
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialReminder) {
      // Convert ISO -> local 'YYYY-MM-DDTHH:mm' expected by datetime-local
      const dt = new Date(initialReminder);
      // pad helper
      const pad = (n) => (String(n).length === 1 ? `0${n}` : n);
      const local = `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(
        dt.getDate()
      )}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
      setLocalValue(local);
    }
  }, [initialReminder]);

  const emitChange = (val) => {
    // val is either ISO string or null
    onChange?.({ reminderAt: val });
  };

  const handleToggle = () => {
    setEnabled((v) => {
      const newV = !v;
      if (!newV) {
        setLocalValue("");
        emitChange(null);
      } else if (localValue) {
        // emit existing local value
        const iso = localToISO(localValue);
        emitChange(iso);
      }
      return newV;
    });
  };

  const localToISO = (local) => {
    // local: "YYYY-MM-DDTHH:mm" -> return ISO string in UTC
    const date = new Date(local);
    return date.toISOString();
  };

  const handleInput = (e) => {
    const v = e.target.value; // "YYYY-MM-DDTHH:mm"
    setLocalValue(v);
    setError("");
    // Validate not in past (use local timezone)
    const selected = new Date(v);
    const now = new Date();
    if (selected.getTime() <= now.getTime()) {
      setError("Reminder time must be in the future");
      emitChange(null);
      return;
    }

    const iso = localToISO(v);
    emitChange(iso);
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={enabled} onChange={handleToggle} />
        <span className="font-medium">Set reminder</span>
      </label>

      {enabled && (
        <div className="grid gap-1">
          <input
            type="datetime-local"
            value={localValue}
            onChange={handleInput}
            className="border rounded px-2 py-1"
            aria-label="Reminder date and time"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <p className="text-xs text-gray-500">
            We will send an email at the selected local time.
          </p>
        </div>
      )}
    </div>
  );
}
