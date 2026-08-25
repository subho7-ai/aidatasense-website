import architectureDiagramImage from "../assets/databricks-architecture-diagram.png";
import dataIntelligencePlatformDiagram from "../assets/data-intelligence-platform-diagram.png";

export interface SectionBackgroundConfig {
  /** Imported image asset. Omit for a gradient-only (placeholder) background. */
  image?: string;
  /** Opacity applied to the whole composited layer (image + overlay), so it fades toward the page background. */
  opacity: number;
  /** CSS background-image gradient, layered with `image` (or standalone when there's no image). */
  overlayGradient: string;
  /** background-blend-mode between overlayGradient and image. Ignored when there's no image. */
  blend?: string;
  /** 0-100. Desaturates the image so it reads as texture, not a distinct photo. */
  grayscale?: number;
  /** px. Softens focal points (edges, text-like details) in the image. */
  blurPx?: number;
  /**
   * Describes the theme for anyone reading this config later. Intentionally NOT rendered as
   * visible alt text or aria-label — the layer is `aria-hidden`, which is the correct a11y
   * treatment for a purely decorative background (screen readers should skip it entirely,
   * not announce it as content).
   */
  themeDescription: string;
}

/** Keyed as `${platformSlug}-${navSectionId}`, matching the ids PlatformPage uses for its anchors. */
export const sectionBackgrounds: Record<string, SectionBackgroundConfig> = {
  "databricks-ai": {
    opacity: 1,
    overlayGradient: "linear-gradient(135deg, rgba(99,102,241,0.07), rgba(217,70,239,0.05))",
    themeDescription: "AI governance / control-plane — Genie, Unity AI Gateway, the LLM Mesh",
  },
  "databricks-overview": {
    image: dataIntelligencePlatformDiagram,
    opacity: 0.07,
    overlayGradient: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(255,255,255,0.1))",
    blend: "multiply",
    grayscale: 60,
    blurPx: 14,
    themeDescription: "Data Intelligence Platform stack — lakehouse layered with an AI/governance engine",
  },
  "databricks-architecture": {
    image: architectureDiagramImage,
    opacity: 0.07,
    overlayGradient: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(255,255,255,0.1))",
    blend: "multiply",
    grayscale: 60,
    blurPx: 14,
    themeDescription: "End-to-end platform pipeline — ingest, transform, serve, analyse",
  },
  "databricks-use-case": {
    opacity: 1,
    overlayGradient: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(59,130,246,0.05))",
    themeDescription: "Retail customer analytics — segmentation, dashboards, campaigns",
  },

  "snowflake-ai": {
    opacity: 1,
    overlayGradient: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(56,189,248,0.06))",
    themeDescription: "AI governance / control-plane — Cortex, Cortex AI Gateway, the LLM Mesh",
  },
  "snowflake-overview": {
    opacity: 1,
    overlayGradient: "linear-gradient(135deg, rgba(56,189,248,0.07), rgba(14,165,233,0.04))",
    themeDescription: "Snowgrid data sharing, Snowpark developer framework, semi-structured data",
  },
  "snowflake-architecture": {
    opacity: 1,
    overlayGradient: "linear-gradient(135deg, rgba(14,165,233,0.06), rgba(100,116,139,0.05))",
    themeDescription: "3-layer architecture — storage, compute (virtual warehouses), cloud services",
  },
  "snowflake-use-case": {
    opacity: 1,
    overlayGradient: "linear-gradient(135deg, rgba(100,116,139,0.05), rgba(56,189,248,0.04))",
    themeDescription: "No real use-case content yet — neutral placeholder",
  },

  "azure-fabric-overview": {
    opacity: 1,
    overlayGradient: "linear-gradient(135deg, rgba(0,120,212,0.06), rgba(20,184,166,0.05))",
    themeDescription: "OneLake unified data lake — \"one copy of data, many engines\"",
  },
  "azure-fabric-architecture": {
    opacity: 1,
    overlayGradient: "linear-gradient(135deg, rgba(20,184,166,0.06), rgba(0,120,212,0.05))",
    themeDescription: "OneLake architecture — Capacity Units pooling compute across workloads",
  },
  "azure-fabric-use-case": {
    opacity: 1,
    overlayGradient: "linear-gradient(135deg, rgba(100,116,139,0.05), rgba(0,120,212,0.04))",
    themeDescription: "No real use-case content yet — neutral placeholder",
  },
};
