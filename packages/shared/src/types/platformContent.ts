export interface ContentSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface VideoResource {
  title: string;
  youtubeId: string;
  description?: string;
}

export interface ArchitectureLayer {
  title: string;
  description: string;
}

export interface ArchitectureDiagramData {
  layers: ArchitectureLayer[];
}

export interface ComparisonTableData {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface ReferenceLink {
  title: string;
  description: string;
  url: string;
}

export interface PlatformContent {
  slug: string;
  name: string;
  tagline: string;
  heroSummary: string;
  architectureBullets: string[];
  architectureDiagram?: ArchitectureDiagramData;
  sections: ContentSection[];
  comparisonTable?: ComparisonTableData;
  references?: ReferenceLink[];
  learnMoreUrl: string;
  logoUrl?: string;
  videos?: VideoResource[];
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
