export interface IntegrationCategory {
  label: string;
  url: string;
}

export interface IntegrationsCallout {
  title: string;
  body: string;
}

export interface IntegrationsData {
  categories: IntegrationCategory[];
  viewAllUrl: string;
  callout?: IntegrationsCallout;
}

export interface ContentSection {
  heading: string;
  body: string | string[];
  bullets?: string[];
  imageUrl?: string;
  diagram?: ReferenceLink;
  diagramBrief?: string;
  integrations?: IntegrationsData;
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

export interface AccordionItem {
  title: string;
  body: string;
}

export interface ArchitectureDiagramData {
  layers?: ArchitectureLayer[];
  summary?: string;
  summaryBullets?: string[];
  accordion?: {
    heading: string;
    items: AccordionItem[];
  };
  extraSection?: {
    heading: string;
    body: string;
    linkLabel?: string;
    linkUrl?: string;
  };
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
  imageUrl?: string;
}

export interface PlatformContent {
  slug: string;
  name: string;
  tagline: string;
  heroSummary: string;
  architectureBullets: string[];
  architectureDiagram?: ArchitectureDiagramData;
  sections: ContentSection[];
  sidebarSections?: ContentSection[];
  aiSections?: ContentSection[];
  useCase?: {
    title: string;
    body: string | string[];
  };
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
