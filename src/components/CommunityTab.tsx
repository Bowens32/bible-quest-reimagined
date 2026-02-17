import { Card } from "@/components/ui/card";
import { MessageCircle, Heart, BookOpen } from "lucide-react";

export function CommunityTab() {
  return (
    <div className="pb-20">
      <h1 className="mb-6 font-serif text-3xl font-bold text-foreground">Community</h1>

      <div className="grid gap-4">
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Questions & Answers</h3>
            <p className="text-sm text-muted-foreground">Ask and answer Bible questions</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
            <Heart className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Prayer Requests</h3>
            <p className="text-sm text-muted-foreground">Share and pray for one another</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Shared Notes & Worship</h3>
            <p className="text-sm text-muted-foreground">Upload notes and worship songs</p>
          </div>
        </Card>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Full community features coming in Phase 5.
      </p>
    </div>
  );
}
