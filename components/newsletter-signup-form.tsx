"use client";

import { FormEvent, useState } from "react";

type SubmitState =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

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

      const payload = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !payload.success) {
        setSubmitState({
          type: "error",
          message: payload.error ?? "Could not submit your signup. Please try again."
        });
        return;
      }

      setEmail("");
      setName("");
      setSubmitState({ type: "success", message: "You are subscribed." });
    } catch {
      setSubmitState({ type: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className ?? "space-y-3"}>
      {showNameField ? (
        <div>
          <label htmlFor="newsletter-name" className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Name (optional)
          </label>
          <input
            id="newsletter-name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-md border border-terminal/30 bg-black/40 px-4 py-3 text-white placeholder:text-muted focus:border-terminal focus:outline-none"
          />
        </div>
      ) : null}

      <div>
        <label htmlFor="newsletter-email" className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Email Address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="you@domain.com"
          className="w-full rounded-md border border-terminal/30 bg-black/40 px-4 py-3 text-white placeholder:text-muted focus:border-terminal focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitState.type === "submitting"}
        className="rounded-md border border-terminal bg-terminal/10 px-5 py-2.5 font-mono text-sm uppercase tracking-[0.14em] text-terminal hover:bg-terminal/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState.type === "submitting" ? "Submitting..." : buttonLabel}
      </button>

      {submitState.type === "success" ? <p className="text-sm text-terminal">{submitState.message}</p> : null}
      {submitState.type === "error" ? <p className="text-sm text-red-300">{submitState.message}</p> : null}
    </form>
  );
}
