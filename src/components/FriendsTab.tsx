import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Search, Copy, UserPlus, Check, X } from "lucide-react";

interface Profile {
  user_id: string;
  display_name: string;
  friend_code: string;
}

interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: string;
  requester_profile?: Profile;
  addressee_profile?: Profile;
}

export function FriendsTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [myCode, setMyCode] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [friends, setFriends] = useState<Friendship[]>([]);
  const [pendingReceived, setPendingReceived] = useState<Friendship[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchMyCode();
    fetchFriends();
  }, [user]);

  const fetchMyCode = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("friend_code")
      .eq("user_id", user!.id)
      .single();
    if (data) setMyCode(data.friend_code);
  };

  const fetchFriends = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("friendships")
      .select("*")
      .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

    if (data) {
      const accepted = data.filter((f) => f.status === "accepted");
      const pending = data.filter((f) => f.status === "pending" && f.addressee_id === user.id);
      setFriends(accepted);
      setPendingReceived(pending);

      // Fetch profiles for all friends
      const friendIds = new Set<string>();
      data.forEach((f) => {
        friendIds.add(f.requester_id);
        friendIds.add(f.addressee_id);
      });
      friendIds.delete(user.id);
    }
  };

  const sendRequest = async () => {
    if (!searchCode.trim()) return;
    setLoading(true);

    const { data: targetProfile } = await supabase
      .from("profiles")
      .select("user_id, display_name")
      .eq("friend_code", searchCode.toUpperCase())
      .single();

    if (!targetProfile) {
      toast({ title: "Not found", description: "No user with that friend code.", variant: "destructive" });
      setLoading(false);
      return;
    }

    if (targetProfile.user_id === user?.id) {
      toast({ title: "That's you!", description: "You can't add yourself.", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("friendships").insert({
      requester_id: user!.id,
      addressee_id: targetProfile.user_id,
    });

    if (error) {
      toast({ title: "Error", description: error.message.includes("duplicate") ? "Request already sent!" : error.message, variant: "destructive" });
    } else {
      toast({ title: "Request sent!", description: `Friend request sent to ${targetProfile.display_name}` });
      setSearchCode("");
      fetchFriends();
    }
    setLoading(false);
  };

  const respondToRequest = async (friendshipId: string, accept: boolean) => {
    if (accept) {
      await supabase.from("friendships").update({ status: "accepted" }).eq("id", friendshipId);
      toast({ title: "Friend added!" });
    } else {
      await supabase.from("friendships").update({ status: "declined" }).eq("id", friendshipId);
      toast({ title: "Request declined" });
    }
    fetchFriends();
  };

  const copyCode = () => {
    navigator.clipboard.writeText(myCode);
    toast({ title: "Copied!", description: "Friend code copied to clipboard" });
  };

  return (
    <div className="pb-20">
      <h1 className="mb-6 font-serif text-3xl font-bold text-foreground">Friends</h1>

      {/* My Friend Code */}
      <Card className="mb-6 p-5">
        <p className="mb-2 text-sm font-medium text-muted-foreground">Your Friend Code</p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xl font-bold tracking-widest text-primary">{myCode}</span>
          <Button variant="ghost" size="icon" onClick={copyCode}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Search */}
      <Card className="mb-6 p-5">
        <p className="mb-2 text-sm font-medium text-muted-foreground">Add Friend</p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter friend code"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
              className="pl-10 font-mono uppercase"
              maxLength={8}
            />
          </div>
          <Button onClick={sendRequest} disabled={loading || searchCode.length < 4}>
            <UserPlus className="mr-1 h-4 w-4" /> Add
          </Button>
        </div>
      </Card>

      {/* Pending Requests */}
      {pendingReceived.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">Pending Requests</h2>
          {pendingReceived.map((req) => (
            <Card key={req.id} className="mb-2 flex items-center justify-between p-4">
              <span className="text-sm text-foreground">Friend request received</span>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => respondToRequest(req.id, true)}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => respondToRequest(req.id, false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Friends List */}
      <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">
        My Friends ({friends.length})
      </h2>
      {friends.length === 0 ? (
        <Card className="p-8 text-center">
          <Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Share your friend code to connect with others!
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {friends.map((f) => (
            <Card key={f.id} className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Friend</span>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
