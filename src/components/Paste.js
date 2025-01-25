import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

// Utility function to format date
const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Utility function to truncate text
const truncateText = (text, limit) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

const Paste = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, deleteNote } = context;
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const navigate = useNavigate();

  // Fetch notes on component mount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes(); // Fetch notes from context
    } else {
      navigate("/login");
    }
  }, []);

  // Filter notes based on search term
  const filteredPastes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mb-2">
      <div className="d-flex justify-content-center mb-4 ">
        <input
          type="search"
          placeholder="Search Code Note..."
          className="form-control rounded-4"
          style={{ width: "20%" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card rounded-4">
        <div className="card-header d-flex justify-content-between">
          <h2 className="h4">All Codes</h2>
          <div className="d-flex gap-2 mt-3 mx-1">
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
        </div>
        <div className="card-body ">
          {filteredPastes.length > 0 ? (
            filteredPastes.map((note) => (
              <div key={note._id} className="card mb-3 rounded-4">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">
                      {truncateText(note.description, 100)}{" "}
                      {/* Truncate description */}
                    </p>
                    <small className="text-muted">
                      <Calendar size={16} className="me-1" />
                      {formatDate(note.date)}
                    </small>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() =>
                        navigate("/updatenote", { state: { note } }) // Navigate to AddNote with note as state
                      }
                    >
                      <PencilLine size={16} />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        deleteNote(note._id);
                        toast.success("Deleted Successfully");
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => {
                        toast.success(`Viewing note: ${note.title}`);

                        navigate("/updatenote", { state: { note, readOnly: true } });
                      }}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => {
                        navigator.clipboard.writeText(note.description);
                        toast.success("Copied to Clipboard");
                      }}
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-danger">No Notes Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
