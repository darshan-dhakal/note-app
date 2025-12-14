// // ReminderInput.jsx
// // Props: initialReminder (ISO string or null), onChange({ reminderAt }) => void
// // Usage: include this inside your Create/Edit Note form and send returned value to backend

// import { useState, useEffect } from "react";

// export default function ReminderInput({ initialReminder = null, onChange }) {
//   // value used by <input type="datetime-local"> expects local datetime without timezone
//   const [localValue, setLocalValue] = useState("");
//   const [enabled, setEnabled] = useState(Boolean(initialReminder));
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (initialReminder) {
//       // Convert ISO -> local 'YYYY-MM-DDTHH:mm' expected by datetime-local
//       const dt = new Date(initialReminder);
//       // pad helper
//       const pad = (n) => (String(n).length === 1 ? `0${n}` : n);
//       const local = `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(
//         dt.getDate()
//       )}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
//       setLocalValue(local);
//       console.log(localValue);
//     }
//   }, [initialReminder]);

//   const emitChange = (val) => {
//     // val is either ISO string or null
//     onChange?.(val ? [{ at: val }] : []);
//   };

//   const handleToggle = () => {
//     setEnabled((v) => {
//       const newV = !v;
//       if (!newV) {
//         setLocalValue("");
//         emitChange(null);
//         return newV;
//       }
//       const nowPlus5 = new Date(Date.now() + 5 * 60 * 1000);
//       const pad = (n) => String(n).padStart(2, "0");

//       const local = `${nowPlus5.getFullYear()}-${pad(
//         nowPlus5.getMonth() + 1
//       )}-${pad(nowPlus5.getDate())}T${pad(nowPlus5.getHours())}:${pad(
//         nowPlus5.getMinutes()
//       )}`;

//       setLocalValue(local);
//       emitChange(localToISO(local));

//       return newV;
//     });
//   };

//   const localToISO = (local) => {
//     // local: "YYYY-MM-DDTHH:mm" -> return ISO string in UTC
//     const date = new Date(local);
//     return date.toISOString();
//   };

//   const handleInput = (e) => {
//     const v = e.target.value; // "YYYY-MM-DDTHH:mm"
//     setLocalValue(v);
//     setError("");
//     // Validate not in past (use local timezone)
//     const selected = new Date(v);
//     const now = new Date();
//     if (selected.getTime() <= now.getTime()) {
//       setError("Reminder time must be in the future");
//       emitChange(null);
//       return;
//     }

//     const iso = localToISO(v);
//     console.log(iso);
//     emitChange(iso);
//   };

//   return (
//     <div className="space-y-2">
//       <label className="flex items-center gap-2">
//         <input type="checkbox" checked={enabled} onChange={handleToggle} />
//         <span className="font-medium">Set reminder</span>
//       </label>

//       {enabled && (
//         <div className="grid gap-1">
//           <input
//             type="datetime-local"
//             value={localValue}
//             onChange={handleInput}
//             className="border rounded px-2 py-1"
//             aria-label="Reminder date and time"
//           />
//           {error && <p className="text-sm text-red-600">{error}</p>}
//           <p className="text-xs text-gray-500">
//             We will send an email at the selected local time.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
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
        <span className="font-medium">Set reminder</span>
      </label>

      {enabled && (
        <div className="space-y-1">
          <input
            type="datetime-local"
            value={localValue}
            onChange={handleInput}
            className="border rounded px-2 py-1"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
