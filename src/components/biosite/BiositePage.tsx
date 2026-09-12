"use client";

import { useMemo, useState } from "react";
import type { BentoItem, BiositeData, Block, ComboItem, QrLinkConfig } from "@/lib/types";
import { isOpenNow } from "@/lib/business-hours";
import { buildPixPayload } from "@/lib/pix";
import { buildWifiPayload } from "@/lib/wifi";
import { BiositeHeader } from "@/components/biosite/BiositeHeader";
import { StoriesRow } from "@/components/biosite/StoriesRow";
import { StoriesViewer } from "@/components/biosite/StoriesViewer";
import { StatusPill } from "@/components/biosite/StatusPill";
import { HeroCarousel } from "@/components/biosite/HeroCarousel";
import { ScarcityBar } from "@/components/biosite/ScarcityBar";
import { SocialProof } from "@/components/biosite/SocialProof";
import { BentoGallery } from "@/components/biosite/BentoGallery";
import { CombosSection } from "@/components/biosite/CombosSection";
import { TestimonialsSection } from "@/components/biosite/TestimonialsSection";
import { StoreGallery } from "@/components/biosite/StoreGallery";
import { BlocksList, LocationBlock } from "@/components/biosite/BlocksList";
import { QrModal } from "@/components/biosite/QrModal";
import { FooterCredit } from "@/components/biosite/FooterCredit";

export function BiositePage({ data }: { data: BiositeData }) {
  const [openStoryIndex, setOpenStoryIndex] = useState<number | null>(null);
  const [openQrBlock, setOpenQrBlock] = useState<Block | null>(null);

  const isOpen = useMemo(
    () => isOpenNow(data.businessHours, data.statusOverride),
    [data.businessHours, data.statusOverride],
  );

  const whatsappMessage = (itemTitle: string) => `Olá! Quero pedir: ${itemTitle}`;

  const handleOrderBento = (item: BentoItem) => {
    window.open(
      `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(whatsappMessage(item.title))}`,
      "_blank",
    );
  };

  const handleAddCombo = (combo: ComboItem) => {
    window.open(
      `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(whatsappMessage(combo.title))}`,
      "_blank",
    );
  };

  const qrModalProps = useMemo(() => {
    if (!openQrBlock) return null;
    const config = openQrBlock.config as QrLinkConfig;
    if (config.kind === "wifi" && config.wifi) {
      return {
        title: config.label,
        qrValue: buildWifiPayload(config.wifi.ssid, config.wifi.password),
        copyValue: config.wifi.password,
        copyLabel: `Rede: ${config.wifi.ssid}`,
      };
    }
    if (config.kind === "pix" && config.pix) {
      return {
        title: config.label,
        qrValue: buildPixPayload({
          key: config.pix.key,
          receiverName: config.pix.receiverName,
          city: config.pix.city,
        }),
        copyValue: config.pix.key,
        copyLabel: `Recebedor: ${config.pix.receiverName}`,
      };
    }
    return null;
  }, [openQrBlock]);

  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden bg-[var(--biosite-bg)] text-white"
      style={{ "--biosite-bg": data.backgroundColor } as React.CSSProperties}
    >
      <main className="custom-scrollbar relative flex-1 overflow-y-auto">
        <BiositeHeader name={data.name} avatarUrl={data.avatarUrl} verified={data.verified} />

        <StoriesRow stories={data.stories} onOpenStory={setOpenStoryIndex} />

        <div className="mt-2">
          <StatusPill isOpen={isOpen} />
        </div>

        <HeroCarousel slides={data.heroSlides} />
        <ScarcityBar messages={data.scarcityMessages} />
        <SocialProof data={data.socialProof} />
        <BlocksList blocks={data.blocks} onOpenQr={setOpenQrBlock} />
        <BentoGallery title={data.bentoTitle} items={data.bentoItems} onOrder={handleOrderBento} />
        <CombosSection combos={data.combos} onAdd={handleAddCombo} />
        <TestimonialsSection testimonials={data.testimonials} />
        <StoreGallery gallery={data.storeGallery} />
        <LocationBlock blocks={data.blocks} />
      </main>

      <FooterCredit url={data.footerCreditUrl} />

      {openStoryIndex !== null && (
        <StoriesViewer
          stories={data.stories}
          initialStoryIndex={openStoryIndex}
          onClose={() => setOpenStoryIndex(null)}
        />
      )}

      {qrModalProps && (
        <QrModal {...qrModalProps} onClose={() => setOpenQrBlock(null)} />
      )}
    </div>
  );
}
