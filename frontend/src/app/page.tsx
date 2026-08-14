export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-bold text-slate-950">
              C
            </div>
            <span className="text-lg font-semibold tracking-tight">
              CampusGPT
            </span>
          </div>

          <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
            Academic assistant
          </span>
        </header>

        <section className="flex flex-1 flex-col justify-center py-20">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Your campus, clarified
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Answers grounded in approved campus knowledge.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            CampusGPT will help students find reliable information about
            academics, policies, departments, and campus life—while showing the
            sources behind each answer.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <p className="text-sm font-semibold text-cyan-300">01</p>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Academic guidance
              </h2>
              <p className="mt-2 leading-7 text-slate-400">
                Ask about attendance, examinations, regulations, and academic
                calendars.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <p className="text-sm font-semibold text-cyan-300">02</p>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Verified sources
              </h2>
              <p className="mt-2 leading-7 text-slate-400">
                See the campus documents used to support every answer.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <p className="text-sm font-semibold text-cyan-300">03</p>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Built for your role
              </h2>
              <p className="mt-2 leading-7 text-slate-400">
                Students, teachers, and administrators each get the tools they
                need.
              </p>
            </article>
          </div>
        </section>

        <footer className="border-t border-slate-800 pt-6 text-sm text-slate-500">
          CampusGPT · Reliable academic assistance
        </footer>
      </div>
    </main>
  );
}
