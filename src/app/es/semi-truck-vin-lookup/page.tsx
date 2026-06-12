import type { Metadata } from "next";
import SpecialtyToolPage from "../_specialty-shared/SpecialtyToolPage";
import { SPECIALTY_HOOKS_ES } from "../_specialty-shared/strings";
import { specialtyMetadata, specialtySchemas } from "../_specialty-shared/metadata";

const hook = SPECIALTY_HOOKS_ES["semi-truck"];
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
