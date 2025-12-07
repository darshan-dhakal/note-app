import { Label, Textarea } from "flowbite-react";

export function Component() {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="comment">Create your New Note</Label>
      </div>

      <Textarea
        id="comment"
        placeholder="your note here..."
        required
        rows={4}
      />
    </div>
  );
}
