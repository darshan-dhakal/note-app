import { useState } from "react";
import {
  Button,
  Card,
  Textarea,
  TextInput,
  Modal,
  Label,
} from "flowbite-react";
import { HiOutlinePencil, HiTrash, HiOutlinePlus } from "react-icons/hi";

// import { useForm } from "react-hook-form";

export function Home() {
  // const [notes, setNotes] = useState([
  //   { id: 1, title: "First Note", content: "This is my first note" },
  //   { id: 2, title: "Second Note", content: "Another note here" },
  // ]);

  // const [isEditOpen, setIsEditOpen] = useState(false);
  // const [editingId, setEditingId] = useState(null);

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (data) => {
  //   if (editingId !== null) {
  //     setNotes((prev) =>
  //       prev.map((n) => (n.id === editingId ? { ...n, ...data } : n))
  //     );

  //     setEditingId(null);
  //     setIsEditOpen(false);
  //     reset();
  //     return;
  //   }

  //   const newNote = {
  //     id: Date.now(),
  //     ...data,
  //   };

  //   setNotes((prev) => [newNote, ...prev]);
  //   reset();
  // };

  // const handleDelete = (id) => {
  //   const ok = window.confirm("Delete this note?");
  //   if (!ok) return;
  //   setNotes((prev) => prev.filter((n) => n.id !== id));
  // };

  // const handleEdit = (id) => {
  //   const note = notes.find((n) => n.id === id);
  //   if (!note) return;

  //   setEditingId(id);
  //   setIsEditOpen(true);
  //   reset({ title: note.title, content: note.content });
  // };

  // const cancelEdit = () => {
  //   setEditingId(null);
  //   setIsEditOpen(false);
  //   reset();
  // };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-3">Create a New Note</h2>

        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="title">Title</Label>
            <TextInput
              id="title"
              placeholder="Title"
              // {...register("title", { required: "Title is required" })}
            />
            {/* {errors.title && ( */}
            {/* <p className="text-red-500 text-sm">{errors.title.message}</p> */}
            {/* // )} */}
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              rows={4}
              placeholder="Your note..."
              // {...register("content", { required: "Content is required" })}
            />
            {/* {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )} */}
          </div>

          <div className="flex gap-2 items-center">
            <Button type="submit">
              <HiOutlinePlus className="h-5 w-5 mr-2" />
              {/* {editingId ? "Save Note" : "Create Note"} */}
            </Button>
            {/* {editingId && ( */}
            <Button
              color="light"
              // onClick={cancelEdit}
            >
              Cancel
            </Button>
            {/* )} */}
          </div>
        </form>
      </Card>

      <h2 className="text-xl font-bold mt-6">Your Notes</h2>

      {/* {notes.length === 0 ? ( */}
      <Card>
        <p>No notes yet — create one!</p>
      </Card>
      {/* ) : ( */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* {notes.map((note) => ( */}
        <Card
        // key={note.id}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{/* {note.title} */}</h3>
              <p className="mt-2 whitespace-pre-wrap">{/* {note.content} */}</p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <Button
                color="light"
                //  onClick={() => handleEdit(note.id)}
              >
                <HiOutlinePencil className="h-5 w-5" />
              </Button>
              <Button
                color="failure"
                // onClick={() => handleDelete(note.id)}
              >
                <HiTrash className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
        {/* ))} */}
      </div>
      {/* )} */}

      <Modal
      // show={isEditOpen}
      // onClose={cancelEdit}
      >
        <Modal.Header>Edit Note</Modal.Header>
        <Modal.Body>
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <Label>Title</Label>
              <TextInput
                placeholder="Title"
                // {...register("title", { required: "Title is required" })}
              />
              {/* {errors.title && (
                // <p className="text-red-500 text-sm">{errors.title.message}</p>
              )} */}
            </div>

            <div>
              <Label>Content</Label>
              <Textarea
                rows={4}
                placeholder="Your note..."
                // {...register("content", { required: "Content is required" })}
              />
              {/* {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )} */}
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit">Save</Button>
              <Button
                color="light"
                // onClick={cancelEdit}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
// export { Home };
