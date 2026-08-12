import type { NewsArticle } from "@aidatasense/shared";

export function ArticleList({ articles }: { articles: NewsArticle[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {articles.map((article) => (
        <a
          key={article.title}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{article.source}</span>
          <h3 className="mt-2 text-base font-semibold text-slate-900">{article.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{article.summary}</p>
          <span className="mt-3 text-xs text-slate-400">{article.publishedDate}</span>
        </a>
      ))}
    </div>
  );
}
