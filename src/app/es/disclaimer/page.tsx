import type { Metadata } from "next";
import InfoPage from "../_info-shared/InfoPage";
import { INFO_HOOKS_ES } from "../_info-shared/strings";
import { infoMetadata, infoBreadcrumbSchema } from "../_info-shared/metadata";

const hook = INFO_HOOKS_ES["disclaimer"];
export const metadata: Metadata = infoMetadata(hook);

export default function Page() {
  const breadcrumbSchema = infoBreadcrumbSchema(hook);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <InfoPage hook={hook} />
    </>
  );
}
