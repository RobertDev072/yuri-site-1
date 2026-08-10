import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/oplossingen/PageHero";
import ContentSection from "@/components/oplossingen/ContentSection";
import RelatedLink from "@/components/oplossingen/RelatedLink";
import PhotoGallery, {
  type GalleryPhoto,
} from "@/components/oplossingen/PhotoGallery";
import PageCTA from "@/components/oplossingen/PageCTA";

export const metadata: Metadata = {
  title: "Zonnepanelen | SG Onderneming",
  description:
    "Hoogrendement zonnepanelen op maat van uw dak, voor maximale opbrengst en een snelle terugverdientijd. Van gratis advies tot vakkundige montage door onze eigen monteurs.",
};

const MONTAGE_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/projecten/project-01.jpg",
    alt: "Particuliere woning met nieuw geïnstalleerde zonnepanelen op het dak",
    caption: "Zonnepanelen · particuliere woning",
  },
  {
    src: "/images/projecten/project-04.jpg",
    alt: "Woning met zonnepanelen voor duurzame energieopwekking",
    caption: "Duurzame energieopwekking",
  },
  {
    src: "/images/projecten/project-05.jpg",
    alt: "Recent afgeronde zonnepanelen installatie op een particuliere woning",
    caption: "Recent opgeleverd",
  },
];

export default function ZonnepanelenPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Oplossingen"
          title="Zonnepanelen"
          intro="Hoogrendement zonnepanelen op maat van uw dak, voor maximale opbrengst en een snelle terugverdientijd."
          imageSrc="/images/projecten/project-02.jpg"
          imageAlt="Woning met volledig belegd zonnepanelendak"
        />

        <ContentSection
          eyebrow="Advies op maat"
          title="Hoeveel zonnepanelen heeft u nodig?"
          description="Dat hangt af van uw dakoppervlak, de oriëntatie en hellingshoek van uw dak, en uw energieverbruik. Wij berekenen dit voor u tijdens een gratis, vrijblijvend advies op locatie."
          variant="base"
        />

        <ContentSection
          eyebrow="Energieopslag"
          title="Zonnepanelen en thuisbatterij: samen sterker"
          description="Zonnepanelen wekken vooral overdag op, terwijl u 's avonds vaak het meeste verbruikt. Zonder opslag levert u een groot deel van uw overschot voor een lage vergoeding terug aan het net. Met een thuisbatterij slaat u die energie zelf op en gebruikt u hem wanneer u wilt."
          variant="alt"
        >
          <RelatedLink
            href="/oplossingen/thuisbatterijen"
            label="Thuisbatterijen"
            description="Ontdek hoe u uw eigen zonnestroom opslaat en later zelf gebruikt."
          />
        </ContentSection>

        <ContentSection
          eyebrow="Werkwijze"
          title="Van advies tot montage"
          description="Van eerste opname tot oplevering: onze eigen monteurs verzorgen de volledige installatie, met kwaliteitsmateriaal en garantie op het werk."
          variant="base"
        >
          <PhotoGallery photos={MONTAGE_PHOTOS} />
        </ContentSection>

        <PageCTA headline="Ontdek wat zonnepanelen voor uw woning opleveren." />
      </main>
      <Footer />
    </>
  );
}
