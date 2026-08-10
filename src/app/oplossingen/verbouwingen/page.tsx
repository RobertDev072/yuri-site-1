import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/oplossingen/PageHero";
import ContentSection from "@/components/oplossingen/ContentSection";
import IconBulletList, {
  type IconBulletItem,
} from "@/components/oplossingen/IconBulletList";
import RelatedLink from "@/components/oplossingen/RelatedLink";
import PhotoGallery, {
  type GalleryPhoto,
} from "@/components/oplossingen/PhotoGallery";
import PageCTA from "@/components/oplossingen/PageCTA";
import { Layers, Ruler, Sparkles, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Verbouwingen | SG Onderneming",
  description:
    "Van aanbouw en uitbouw tot complete gevelrenovatie: SG Onderneming verzorgt verbouwingen met eigen vakmensen, van ontwerp tot laatste afwerking.",
};

// Icons are rendered here (not passed as bare component references) because
// this page is a Server Component handing data down into a client list
// component — only already-rendered elements can cross that boundary.
const ACTIVITIES: IconBulletItem[] = [
  {
    icon: <Layers size={22} aria-hidden="true" />,
    title: "Aanbouw & uitbouw",
    description:
      "Meer ruimte en lichtinval door een aanbouw aan de achter- of zijgevel, van fundering tot afwerking.",
  },
  {
    icon: <Ruler size={22} aria-hidden="true" />,
    title: "Gevelrenovatie",
    description:
      "Een vernieuwde voor- of achtergevel: strakke afwerking, nieuwe kozijnen en een fris totaalbeeld.",
  },
  {
    icon: <Wrench size={22} aria-hidden="true" />,
    title: "Gevel & rolluiken",
    description:
      "Onderhoud en vervanging van gevelelementen en rolluiken, netjes op elkaar afgestemd.",
  },
  {
    icon: <Sparkles size={22} aria-hidden="true" />,
    title: "Algeheel onderhoud",
    description:
      "Van klein klusje tot complete renovatie — wij denken mee over wat uw woning nodig heeft.",
  },
];

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/verbouwingen/hero-aanbouw.webp",
    alt: "Aanbouw met grote glazen puntgevel aan de achterzijde van een woning",
    caption: "Aanbouw achterzijde",
  },
  {
    src: "/images/verbouwingen/hero-tuinzijde.webp",
    alt: "Verbouwing aan de tuinzijde met nieuwe kozijnen en dakbedekking",
    caption: "Verbouwing tuinzijde",
  },
  {
    src: "/images/verbouwingen/hero-na-renovatie.webp",
    alt: "Woning na afronding van de renovatie, met nieuwe dakramen en gevel",
    caption: "Woning na renovatie",
  },
  {
    src: "/images/verbouwingen/hero-voorgevel.webp",
    alt: "Voorgevel van een woning na renovatie",
    caption: "Voorgevel na renovatie",
  },
];

export default function VerbouwingenPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Oplossingen"
          title="Verbouwingen"
          intro="Van aanbouw tot complete gevelrenovatie — wij denken mee en voeren vakkundig uit, van ontwerp tot laatste afwerking."
          imageSrc="/images/verbouwingen/hero-aanbouw.webp"
          imageAlt="Aanbouw met grote glazen puntgevel aan de achterzijde van een woning"
        />

        <ContentSection
          eyebrow="Mogelijkheden"
          title="Wat valt er onder een verbouwing?"
          description="Van een aanbouw die uw woonkamer vergroot tot een complete gevelrenovatie: elke verbouwing begint met een goed plan dat past bij uw woning en wensen."
          variant="base"
        >
          <IconBulletList items={ACTIVITIES} columns={2} />
        </ContentSection>

        <ContentSection
          eyebrow="Aanpak"
          title="Eén aanspreekpunt, van schets tot sleutel"
          description="Onze eigen vakmensen verzorgen uw verbouwing van begin tot eind — bouwkundig, elektra en afwerking in één hand, zodat u niet hoeft te schakelen tussen aparte partijen."
          variant="alt"
        >
          <RelatedLink
            href="/oplossingen/dakrenovatie"
            label="Dakrenovatie"
            description="Bekijk onze aanpak voor dakrenovatie, vaak onderdeel van een grotere verbouwing."
          />
        </ContentSection>

        <ContentSection
          eyebrow="Projecten"
          title="Verbouwingen in beeld"
          description="Een impressie van recent uitgevoerde verbouwingen."
          variant="base"
        >
          <PhotoGallery photos={GALLERY_PHOTOS} />
        </ContentSection>

        <PageCTA headline="Heeft u een verbouwing in gedachten? Vraag een vrijblijvend adviesgesprek aan." />
      </main>
      <Footer />
    </>
  );
}
