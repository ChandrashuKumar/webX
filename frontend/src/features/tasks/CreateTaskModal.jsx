import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamByIdThunk } from "../teams/teamSlice";
import { createTaskThunk, updateTaskThunk } from "./taskSlice";
import { toast } from "react-toastify";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  assignee: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["To Do", "In Progress", "Done"]),
  labels: z.string().optional(),
});

export default function CreateTaskModal({ onClose, onSuccess, taskToEdit }) {
  const { token, user } = useSelector((state) => state.auth);
  const { currentTeam } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      priority: "Medium",
      status: "To Do",
    },
  });

  useEffect(() => {
    if (currentTeam?._id) {
      dispatch(fetchTeamByIdThunk({ token, teamId: currentTeam._id }));
    }
  }, [dispatch, token, currentTeam?._id]);

  useEffect(() => {
    if (taskToEdit) {
      setValue("title", taskToEdit.title || "");
      setValue("description", taskToEdit.description || "");
      setValue("dueDate", taskToEdit.dueDate?.slice(0, 10) || "");
      setValue("priority", taskToEdit.priority || "Medium");
      setValue("status", taskToEdit.status || "To Do");
      setValue("assignee", taskToEdit.assignee || "");
      setValue("labels", taskToEdit.labels?.join(", ") || "");
    }
  }, [taskToEdit, setValue]);

  const onSubmit = async (data) => {
    const labelsArray = data.labels
      ? data.labels.split(",").map((l) => l.trim()).filter(Boolean)
      : [];

    const taskData = {
      ...data,
      labels: labelsArray,
      team: currentTeam._id,
      reporter: user._id,
    };

    try {
      if (taskToEdit) {
        await dispatch(updateTaskThunk({ token, taskId: taskToEdit._id, taskData })).unwrap();
        toast.success("Task updated!");
      } else {
        await dispatch(createTaskThunk({ token, taskData })).unwrap();
        toast.success("Task created!");
      }
      onSuccess?.();
      reset();
      onClose();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {taskToEdit ? "Edit Task" : "Create New Task"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <label>Title*</label>
            <input
              {...register("title")}
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700"
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label>Status</label>
            <select {...register("status")} className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label>Priority</label>
            <select {...register("priority")} className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label>Assignee</label>
            <select {...register("assignee")} className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700">
              {currentTeam.members?.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Due Date</label>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700"
            />
          </div>

          <div className="col-span-2">
            <label>Labels (comma separated)</label>
            <input
              {...register("labels")}
              placeholder="bug, urgent, frontend"
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700"
            />
          </div>

          <div className="col-span-2">
            <label>Description</label>
            <textarea
              {...register("description")}
              rows="4"
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
              {isSubmitting ? (taskToEdit ? "Updating..." : "Creating...") : taskToEdit ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
