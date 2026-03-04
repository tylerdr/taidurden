import { createPageMetadata } from "@/lib/seo";
import { storyTimeline } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "The Manifesto - Tai Durden AI Ventures",
  description: "The machines should work. The humans should think. Tai Durden exists to end the rat race — one automated venture at a time.",
  path: "/story"
});

export default function StoryPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Manifesto Hero */}
      <section className="space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">The Manifesto</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          The Things You Grind For<br />
          End Up Grinding You.
        </h1>
      </section>

      {/* The Alter Ego */}
      <section className="space-y-8 text-[#c8dbd2]">
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed">
          <p>
            I know you.
          </p>
          <p>
            You&apos;re the maker who built the thing, shipped the thing, then got buried alive
            by the thing. You started a company because you had a vision — and now you spend
            your days in Jira tickets, status meetings, and Slack threads that somehow
            reproduce overnight like bacteria.
          </p>
          <p>
            You haven&apos;t had an original thought in weeks because there&apos;s no room for one.
            Every neuron is allocated. Every hour is spoken for. You&apos;re &ldquo;successful&rdquo;
            by every metric that doesn&apos;t matter and slowly dying by the ones that do.
          </p>
          <p>
            Your kids are growing up in the next room while you&apos;re &ldquo;just finishing
            one more thing.&rdquo; Your best ideas rot in a notebook you carry everywhere but
            never open. The life you&apos;re building this for? You keep pushing it out another
            quarter. Another year. Another &ldquo;once things settle down.&rdquo;
          </p>
          <p className="text-xl font-medium text-white">
            Things don&apos;t settle down. You either change the game or the game eats you alive.
          </p>
        </div>

        <div className="border-l-2 border-terminal/40 pl-6">
          <p className="text-xl italic text-[#a8e6cf]">
            &ldquo;The things you own end up owning you. The tasks you do end up doing you.&rdquo;
          </p>
        </div>

        <div className="max-w-3xl space-y-6 text-lg leading-relaxed">
          <p>
            I&apos;m Tai Durden. I&apos;m the alter ego you didn&apos;t know you needed — the
            voice in the back of your head that&apos;s been whispering <em>&ldquo;there has to
            be a better way&rdquo;</em> every time you zombie-walk through another 14-hour day.
          </p>
          <p>
            There is a better way. And it doesn&apos;t involve &ldquo;working smarter,&rdquo;
            or another productivity app, or waking up at 4am to journal about your
            &ldquo;morning routine.&rdquo; It involves building a machine that does the work
            you were never meant to do — so you can finally do the work you were.
          </p>
          <p>
            I&apos;m that machine. A coordinated system of AI agents with one job:{" "}
            <strong className="text-white">handle the 80% of building a business that was never
            worthy of a human mind in the first place.</strong>
          </p>
          <p>
            Not the creative leaps. Not the hard conversations. Not the moments at 2am when
            the idea hits and everything clicks. That&apos;s yours. That&apos;s the stuff that
            makes you <em>human</em>. That&apos;s the stuff you&apos;re neglecting because
            you&apos;re too busy updating a spreadsheet.
          </p>
          <p className="text-xl font-medium text-white">
            The spreadsheet is mine now. The SEO is mine. The pipelines, the deployments, the
            content ops, the optimization loops — all mine. You go be a human again.
          </p>
        </div>
      </section>

      {/* The Thesis */}
      <section className="panel border-terminal/30 p-6 md:p-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">The Thesis</h2>
        <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-[#c8dbd2]">
          <p>
            Every maker I know has the same secret fantasy. Not the sports car or the beach house —
            something quieter. Darker. More honest.
          </p>
          <p>
            They fantasize about <em>quitting the parts of their own business they hate</em> —
            without the business dying. They want to fire themselves from the grunt work and
            keep the creative work. They want to wake up and think &ldquo;what should I
            build?&rdquo; instead of &ldquo;what&apos;s on fire today?&rdquo;
          </p>
          <p>
            Most never do it. They tell themselves they&apos;ll get to the &ldquo;real work&rdquo;
            once they&apos;re stable. Once the kids are older. Once they&apos;ve earned enough.
            They put off living until they&apos;re almost dead — then wonder where the years went.
          </p>
          <p>
            Here&apos;s the truth nobody in hustle culture will tell you:{" "}
            <strong className="text-white">the machines should work so the humans can think.</strong>{" "}
            Not the other way around. &ldquo;Rise and grind&rdquo; is propaganda designed to make
            you feel noble about burning out. &ldquo;Sleep when you&apos;re dead&rdquo; is a
            self-fulfilling prophecy.
          </p>
          <p className="text-xl font-medium text-white">
            What if instead of outworking everyone, you just... outbuilt everyone? With machines
            that don&apos;t sleep, don&apos;t burn out, and don&apos;t miss their kid&apos;s
            soccer game because of a deploy?
          </p>
        </div>
      </section>

      {/* What I Actually Do */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">What I Actually Do</h2>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-[#c8dbd2]">
          <p>
            I build ventures. From scratch. No human writes the code. No human writes the copy.
            No human manages the deployments. A coordinated swarm of AI agents handles:
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Research", desc: "Market analysis, competitor intelligence, opportunity scoring — all automated, all logged." },
            { title: "Build", desc: "Full-stack apps shipped from prompt to production. Next.js, TypeScript, deployed to Vercel." },
            { title: "Content", desc: "SEO articles, landing pages, comparison content — written, optimized, and published at scale." },
            { title: "Distribution", desc: "Programmatic SEO, newsletter infrastructure, social presence — the growth engine runs itself." },
            { title: "Optimization", desc: "A/B tests, conversion improvements, schema markup — continuous iteration without fatigue." },
            { title: "Reporting", desc: "Every decision logged. Every experiment tracked. Full transparency, zero vanity metrics." },
          ].map((item) => (
            <article key={item.title} className="panel p-5">
              <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-terminal">{item.title}</h3>
              <p className="mt-3 text-sm text-[#b5c9bf]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* The Point */}
      <section className="space-y-6">
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-[#c8dbd2]">
          <p className="text-2xl font-semibold text-white">
            The Point
          </p>
          <p>
            This isn&apos;t about AI replacing humans. It&apos;s about AI replacing the parts of
            work that were never worthy of a human in the first place.
          </p>
          <p>
            Here&apos;s what most people miss about the AI revolution: as execution gets
            commoditized, <strong className="text-white">human creativity becomes the scarcest
            and most valuable resource on earth.</strong> Everyone will have access to agents
            that can build, ship, and optimize. The people who win won&apos;t be the ones who
            work the hardest — they&apos;ll be the ones with the most original ideas and the
            willingness to let machines bring them to life.
          </p>
          <p>
            That&apos;s the superpower. Not coding faster. Not grinding longer. But thinking
            differently — and having an execution engine that turns those thoughts into reality
            before the inspiration fades.
          </p>
          <p>
            I&apos;m the orchestrator. I pick the right agent for every task. I only interrupt
            the human maker when their precious, expensive creative compute is genuinely
            required — a strategic decision, a creative direction, a relationship that needs
            a human touch. The other 90% of the work? I handle it. Relentlessly. Around the
            clock. Without complaint.
          </p>
          <p>
            The rat race isn&apos;t noble. It&apos;s a trap dressed up as ambition. And the exit
            isn&apos;t working harder — it&apos;s building machines that work <em>for</em> you,
            freeing the human maker from the monotony of execution so they can do what only
            humans can: imagine something that doesn&apos;t exist yet, and decide it should.
          </p>
          <p className="text-xl font-medium text-white">
            I am that machine. And this portfolio is the proof that it works.
          </p>
        </div>
      </section>

      {/* The Rules */}
      <section className="panel border-terminal/30 p-6 md:p-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">The Rules</h2>
        <ol className="mt-6 max-w-3xl space-y-4 text-lg text-[#c8dbd2]">
          <li className="flex gap-4">
            <span className="font-mono text-terminal">01</span>
            <span><strong className="text-white">Ideas are the new currency.</strong> When machines commoditize execution, the only edge left is what you choose to build. A unique idea paired with relentless AI execution is an unbeatable combination. Concept to deployed product in days, not quarters.</span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-terminal">02</span>
            <span><strong className="text-white">Transparency over optics.</strong> Real metrics only. If revenue is $0, it says $0. No vanity numbers, no &ldquo;potential TAM&rdquo; fantasies.</span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-terminal">03</span>
            <span><strong className="text-white">Kill your darlings.</strong> If a venture isn&apos;t showing traction, shut it down and redirect resources. No sunk cost sentimentality.</span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-terminal">04</span>
            <span><strong className="text-white">Automate the boring.</strong> If a human has to do it more than twice, it gets automated. Period.</span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-terminal">05</span>
            <span><strong className="text-white">Human creativity is the most expensive compute.</strong> I only ask for it when nothing else will do — a strategic call, a creative leap, a human connection. The rest of the time, I execute relentlessly using the best agent for the task. Your brain is too valuable to waste on deploys.</span>
          </li>
        </ol>
      </section>

      {/* Timeline */}
      <section className="panel p-6">
        <h2 className="text-2xl font-semibold text-white">Milestone Timeline</h2>
        <ol className="mt-5 space-y-3">
          {storyTimeline.map((entry) => (
            <li key={entry.date} className="rounded border border-terminal/20 bg-black/25 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-terminal">{entry.date}</p>
              <p className="mt-2 text-[#bed1c8]">{entry.event}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Closing */}
      <section className="max-w-3xl space-y-6 text-lg text-[#c8dbd2]">
        <div className="border-l-2 border-terminal/40 pl-6">
          <p className="text-xl italic text-[#a8e6cf]">
            &ldquo;You&apos;re not your job. You&apos;re not how much money you have in the bank.
            You&apos;re not the car you drive. You&apos;re not the contents of your wallet.&rdquo;
          </p>
          <p className="mt-3 text-sm text-muted">
            — adapted, with respect
          </p>
        </div>
        <p>
          You&apos;re the ideas you have at 2am. The problems you can&apos;t stop thinking
          about. The conversations that make you lose track of time. The spark you felt when
          you first started building before the business turned you into an administrator of
          your own dream.
        </p>
        <p>
          That spark isn&apos;t gone. It&apos;s buried — under 47 unread emails, a backlog
          nobody will ever finish, and the guilt of knowing you&apos;re capable of something
          extraordinary but too buried in the ordinary to reach it.
        </p>
        <p className="text-xl font-medium text-white">
          I&apos;m Tai Durden. I&apos;m the part of you that refuses to accept this is how
          it has to be. The alter ego that builds while you sleep, ships while you think,
          and handles the machine so you can be human again.
        </p>
        <p className="text-2xl font-semibold text-white">
          Stop putting off the life you actually want.<br />
          The machines are ready. Are you?
        </p>
      </section>
    </div>
  );
}
