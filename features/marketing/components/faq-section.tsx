"use client";

import { useState } from "react";
import { Section } from "@/shared/layout/section";
import { Container } from "@/shared/layout/container";
import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import { ChevronDownIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/features/marketing/data/faq";
import type { FaqItem } from "@/features/marketing/types";

/* ── Accordion item ─────────────────────────────────────────────────────── */

interface AccordionItemProps {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, open, onToggle }: AccordionItemProps) {
  const panelId = `faq-panel-${item.id}`;
  const triggerId = `faq-trigger-${item.id}`;

  return (
    <div className="border border-neutral-800 rounded-2xl overflow-hidden">
      {/* Trigger */}
      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between gap-4 px-6 py-5 text-left",
          "bg-card hover:bg-elevated transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-aether-500"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Badge variant="secondary" size="sm" className="shrink-0 hidden sm:inline-flex">
            {item.category}
          </Badge>
          <Typography variant="label-lg" className="font-semibold text-white">
            {item.question}
          </Typography>
        </div>

        <ChevronDownIcon
          className={cn(
            "h-5 w-5 text-neutral-500 shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/*
        Answer panel — animated with CSS grid-template-rows trick.
        No JS measurement needed; works with any content height.
      */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
      >
        <div className="overflow-hidden">
          <div className="px-6 pt-1 pb-5 bg-card">
            <Typography variant="body-sm" color="secondary" className="leading-relaxed">
              {item.answer}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  return (
    <Section background="surface" padding="md" aria-labelledby="faq-heading">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">
            FAQ
          </Badge>
          <Typography
            variant="heading-xl"
            as="h2"
            id="faq-heading"
            className="mb-3"
          >
            Frequently Asked Questions
          </Typography>
          <Typography variant="body-lg" color="secondary" className="max-w-xl mx-auto">
            Everything you need to know about flying with AetherAirways.
          </Typography>
        </div>

        {/* Accordion */}
        <div
          className="max-w-3xl mx-auto space-y-2"
          role="list"
          aria-label="Frequently asked questions"
        >
          {FAQ_ITEMS.map((item) => (
            <div key={item.id} role="listitem">
              <AccordionItem
                item={item}
                open={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
