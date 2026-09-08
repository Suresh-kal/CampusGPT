import { useEffect, useState } from "react";

import TeacherSidebar from "../../components/TeacherSidebar";
import { getDocuments } from "../../api/documents";

function TeacherDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDocuments() {
      try {
        setLoading(true);
        setError("");

        const response = await getDocuments();

        if (response.success) {
          setDocuments(response.data || []);
        } else {
          setError(
            response.message || "Failed to load documents."
          );
        }
      } catch (err) {
        setError(
          err.message || "Failed to load documents."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090b10]">
      <TeacherSidebar />

      <main className="ml-64 min-h-screen p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            My Documents
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            View and manage your uploaded documents.
          </p>
        </div>

        {loading && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-slate-600 dark:text-slate-400">
              Loading documents...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {documents.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/[0.06] dark:bg-[#0d1017]">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  No documents found
                </h2>

                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  You have not uploaded any documents yet.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/[0.06] dark:bg-[#0d1017]">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-slate-200 dark:border-white/[0.06]">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Document
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Subject
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Uploaded
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {documents.map((document) => (
                        <tr
                          key={document._id}
                          className="border-b border-slate-100 last:border-b-0 dark:border-white/[0.04]"
                        >
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                            {document.title || "Untitled Document"}
                          </td>

                          <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                            {document.subject?.name ||
                              document.subject ||
                              "—"}
                          </td>

                          <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                            {document.createdAt
                              ? new Date(
                                  document.createdAt
                                ).toLocaleDateString()
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default TeacherDocuments;