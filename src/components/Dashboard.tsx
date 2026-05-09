import { useSearchParams } from "react-router-dom";

import TaskManager from "./dashboard/task/TaskManager";
import ProductExplorer from "./dashboard/product/ProductExplorer";

const Tab = {
  TASK: "TASK",
  PRODUCT: "PRODUCT",
} as const;

type TabType =
  typeof Tab[keyof typeof Tab];

export default function DashboardUI() {

  const [searchParams, setSearchParams] =
    useSearchParams();

  /*
    URL STATE
  */

  const currentTab =
    (searchParams.get("tab") as TabType) ||
    Tab.TASK;

  /*
    HANDLERS
  */

  const handleTab = (tab: TabType) => {

    setSearchParams((prev) => {

      /*
        CURRENT TAB
      */

      prev.set("tab", tab);

      /*
        CLEAN URL STATE
      */

      if (tab === Tab.TASK) {

        // remove product states
        prev.delete("page");
        prev.delete("search");
        prev.delete("filter");

      }

      if (tab === Tab.PRODUCT) {

        // remove task states
        prev.delete("taskFilter");
      }

      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between">

        <div>

          <h2 className="text-xl font-bold text-gray-800 mb-8">
            My Dashboard
          </h2>

          <nav className="space-y-2">

            {/* TASK */}
            <div
              onClick={() =>
                handleTab(Tab.TASK)
              }
              className={`
                px-4 py-2 rounded-lg cursor-pointer transition
                ${currentTab === Tab.TASK
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"}
              `}
            >
              TASK MANAGER
            </div>

            {/* PRODUCT */}
            <div
              onClick={() =>
                handleTab(Tab.PRODUCT)
              }
              className={`
                px-4 py-2 rounded-lg cursor-pointer transition
                ${currentTab === Tab.PRODUCT
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"}
              `}
            >
              PRODUCT EXPLORER
            </div>

          </nav>

        </div>

        {/* Logout */}
        <button
          className="
            flex items-center gap-2
            px-3 py-2 rounded-lg text-sm font-medium
            text-gray-500
            hover:text-red-500 hover:bg-red-50
            transition-all duration-200
            group
          "
        >
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>

          Logout
        </button>

      </aside>

      {/* Content */}
      <main className="flex-1 relative overflow-y-auto">

        <TaskManager
          isOpen={
            currentTab === Tab.TASK
          }
        />

        <ProductExplorer
          isOpen={
            currentTab === Tab.PRODUCT
          }
        />

      </main>

    </div>
  );
}