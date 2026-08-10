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
  Activity,
  Clock,
  Gauge,
  Home,
  ShieldCheck,
  Sun,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Laadoplossingen | SG Onderneming",
  description:
    "Elektrisch rijden op uw eigen zonnestroom: ontdek hoe een slimme laadpaal werkt, hoe deze met uw zonnepanelen en thuisbatterij samenwerkt, en welke past bij uw situatie.",
};

// Icons are rendered here (not passed as bare component references) because
// this page is a Server Component handing data down into client list
// components — only already-rendered elements can cross that boundary.
const WHY_HOME_CHARGING: IconBulletItem[] = [
  {
    icon: <Home size={22} aria-hidden="true" />,
    title: "Gemak",
    description:
      "Uw auto opladen vanuit uw eigen oprit — nooit meer wachten bij een openbare laadpaal.",
  },
  {
    icon: <Wallet size={22} aria-hidden="true" />,
    title: "Kostenbesparing",
    description:
      "Thuis opladen is doorgaans goedkoper dan bij een publiek laadpunt, zeker met een daltarief.",
  },
  {
    icon: <ShieldCheck size={22} aria-hidden="true" />,
    title: "Waardevermeerdering",
    description:
      "Een eigen laadpaal maakt uw woning aantrekkelijker nu elektrisch rijden verder toeneemt.",
  },
];

const STEPS: Step[] = [
  {
    icon: <Activity size={22} aria-hidden="true" />,
    title: "Meet uw verbruik continu",
    description:
      "Een slimme laadpaal houdt voortdurend in de gaten hoeveel stroom uw woning op dat moment verbruikt.",
  },
  {
    icon: <Sun size={22} aria-hidden="true" />,
    title: "Gebruikt uw overtollige zonnestroom",
    description:
      "Wekken uw zonnepanelen meer op dan u verbruikt? Dan stuurt de laadpaal dat overschot naar uw auto in plaats van naar het net.",
  },
  {
    icon: <Gauge size={22} aria-hidden="true" />,
    title: "Voorkomt overbelasting",
    description:
      "De laadstroom wordt automatisch aangepast (load balancing), zodat uw aansluiting nooit overbelast raakt.",
  },
  {
    icon: <Clock size={22} aria-hidden="true" />,
    title: "Laadt ook slim bij tijdens daluren",
    description:
      "Buiten zonuren kan de laadpaal alsnog laden op de goedkoopste momenten van de dag.",
  },
];

export default function LaadoplossingenPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Oplossingen"
          title="Laadoplossingen"
          intro="Elektrisch rijden op uw eigen zonnestroom — thuis laden, dag en nacht."
          imageSrc="/images/brand/hero-dusk.jpg"
          imageAlt="Moderne woonwijk in de schemering met zonnepanelen op de daken"
        />

        <ContentSection
          eyebrow="Voordelen"
          title="Waarom thuis laden?"
          description="Steeds meer mensen ontdekken het gemak van thuis hun elektrische auto opladen. Met de juiste laadpaal en persoonlijk advies maakt u een keuze die echt bij uw situatie past."
          variant="base"
        >
          <IconBulletList items={WHY_HOME_CHARGING} columns={3} />
        </ContentSection>

        <ContentSection
          eyebrow="Verduurzaming"
          title="Laden met uw eigen zonnestroom"
          description="Zonder eigen verbruik of opslag levert u overtollige zonnestroom voor een lage vergoeding terug aan het net — en die terugleververgoeding wordt de komende jaren verder afgebouwd. Uw auto opladen met eigen zonnestroom is daarom een van de slimste manieren om uw zonnepanelen optimaal te benutten."
          variant="alt"
        >
          <RelatedLink
            href="/oplossingen/zonnepanelen"
            label="Zonnepanelen"
            description="Bekijk onze aanpak voor hoogrendement zonnepanelen op maat van uw dak."
          />
        </ContentSection>

        <ContentSection
          eyebrow="Werking"
          title="Hoe werkt een slimme laadpaal?"
          variant="base"
        >
          <StepList steps={STEPS} />
        </ContentSection>

        <ContentSection
          eyebrow="Op maat"
          title="Laadpaal en thuisbatterij: samen nog slimmer"
          description="Heeft u ook een thuisbatterij? Dan kan uw auto ook 's avonds nog laden op de zonnestroom die u overdag heeft opgeslagen — zonder afhankelijk te zijn van het moment waarop de zon schijnt."
          variant="alt"
        >
          <RelatedLink
            href="/oplossingen/thuisbatterijen"
            label="Thuisbatterijen"
            description="Ontdek hoe een thuisbatterij uw zonnestroom opslaat voor later gebruik."
          />
        </ContentSection>

        <ContentSection
          eyebrow="Advies"
          title="Welke laadpaal past bij u?"
          description="De juiste laadpaal hangt af van uw auto, het vermogen van uw zonnepanelen en uw dagelijkse rijpatroon. Tijdens het vrijblijvend advies bekijken we samen wat het beste bij uw situatie past — zonder een vast merk of model op te leggen."
          variant="base"
        />

        <PageCTA headline="Benieuwd wat een laadpaal in combinatie met uw zonnepanelen oplevert? Vraag vrijblijvend advies aan." />
      </main>
      <Footer />
    </>
  );
}
