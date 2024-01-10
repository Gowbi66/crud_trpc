// Import necessary dependencies and components
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { type RouterOutputs } from "../utils/api";

// Define the Note type
type Note = RouterOutputs["note"]["getAll"][0];

// NoteCard component
export const NoteCard = ({
  note,
  onDelete,
  onUpdate,
}: {
  note: Note;
  onDelete: () => void;
  onUpdate: (updatedNote: Note) => void;
}) => {
  // State for tracking editing status and edited note
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedNote, setEditedNote] = useState<Note>({ ...note });

  const toggleExpanded = () => {
    if (!isEditing) {
      setIsExpanded((prevExpanded) => !prevExpanded);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(editedNote);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };
  return (
    <div className="card mt-20 border border-gray-200 bg-base-100 shadow-xl">
    <div className="card-body m-0 p-3">
      <div
        className={`collapse-arrow ${isExpanded ? "collapse-open" : ""} collapse`}
        onClick={toggleExpanded}
      >
          {isEditing ? (
            <div>
             <input
              type="text"
              name="title"
              value={editedNote.title}
              onChange={handleInputChange}
              className="border border-red-500 rounded-md p-3 mb-3 w-full  bg-white-600"

              placeholder="Enter a title..."
            />
            <textarea
              name="content"
              value={editedNote.content}
              onChange={handleInputChange}
              rows={5}
              className="border rounded-md p-2 w-full resize-none focus:outline-none focus:ring focus:border-red-300"
              placeholder="Enter content..."
            />
            </div>
          ) : ( 
            <div
            className={`collapse-arrow ${
              isExpanded ? "collapse-open" : ""
            } collapse`} 
          >
              <div className="collapse-title text-xl font-bold">
                {isExpanded ? editedNote.title : note.title}
              </div>
              {isExpanded && (
                <div className="collapse-content">
                  <article className="prose lg:prose-xl">
                    <ReactMarkdown>
                      {editedNote.content || note.content
                        ? editedNote.content || note.content
                        : "No content available"}
                    </ReactMarkdown>
                  </article>
                </div>
              )}
            </div> 
          )}
          </div>
        <div className="card-actions mx-2 flex justify-end">
          {!isEditing ? (
            <button className="bg-red-600 btn-primary-content text-white btn-xs btn px-5 " onClick={onDelete}>
              Delete
            </button>
          ) : (
            <button className="btn-success btn-xs btn px-5 bg-blue-600" onClick={handleSaveClick}>
              Save
            </button>
          )}
          <button
            className="btn-danger btn-xs btn px-5 ml-2 bg-green-600"
            onClick={() => (isEditing ? setIsEditing(false) : handleEditClick())}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};
