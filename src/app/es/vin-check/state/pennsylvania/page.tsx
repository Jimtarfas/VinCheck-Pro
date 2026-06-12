import type { Metadata } from "next";
import StatePage from "../../../_state-shared/StatePage";
import { STATE_HOOKS_ES } from "../../../_state-shared/strings";
import { stateMetadata, stateSchemas } from "../../../_state-shared/metadata";

const hook = STATE_HOOKS_ES.pennsylvania;

export const metadata: Metadata = stateMetadata(hook);

export default function Page() {
  const { articleSchema, breadcrumbSchema } = stateSchemas(hook);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <StatePage hook={hook} />
    </>
  );
}
