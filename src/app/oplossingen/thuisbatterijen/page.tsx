import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/oplossingen/PageHero";
import ContentSection from "@/components/oplossingen/ContentSection";
import StepList, { type Step } from "@/components/oplossingen/StepList";
import IconBulletList, {
  type IconBulletItem,
} from "@/components/oplossingen/IconBulletList";
import RelatedLink from "@/components/oplossingen/RelatedLink";
import PageCTA from "@/components/oplossingen/PageCTA";
import {
  ArrowLeftRight,
  BatteryCharging,
  BatteryFull,
  Cpu,
  Recycle,
  Ruler,
  Settings2,
  Sun,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Thuisbatterijen | SG Onderneming",
  description:
    "Ontdek hoe een thuisbatterij werkt, waar een goede installatie aan moet voldoen en hoe wij dit afstemmen op uw zonnepanelen en meterkast. Vraag vrijblijvend advies aan.",
};

// Icons are rendered here (not passed as bare component references) because
// this page is a Server Component handing data down into client list
// components — only already-rendered elements can cross that boundary.
const STEPS: Step[] = [
  {
    icon: <Cpu size={22} aria-hidden="true" />,
    title: "Slimme omvormer stuurt de energie",
    description:
      "De omvormer is het brein van uw thuisbatterij-installatie. Hij bepaalt continu of opgewekte zonnestroom naar uw batterij, direct naar uw apparaten, of naar het net moet — en wanneer opgeslagen energie weer wordt vrijgegeven.",
  },
  {
    icon: <Sun size={22} aria-hidden="true" />,
    title: "Overdag: de batterij vult zich met uw overschot",
    description:
      "Wekken uw zonnepanelen meer op dan u op dat moment verbruikt? Dan slaat de omvormer dat overschot op in de batterij, in plaats van het voor een lage vergoeding terug te leveren aan het net.",
  },
  {
    icon: <BatteryCharging size={22} aria-hidden="true" />,
    title: "'s Avonds en 's nachts: u tapt uit eigen voorraad",
    description:
      "Zodra de zon onder is maar uw verbruik doorgaat, schakelt het systeem automatisch over op de opgeslagen zonne-energie, zonder dat u hier iets voor hoeft te doen.",
  },
  {
    icon: <Zap size={22} aria-hidden="true" />,
    title: "Ook slim bijladen met goedkope netstroom",
    description:
      "Veel batterijen kunnen ook stroom van het net bijladen tijdens daluren, zodat u ook zonder zon profiteert van lagere tarieven.",
  },
];

const REQUIREMENTS: IconBulletItem[] = [
  {
    icon: <ArrowLeftRight size={22} aria-hidden="true" />,
    title: "Bidirectionele omvormer",
    description:
      "Kan stroom in twee richtingen sturen — cruciaal voor een goed samenspel met uw zonnepanelen.",
  },
  {
    icon: <Ruler size={22} aria-hidden="true" />,
    title: "Opslagcapaciteit op maat",
    description:
      "Afgestemd op uw verbruik: te groot is onnodig duur, te klein levert te weinig besparing op.",
  },
  {
    icon: <BatteryFull size={22} aria-hidden="true" />,
    title: "Het juiste batterijtype",
    description:
      "Lithium-ion is momenteel de standaard vanwege levensduur en veiligheid; er bestaan ook zoutwater-varianten.",
  },
  {
    icon: <Recycle size={22} aria-hidden="true" />,
    title: "Voldoende laadcycli",
    description:
      "Hoe vaker een batterij volledig op- en ontladen kan worden, hoe langer u er optimaal profijt van heeft.",
  },
  {
    icon: <Settings2 size={22} aria-hidden="true" />,
    title: "Slimme software",
    description:
      "Houdt rekening met uw verbruikspatroon en weersvoorspellingen om de opslag te optimaliseren.",
  },
];

// NOTE: "AlphaESS" is used here purely as an illustrative example of a
// well-known lithium-ion battery brand. Confirm with the client whether
// SG Onderneming may name this specific supplier publicly before this
// page goes live — swap or remove the name if not.
const EXAMPLE_BATTERY_BRAND = "AlphaESS";

export default function ThuisbatterijenPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Oplossingen"
          title="Thuisbatterijen"
          intro="Sla uw eigen zonnestroom op en gebruik hem wanneer u wilt — dag en nacht, met of zonder zon."
          imageSrc="/images/projecten/project-06-batterij.jpg"
          imageAlt="Thuisbatterij geïnstalleerd bij een particuliere woning"
        />

        <ContentSection
          eyebrow="Werking"
          title="Hoe werkt een thuisbatterij? In 4 stappen"
          variant="base"
        >
          <StepList steps={STEPS} />
        </ContentSection>

        <ContentSection
          eyebrow="Kwaliteit"
          title="Waar moet een goed werkende thuisbatterij aan voldoen?"
          variant="alt"
        >
          <IconBulletList items={REQUIREMENTS} columns={3} />
        </ContentSection>

        <ContentSection
          eyebrow="Op maat"
          title="Thuisbatterij en zonnepanelen: hoe koppelen we dat?"
          description="De capaciteit van uw thuisbatterij moet passen bij zowel het aantal zonnepanelen als het verbruik van uw huishouden. Wij maken hiervoor een berekening op maat tijdens het vrijblijvend advies: een te grote batterij kost onnodig geld, een te kleine batterij mist besparingspotentieel."
          variant="base"
        >
          <RelatedLink
            href="/oplossingen/zonnepanelen"
            label="Zonnepanelen"
            description="Bekijk onze aanpak voor hoogrendement zonnepanelen op maat van uw dak."
          />
        </ContentSection>

        <ContentSection
          eyebrow="Praktisch"
          title="Wat heeft u nodig in de meterkast?"
          description="Een thuisbatterij (en eventueel een laadpaal) vraagt vaak om een aangepaste of uitgebreide groepenkast. Wij controleren dit altijd vooraf tijdens het advies, zodat er tijdens de installatie geen verrassingen zijn."
          variant="alt"
        />

        <ContentSection
          eyebrow="Merken"
          title="Met welke merken werken wij?"
          description={
            <>
              Wij adviseren op basis van uw situatie in plaats van één vast
              merk te pushen, en werken onder meer met gerenommeerde
              lithium-ion merken zoals {EXAMPLE_BATTERY_BRAND}.
            </>
          }
          variant="base"
        />

        <PageCTA headline="Benieuwd wat een thuisbatterij voor u oplevert? Vraag vrijblijvend advies aan." />
      </main>
      <Footer />
    </>
  );
}
