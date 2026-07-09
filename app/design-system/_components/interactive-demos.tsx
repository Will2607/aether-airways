"use client";

import { useState } from "react";
import { Chip } from "@/shared/ui/chip";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { SearchIcon, PlaneIcon, MailIcon } from "@/shared/icons";

/* ── Chip demo ──────────────────────────────────────────────────────────── */

const FILTERS = ["All", "Europe", "Americas", "Asia", "Caribbean", "Africa"];

export function ChipFilterDemo() {
  const [active, setActive] = useState("All");
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <Chip
          key={f}
          selected={active === f}
          onToggle={() => setActive(f)}
        >
          {f}
        </Chip>
      ))}
    </div>
  );
}

export function ChipRemovableDemo() {
  const [tags, setTags] = useState(["Economy", "Direct", "Morning"]);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <Chip
          key={t}
          selected
          removable
          onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}
        >
          {t}
        </Chip>
      ))}
      {tags.length === 0 && (
        <button
          className="text-xs text-neutral-500 hover:text-white transition-colors"
          onClick={() => setTags(["Economy", "Direct", "Morning"])}
        >
          Reset chips
        </button>
      )}
    </div>
  );
}

/* ── Button loading demo ─────────────────────────────────────────────────── */

export function ButtonLoadingDemo() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
  };

  return (
    <Button variant="primary" isLoading={loading} onClick={handleClick}>
      {loading ? null : "Search Flights"}
    </Button>
  );
}

/* ── Input demo ─────────────────────────────────────────────────────────── */

export function InputDemo() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const isValidEmail = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="space-y-4 max-w-sm">
      <Input
        label="Search destinations"
        placeholder="City or airport…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        leadingIcon={<SearchIcon className="h-4 w-4" />}
        hint="Type at least 3 characters"
      />
      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leadingIcon={<MailIcon className="h-4 w-4" />}
        error={isValidEmail ? undefined : "Please enter a valid email address"}
        state={isValidEmail ? (email ? "success" : "default") : "error"}
      />
    </div>
  );
}

/* ── Select demo ─────────────────────────────────────────────────────────── */

const CABIN_OPTIONS = [
  { value: "economy",         label: "Economy"         },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business",        label: "Business"        },
  { value: "first",           label: "First Class"     },
];

export function SelectDemo() {
  const [cabin, setCabin] = useState("economy");
  return (
    <div className="max-w-xs">
      <Select
        label="Cabin class"
        options={CABIN_OPTIONS}
        value={cabin}
        onChange={(e) => setCabin(e.target.value)}
        hint="Select your preferred cabin"
      />
    </div>
  );
}

/* ── Icon button demo ─────────────────────────────────────────────────────── */

export function IconButtonDemo() {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="primary"     leftIcon={<PlaneIcon className="h-4 w-4" />}>Book now</Button>
      <Button variant="secondary"   leftIcon={<SearchIcon className="h-4 w-4" />}>Search</Button>
      <Button variant="outline"     rightIcon={<PlaneIcon className="h-4 w-4" />}>Explore</Button>
      <Button variant="ghost"       leftIcon={<MailIcon className="h-4 w-4" />}>Subscribe</Button>
      <Button variant="primary" size="icon" aria-label="Search flights"><SearchIcon className="h-4 w-4" /></Button>
    </div>
  );
}
