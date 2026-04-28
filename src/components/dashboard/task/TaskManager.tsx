type TaskManagerProps = {
  isOpen: boolean;
};

export default function TaskManager({ isOpen }: TaskManagerProps) {
  return (
    <main
      className={`absolute inset-0 p-8 transition-all duration-300 ease-in-out
        ${isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"}
      `}
    >
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Task Manager
          </h1>

          <span className="text-sm text-gray-500">
            2 tasks left
          </span>
        </div>

        {/* Add Task */}
        <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <input
            placeholder="What do you need to do?"
            className="flex-1 px-3 py-2 outline-none text-sm"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg 
          hover:bg-blue-700 active:scale-95 transition text-sm font-medium">
            + Add
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {["All", "Active", "Done"].map((item, i) => (
            <button
              key={i}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition
                ${i === 0
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-600 hover:bg-gray-100"}
              `}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3">

          {/* Active Task */}
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between group">
            
            <div className="flex items-center gap-3">
              {/* Toggle */}
              <button className="w-6 h-6 rounded-full border-2 border-gray-300 
              flex items-center justify-center transition 
              hover:border-blue-500 active:scale-90">
              </button>

              {/* Text */}
              <div>
                <p className="font-medium text-gray-800">
                  Build React Dashboard
                </p>
                <p className="text-xs text-gray-400">
                  2 hours ago
                </p>
              </div>
            </div>

            {/* Delete */}
            <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition">
              ✕
            </button>
          </div>

          {/* Done Task */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between opacity-70">
            
            <div className="flex items-center gap-3">
              {/* Toggle Done */}
              <button className="w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-600 
              flex items-center justify-center text-white text-xs">
                ✓
              </button>

              {/* Text */}
              <div>
                <p className="font-medium text-gray-400 line-through">
                  Learn Redux Toolkit
                </p>
                <p className="text-xs text-gray-400">
                  Yesterday
                </p>
              </div>
            </div>

            <button className="text-gray-400 hover:text-red-500 transition">
              ✕
            </button>
          </div>

        </div>

        {/* Empty State */}
        <div className="text-center pt-8">
          <div className="text-5xl mb-2">📭</div>
          <p className="text-gray-400 text-sm">
            No tasks yet. Start by adding one!
          </p>
        </div>

      </div>
    </main>
  );
}