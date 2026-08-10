import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/oplossingen/PageHero";
import ContentSection from "@/components/oplossingen/ContentSection";
import IconBulletList, {
  type IconBulletItem,
} from "@/components/oplossingen/IconBulletList";
import RelatedLink from "@/components/oplossingen/RelatedLink";
import PageCTA from "@/components/oplossingen/PageCTA";
import { Blinds, Lock, SunMedium } from "lucide-react";

export const metadata: Metadata = {
  title: "Zonwering | SG Onderneming",
  description:
    "Uitvalschermen, zonneschermen en rolluiken op maat, desgewenst gemotoriseerd. Comfortabel en koel wonen op de warmste dagen, met zonwering van SG Onderneming.",
};

// Icons are rendered here (not passed as bare component references) because
// this page is a Server Component handing data down into a client list
// component — only already-rendered elements can cross that boundary.
const TYPES: IconBulletItem[] = [
  {
    icon: <Blinds size={22} aria-hidden="true" />,
    title: "Uitvalschermen (screens)",
    description:
      "Een strak, minimalistisch scherm dat verticaal tegen de gevel uitvalt. Ideaal voor het afschermen van een terras of grote raampartij, met een strak silhouet als het scherm niet in gebruik is.",
  },
  {
    icon: <SunMedium size={22} aria-hidden="true" />,
    title: "Zonneschermen",
    description:
      "De klassieke, uitschuifbare oplossing boven ramen of terras, met een uitvalarm die het scherm schuin naar buiten brengt. Een vertrouwde en veelzijdige keuze voor zonwering boven een raam of deur.",
  },
  {
    icon: <Lock size={22} aria-hidden="true" />,
    title: "Rolluiken",
    description:
      "Zonwering én inbraakwering in één: rolluiken houden de zon buiten, verduisteren een ruimte volledig en bieden extra weerstand tegen ongewenste bezoekers.",
  },
];

export default function ZonweringPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Oplossingen"
          title="Zonwering"
          intro="Comfortabel wonen, ook op de warmste dagen — met zonwering op maat."
          imageSrc="/images/zonwering/zonwering-01.jpg"
          imageAlt="Geïnstalleerd uitvalscherm boven een terras aan de achterzijde van een woning"
        />

        <ContentSection
          eyebrow="Comfort"
          title="Waarom zonwering?"
          description="Zonwering houdt uw woning koel in de zomer, beschermt meubels en vloeren tegen verkleuring door UV, en maakt uw terras op elk moment van de dag prettig te gebruiken."
          variant="base"
        />

        <ContentSection eyebrow="Assortiment" title="Soorten zonwering" variant="alt">
          <IconBulletList items={TYPES} columns={3} />
        </ContentSection>

        <ContentSection
          eyebrow="Bediening"
          title="Op maat en slim bedienbaar"
          description="Alle zonwering wordt op maat gemaakt en is desgewenst te motoriseren, met bediening via afstandsbediening of app, en windvast voor buiten het seizoen."
          variant="base"
        />

        <ContentSection
          eyebrow="Verduurzaming"
          title="Combineer met verduurzaming"
          description="Een koeler huis in de zomer betekent minder vraag naar (mechanische) koeling — een logische aanvulling op uw zonnepanelen en energiebesparing."
          variant="alt"
        >
          <RelatedLink
            href="/oplossingen/zonnepanelen"
            label="Zonnepanelen"
            description="Bekijk onze aanpak voor hoogrendement zonnepanelen op maat van uw dak."
          />
        </ContentSection>

        <PageCTA headline="Interesse in zonwering op maat? Vraag een vrijblijvende offerte aan." />
      </main>
      <Footer />
    </>
  );
}
