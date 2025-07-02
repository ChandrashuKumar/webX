// components/TaskCard.jsx
export default function TaskCard({ task }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg hover:bg-gray-700 cursor-pointer border border-gray-700 transition-transform duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-white text-lg">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full text-white ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>
      <p className="text-sm text-gray-300 mb-2">
        {task.description || "No description"}
      </p>

      {task.labels?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.labels.map((label, idx) => (
            <span
              key={idx}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-sm"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="mt-2">
        <span className="text-sm text-gray-200 font-medium bg-gray-700 px-2 py-1 rounded-md">
          Due: {task.dueDate?.slice(0, 10) || "N/A"}
        </span>
      </div>
    </div>
  );
}
