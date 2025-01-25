import { Copy, PlusCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import noteContext from "../context/notes/noteContext";
import { useLocation, useNavigate } from "react-router-dom";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote, editNote } = context;
  const location = useLocation();
  const navigate = useNavigate();

  // Extract existing note if provided
  const existingNote = location.state?.note;
  const readonly = location.state?.readOnly;

  const [value, setValue] = useState(""); // Description
  const [title, setTitle] = useState(""); // Title
  const [tag, setTag] = useState(""); // Tag

  // Initialize form values if editing
  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setValue(existingNote.description);
      setTag(existingNote.tag);
    }
  }, [existingNote]);

  // Handle form submission
  const handleSubmit = () => {
    if (existingNote) {
      // Update existing note
      editNote(existingNote._id, title, value, tag);
      toast.success("Note Updated Successfully");
      navigate("/codes");
    } else {
      // Add new note
      addNote(title, value, tag);
      toast.success("Note Added Successfully");
    }

    // Reset the form and navigate
    resetForm(); // Redirect to the home or notes page
  };

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setValue("");
    setTag("");
  };

  return (
    <div className="container mb-2 mt-0">
      <div className="row justify-content-center">
        {/* Title and Buttons */}
        <div className="col-12 col-md-10 d-flex align-items-center gap-3 mb-4">
          <input
            style={{ width: "91%" }}
            type="text"
            disabled={readonly}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`form-control ${
              existingNote ? "col-9" : "col-10"
            } rounded-4`}
            required
          />

          {/* Conditionally render buttons based on readonly */}
          {!readonly && (
            <>
              <button
                className="btn btn-outline-success mx-1 rounded-4"
                onClick={handleSubmit}
                disabled={title.length < 3 || value.length < 5}
              >
                {existingNote ? "Update" : "Create"}
              </button>
            </>
          )}
          {existingNote && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate("/");
              }}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        {/* Note Content */}
        <div className="col-12 col-md-10">
          <div className="card rounded-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                <div
                  className="rounded-circle bg-danger"
                  style={{ width: "12px", height: "12px" }}
                ></div>
                <div
                  className="rounded-circle bg-warning"
                  style={{ width: "12px", height: "12px" }}
                ></div>
                <div
                  className="rounded-circle bg-success"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              </div>

              <button
                className="btn btn-light"
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy size={20} />
              </button>
            </div>

            <div className="card-body">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Write Your Code Here..."
                className="form-control rounded-4"
                disabled={readonly}
                rows={16}
                required
              />
              <div className="mt-3">
                <input
                  type="text"
                  disabled={readonly}
                  placeholder="Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="form-control rounded-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
