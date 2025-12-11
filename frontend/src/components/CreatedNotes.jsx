import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export function CreatedNotes() {
  const [notes, setNotes] = useState([]);
  // const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async (data) => {
    try {
      const res = await axios.get("http://localhost:3000/api/notes/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setNotes(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch notes");
    }
  };
  return (
    <Card href="#" className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {notes?.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {notes?.content}
      </p>
    </Card>
  );
}
