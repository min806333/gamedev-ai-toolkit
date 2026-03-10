import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Card className="rounded-[32px] border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-10 md:p-14">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">Start Building</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-[color:var(--foreground)] md:text-5xl">
            Give your game team a faster planning and prototyping stack
          </h2>
          <p className="mt-5 text-lg leading-8 text-[color:var(--foreground)]/62">
            Join GameDev AI Toolkit to generate concepts, scripts, UI direction and production docs from one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/signup">
              <Button className="h-12 px-6 text-base">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" className="h-12 px-6 text-base">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}
