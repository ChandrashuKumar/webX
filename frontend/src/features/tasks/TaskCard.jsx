// components/TaskCard.jsx
export default function TaskCard({ task }) {
  return (
    <div className="bg-gray-800 rounded-md p-4 shadow hover:bg-gray-700 cursor-pointer">
      <h3 className="font-semibold text-white">{task.title}</h3>
      <p className="text-sm text-gray-400">{task.description || "No description"}</p>
      <p className="text-xs mt-2 text-gray-500">Priority: {task.priority}</p>
      <p className="text-xs text-gray-500">Due: {task.dueDate?.slice(0, 10) || "N/A"}</p>
    </div>
  );
}
