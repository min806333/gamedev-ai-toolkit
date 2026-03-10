import { Card } from "@/components/ui/card";

const examples = [
  {
    label: "Game Idea",
    title: "Cozy Relic Merge Adventure",
    body: `- Restore a floating museum with puzzle expeditions
- Monetization: seasonal pass + cosmetics
- UI: top bar currency, central merge board, bottom boosters`
  },
  {
    label: "Unity Script",
    title: "Player Dash Controller",
    body: `public class PlayerDash : MonoBehaviour {
  public float dashForce = 12f;
  public float cooldown = 1.5f;
}`
  },
  {
    label: "GDD",
    title: "Vertical Slice Plan",
    body: `- Core loop defined
- MVP scope: 1 biome, 3 enemy types, 1 progression hub
- Risks: onboarding friction and content cadence`
  }
];

export function Examples() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">Example Outputs</p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-[color:var(--foreground)]">
          Structured outputs your team can use immediately
        </h2>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {examples.map((example) => (
          <Card key={example.title} className="rounded-[28px] border-[color:var(--border)] bg-[color:var(--card)] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/42">{example.label}</p>
            <h3 className="mt-4 text-xl font-semibold text-[color:var(--foreground)]">{example.title}</h3>
            <pre className="mt-5 overflow-x-auto rounded-2xl border border-[color:var(--border)] bg-black/20 p-4 text-sm leading-7 text-[color:var(--foreground)]/76">
              {example.body}
            </pre>
          </Card>
        ))}
      </div>
    </section>
  );
}
