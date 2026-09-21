"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackGaEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type SubmitState =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; message: string; nextPath: "/journal" }
  | { type: "error"; message: string };

type SubscriptionPayload = {
  success?: boolean;
  error?: string;
  confirmation?: {
    status?: string;
    nextPath?: string;
  };
};

type NewsletterSignupFormProps = {
  className?: string;
  buttonLabel?: string;
  showNameField?: boolean;
};

export function NewsletterSignupForm({
  className,
  buttonLabel = "Subscribe",
  showNameField = true
}: NewsletterSignupFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setSubmitState({ type: "error", message: "Please enter an email address." });
      return;
    }

    setSubmitState({ type: "submitting" });

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          name: showNameField ? name : undefined
        })
      });

      const payload = (await response.json()) as SubscriptionPayload;

      if (!response.ok || !payload.success) {
        setSubmitState({
          type: "error",
          message: payload.error ?? "Could not submit your signup. Please try again."
        });
        return;
      }

      setEmail("");
      setName("");
      trackGaEvent("generate_lead", {
        method: "newsletter",
        placement: showNameField ? "newsletter_page" : "homepage",
      });
      const confirmed = payload.confirmation?.status === "confirmed";
      setSubmitState({
        type: "success",
        message: confirmed ? "Your signup is confirmed and saved." : "Your newsletter signup is saved.",
        nextPath: "/journal"
      });
    } catch {
      setSubmitState({ type: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      {showNameField ? (
        <div>
          <Label htmlFor="newsletter-name" className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Name (optional)
          </Label>
          <Input
            id="newsletter-name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Doe"
            className="h-auto rounded-md border-terminal/30 bg-black/40 px-4 py-3 text-white placeholder:text-muted-foreground focus-visible:border-terminal focus-visible:ring-terminal"
          />
        </div>
      ) : null}

      <div>
        <Label htmlFor="newsletter-email" className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Email Address
        </Label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="you@domain.com"
          className="h-auto rounded-md border-terminal/30 bg-black/40 px-4 py-3 text-white placeholder:text-muted-foreground focus-visible:border-terminal focus-visible:ring-terminal"
        />
      </div>

      <Button
        type="submit"
        variant="outline"
        disabled={submitState.type === "submitting"}
        className="h-auto rounded-md border-terminal bg-terminal/10 px-5 py-2.5 font-mono text-sm uppercase tracking-[0.14em] text-terminal hover:bg-terminal/20 hover:text-terminal disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState.type === "submitting" ? "Submitting..." : buttonLabel}
      </Button>

      {submitState.type === "success" ? (
        <div role="status" className="space-y-2 text-sm text-terminal">
          <p>{submitState.message}</p>
          <Link href={submitState.nextPath} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-white">
            Read the latest field notes →
          </Link>
        </div>
      ) : null}
      {submitState.type === "error" ? <p role="alert" className="text-sm text-red-300">{submitState.message}</p> : null}
    </form>
  );
}
