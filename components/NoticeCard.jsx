export default function NoticeCard({ notice, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${notice.title}"?`)) {
      onDelete(notice.id);
    }
  };

  const dateStr = new Date(notice.publishDate).toLocaleDateString();

  const categoryStyles = {
    Exam: "bg-blue-100 text-blue-700 border-blue-200",
    Event: "bg-green-100 text-green-700 border-green-200",
    General: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
      {notice.image && (
        <img
          src={notice.image}
          alt={notice.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="text-xl font-bold text-gray-900 break-words">
            {notice.title}
          </h3>

          {notice.priority === "Urgent" && (
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full border border-red-200">
              Urgent
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow whitespace-pre-wrap">
          {notice.body}
        </p>

        <div className="flex items-center justify-between mb-5">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full border ${
              categoryStyles[notice.category]
            }`}
          >
            {notice.category}
          </span>

          <span className="text-sm text-gray-500"> {dateStr}</span>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(notice)}
            className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-50 text-red-700 font-medium hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
