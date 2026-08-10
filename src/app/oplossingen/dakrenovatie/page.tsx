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
import { Home, Layers, SunMedium, Thermometer } from "lucide-react";

export const metadata: Metadata = {
  title: "Dakrenovatie | SG Onderneming",
  description:
    "Vernieuwing van dakbedekking en dakisolatie, dakkapellen en dakramen: SG Onderneming verzorgt dakrenovatie van begin tot eind — en zorgt dat uw dak klaarstaat voor zonnepanelen.",
};

// Icons are rendered here (not passed as bare component references) because
// this page is a Server Component handing data down into a client list
// component — only already-rendered elements can cross that boundary.
const ACTIVITIES: IconBulletItem[] = [
  {
    icon: <Layers size={22} aria-hidden="true" />,
    title: "Dakbedekking vernieuwen",
    description:
      "Verouderde of beschadigde dakbedekking vervangen door een degelijke, nieuwe laag.",
  },
  {
    icon: <Thermometer size={22} aria-hidden="true" />,
    title: "Dakisolatie verbeteren",
    description:
      "Betere isolatie voor een comfortabeler huis en minder energieverlies via het dak.",
  },
  {
    icon: <Home size={22} aria-hidden="true" />,
    title: "Dakkapellen plaatsen",
    description: "Extra ruimte en stahoogte, netjes afgewerkt en aangesloten op uw dak.",
  },
  {
    icon: <SunMedium size={22} aria-hidden="true" />,
    title: "Dakramen plaatsen",
    description: "Meer lichtinval in bestaande ruimtes, vakkundig ingebouwd.",
  },
];

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/dakrenovatie/dak-01.jpg",
    alt: "Dakkapel met dakramen tijdens een dakrenovatieproject",
    caption: "Dakkapel met dakramen",
  },
  {
    src: "/images/dakrenovatie/dak-02.jpg",
    alt: "Vernieuwde dakbedekking op een woning",
    caption: "Vernieuwde dakbedekking",
  },
  {
    src: "/images/dakrenovatie/dak-03.jpg",
    alt: "Woonhuisuitbouw met grote raampartij tijdens een verbouwing",
    caption: "Aanbouw met grote raampartij",
  },
  {
    src: "/images/dakrenovatie/dak-04.jpg",
    alt: "Dakrenovatie in uitvoering",
    caption: "Dakrenovatie in uitvoering",
  },
  {
    src: "/images/dakrenovatie/dak-05.jpg",
    alt: "Nieuwe dakpannen op een vernieuwd dak",
    caption: "Nieuwe dakpannen",
  },
  {
    src: "/images/dakrenovatie/dak-06.jpg",
    alt: "Dakraam voor extra lichtinval in een dakrenovatieproject",
    caption: "Extra lichtinval door dakramen",
  },
  {
    src: "/images/dakrenovatie/dak-07.jpg",
    alt: "Dakwerk van dichtbij tijdens een renovatie",
    caption: "Dakwerk van dichtbij",
  },
  {
    src: "/images/dakrenovatie/dak-08.jpg",
    alt: "Afgeronde dakrenovatie op een particuliere woning",
    caption: "Afgeronde dakrenovatie",
  },
];

export default function DakrenovatiePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Oplossingen"
          title="Dakrenovatie"
          intro="Een gezond, geïsoleerd dak is de stevige basis onder elke verduurzaming."
          imageSrc="/images/dakrenovatie/dak-01.jpg"
          imageAlt="Dakkapel met dakramen tijdens een dakrenovatieproject"
        />

        <ContentSection
          eyebrow="Signalen"
          title="Wanneer is dakrenovatie nodig?"
          description="Bij lekkages, verouderde of beschadigde dakbedekking, onvoldoende isolatie, of de wens voor extra lichtinval en ruimte via een dakkapel of dakraam."
          variant="base"
        />

        <ContentSection
          eyebrow="Aanpak"
          title="Wat doet SG Onderneming?"
          description="Van vernieuwing van de dakbedekking en verbetering van de dakisolatie tot het plaatsen van dakkapellen en dakramen: wij verzorgen dakrenovatie van begin tot eind, met oog voor detail en afwerking."
          variant="alt"
        >
          <IconBulletList items={ACTIVITIES} columns={2} />
        </ContentSection>

        <ContentSection
          eyebrow="Voorbereiding"
          title="De basis onder uw zonnepanelen"
          description="Een verouderd dak vervangen nadat er al zonnepanelen liggen, is onnodig duur werk. Wij kijken daarom vooraf mee of uw dak klaar is voor zonnepanelen — of maken het klaar."
          variant="base"
        >
          <RelatedLink
            href="/oplossingen/zonnepanelen"
            label="Zonnepanelen"
            description="Bekijk onze aanpak voor hoogrendement zonnepanelen op maat van uw dak."
          />
        </ContentSection>

        <ContentSection
          eyebrow="Projecten"
          title="Dakrenovatie in beeld"
          description="Een impressie van recent uitgevoerd dakwerk."
          variant="alt"
        >
          <PhotoGallery photos={GALLERY_PHOTOS} />
        </ContentSection>

        <PageCTA headline="Twijfelt u of uw dak toe is aan renovatie? Vraag een vrijblijvende inspectie aan." />
      </main>
      <Footer />
    </>
  );
}
