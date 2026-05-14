export default function LiveClass() {

  return (

    <div className="min-h-screen bg-black text-white p-4">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>

          <h1 className="text-3xl font-bold">
            LIVE CLASS
          </h1>

        </div>

        <div className="grid grid-cols-1 gap-4">

          {/* Live Video */}

          <div className="w-full rounded-2xl overflow-hidden border border-red-500">

<iframe
  width="100%"
  height="700"
  src="https://www.youtube.com/embed/7s2loX4ayjY?autoplay=1"
  title="YouTube Live Stream"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="w-full"
></iframe>

          </div>

        </div>

      </div>

    </div>

  );

}