import type { Metadata } from "next";
import SpecialtyToolPage from "../../_specialty-shared/SpecialtyToolPage";
import { GUIDE_HOOKS_ES } from "../../_guide-shared/strings";
import { specialtyMetadata, specialtySchemas } from "../../_specialty-shared/metadata";

const hook = GUIDE_HOOKS_ES["used-car-financing-guide"];
export const metadata: Metadata = specialtyMetadata(hook);

export default function Page() {
  const { webAppSchema, breadcrumbSchema } = specialtySchemas(hook);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SpecialtyToolPage hook={hook} />
    </>
  );
}
