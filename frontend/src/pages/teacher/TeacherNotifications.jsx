import { useEffect, useState } from "react";

import TeacherSidebar from "../../components/TeacherSidebar";
import { getNotifications } from "../../api/notifications";

function TeacherNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);
        setError("");

        const response = await getNotifications();

        if (response.success) {
          setNotifications(response.data || []);
        } else {
          setError(
            response.message || "Failed to load notifications."
          );
        }
      } catch (err) {
        setError(
          err.message || "Failed to load notifications."
        );
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090b10]">
      <TeacherSidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Notifications
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Stay updated with important announcements and updates.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-slate-600 dark:text-slate-400">
              Loading notifications...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Notifications */}
        {!loading && !error && (
          <>
            {notifications.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/[0.06] dark:bg-[#0d1017]">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  No notifications
                </h2>

                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  You are all caught up. There are no notifications at the moment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-white/[0.06] dark:bg-[#0d1017]"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {notification.title || "Notification"}
                        </h2>

                        <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                          {notification.message ||
                            notification.content ||
                            "No notification details available."}
                        </p>
                      </div>

                      <span className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {notification.createdAt
                          ? new Date(
                              notification.createdAt
                            ).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default TeacherNotifications;