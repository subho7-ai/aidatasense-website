import type { PlatformContent } from "@aidatasense/shared";
import { aiProgressContent } from "./aiProgress.content";
import { azureFabricContent } from "./azureFabric.content";
import { databricksContent } from "./databricks.content";
import { snowflakeContent } from "./snowflake.content";

export const platformContentBySlug: Record<string, PlatformContent> = {
  databricks: databricksContent,
  snowflake: snowflakeContent,
  "azure-fabric": azureFabricContent,
};

export const allPlatforms: PlatformContent[] = [
  databricksContent,
  snowflakeContent,
  azureFabricContent,
  aiProgressContent,
];

export { aiProgressContent };
