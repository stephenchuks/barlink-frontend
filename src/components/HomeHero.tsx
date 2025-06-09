export default function HomeHero() {
  return (
    <div className="bg-heroBg rounded-xl py-12 px-4 md:px-12 text-center shadow-sm border border-borderLight">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight font-sans">
        Welcome to Temporarily BarLink
      </h1>
      <div className="text-lg text-gray-700 mb-7 font-sans">
        Scan, browse, order—it’s that easy.
      </div>
      <button
        className="bg-primary text-white font-bold px-7 py-3 rounded-lg shadow hover:bg-primary/90 transition font-sans"
      >
        View Menu
      </button>
    </div>
  );
}
