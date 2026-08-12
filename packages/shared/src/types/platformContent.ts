export interface ContentSection {
  heading: string;
  body: string;
}

export interface PlatformContent {
  slug: string;
  name: string;
  tagline: string;
  heroSummary: string;
  architectureBullets: string[];
  sections: ContentSection[];
  learnMoreUrl: string;
  logoUrl?: string;
}

export interface NewsArticle {
  title: string;
  source: "Vertex AI" | "Azure AI Foundry" | "AWS Bedrock" | string;
  url: string;
  summary: string;
  publishedDate: string;
}

export interface AiProgressContent extends PlatformContent {
  articles: NewsArticle[];
}
