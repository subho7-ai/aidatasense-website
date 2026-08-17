import type { VideoResource } from "@aidatasense/shared";

export function VideoSection({ videos }: { videos: VideoResource[] }) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-slate-200 py-8">
      <h2 className="text-2xl font-semibold text-slate-900">Training Videos</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {videos.map((video) => (
          <div key={video.youtubeId}>
            <div className="aspect-video overflow-hidden rounded-xl border border-slate-200">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-900">{video.title}</h3>
            {video.description && <p className="mt-1 text-sm text-slate-600">{video.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
