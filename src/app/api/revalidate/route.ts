import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

interface SanityWebhookBody {
  _type?: string;
  slug?: { current?: string };
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<SanityWebhookBody>(
      req,
      process.env.SANITY_REVALIDATE_SECRET || "",
      true
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (body?._type === "post") {
      revalidatePath("/blog");
      if (body.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`);
      }
      revalidateTag("post", "max");
    }

    return NextResponse.json({ revalidated: true, type: body?._type, slug: body?.slug?.current });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "unknown" }, { status: 500 });
  }
}
