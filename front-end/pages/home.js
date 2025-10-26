import Header from "../components/Header";

const samplePosts = [
  {
    id: 1,
    user: "Alex R",
    title: "Sunrise at Mount Haleakala",
    excerpt:
      "Caught the most incredible sunrise — temperatures were low but the views were worth it. Tips on clothing and timing inside.",
  },
  {
    id: 2,
    user: "Priya",
    title: "48 hours in Lisbon",
    excerpt:
      "A quick weekend guide: where to eat, what to see, and a secret viewpoint for sunsets.",
  },
  {
    id: 3,
    user: "Tom",
    title: "Backpacking checklist v1.0",
    excerpt:
      "My personal checklist after 20 trips. Focused on light packing and safety.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="rounded-lg p-8 bg-gradient-to-r from-indigo-50 to-teal-50 border">
            <h1 className="text-base sm:text-lg md:text-3xl font-bold mb-2">
              Discover journeys — connect with fellow travelers
            </h1>
            <p className="text-gray-700">
              This is a placeholder home feed for the voyAIger community. We'll
              replace this with live content and personalized recommendations
              later.
            </p>
            <div className="mt-4">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded shadow">
                Create post
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-4">Community feed</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {samplePosts.map((p) => (
              <article
                key={p.id}
                className="bg-white rounded-lg p-4 shadow-sm border"
              >
                <div className="text-xs text-gray-500">{p.user}</div>
                <h3 className="font-semibold mt-2">{p.title}</h3>
                <p className="mt-2 text-gray-600 text-xs">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500">2 comments</div>
                  <button className="text-indigo-600 text-xs">Read</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
