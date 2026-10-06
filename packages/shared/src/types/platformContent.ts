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
  /** Render a purpose-built component in this section's place instead of the generic layout. */
  customBlock?:
    | "databricks-devops"
    | "databricks-delta-table"
    | "snowflake-devops"
    | "snowflake-pillars"
    | "fabric-overview"
    | "fabric-devops";
  body: string | string[];
  bullets?: string[];
  imageUrl?: string;
  imageCaption?: string;
  imageSideBySide?: boolean;
  imageZoomable?: boolean;
  diagram?: ReferenceLink;
  diagramBrief?: string;
  diagramSideBySide?: boolean;
  diagramAttribution?: { label: string; url: string };
  internalLink?: { label: string; to: string };
  integrations?: IntegrationsData;
  comparisonTable?: ComparisonTableData;
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
  architectureExtraSections?: ContentSection[];
  sections: ContentSection[];
  sidebarSections?: ContentSection[];
  sidebarReferences?: ReferenceLink[];
  aiSections?: ContentSection[];
  /** Heading of the AI section the side nav's "AI" link should land on; defaults to the first. */
  aiNavHeading?: string;
  /** Heading of the AI section the side nav's "DevOps" link lands on; no link when unset. */
  devOpsNavHeading?: string;
  deepDiveSections?: ContentSection[];
  useCases?: {
    title: string;
    body: string | string[];
    bulletsHeading?: string;
    bullets?: string[];
    image?: {
      url: string;
      caption: string;
      attribution?: { label: string; url: string };
    };
    internalLink?: { label: string; to: string };
    /** Show `body` as a short synopsis inside a card that links to `internalLink` as a whole. */
    summaryCard?: boolean;
  }[];
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

export interface AiLandscapeContent extends PlatformContent {
  articles: NewsArticle[];
}
