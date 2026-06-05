import { Star, ExternalLink } from "lucide-react";
import TrustpilotBlock from "./TrustpilotBlock";

// Real verified Trustpilot reviews. Text is preserved verbatim — do not
// "clean up" grammar/punctuation. Each card links to its source review so
// the testimonial is verifiable, not self-attested.
const reviews = [
  {
    name: "Carmen Liam",
    location: "United States",
    rating: 5,
    text: "the report was so good , the website smooth , i compared my report with the dealer report i got the same informations , everything was perfect",
    role: "Verified Trustpilot reviewer",
    url: "https://www.trustpilot.com/reviews/6a12904f15413943cf4a044d",
  },
  {
    name: "Adams Daniel Brook",
    location: "United States",
    rating: 5,
    text: "i was looking for a used suv , when i found this website in google i checked the vin in their free tool, everything was good thank you",
    role: "Verified Trustpilot reviewer",
    url: "https://www.trustpilot.com/reviews/6a120d8945c068e3a0ba004d",
  },
  {
    name: "David Franz Friedhof",
    location: "United States",
    rating: 5,
    text: "saved me from buying a car with hidden flood damage , the report showed everything needed , Thank you carcheckervin",
    role: "Verified Trustpilot reviewer",
    url: "https://www.trustpilot.com/reviews/6a198ea437894c11a0770f83",
  },
  {
    name: "regano jerom",
    location: "United States",
    rating: 5,
    text: "I heard about the website in a car community on reddit, i try it , the report has complete information and the pricing was reasonable",
    role: "Verified Trustpilot reviewer",
    url: "https://www.trustpilot.com/reviews/6a22c3c4acf19a498a02e136",
  },
];

export default function Reviews() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
            What Customers Are Saying
          </h2>
          <div className="mt-5 flex justify-center">
            <TrustpilotBlock variant="compact" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-8">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] shadow-sm border border-outline-variant/10 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary-container text-secondary-container" />
                ))}
              </div>

              <p className="font-headline text-on-surface leading-relaxed text-base sm:text-lg mb-7 flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-headline font-black flex-shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-on-surface text-sm truncate">{r.name}</p>
                  <p className="text-xs text-outline">{r.role} &middot; {r.location}</p>
                </div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline whitespace-nowrap"
                  aria-label={`Read ${r.name}'s review on Trustpilot`}
                >
                  Trustpilot
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
