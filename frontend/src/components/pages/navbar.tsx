import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="border-border bg-background/80 fixed top-0 z-40 w-full border-b backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left side - Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-colors hover:opacity-80"
        >
          <div className="bg-primary/10 flex size-9 items-center justify-center rounded-lg">
            <MessageSquare className="text-primary size-5" />
          </div>
          <h1 className="text-lg font-bold">Echo Chat</h1>
        </Link>

        {/* Right side - Nav actions */}
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to="/settings">
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </Button>

          {authUser && (
            <>
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link to="/profile">
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
              </Button>

              <Separator orientation="vertical" className="h-5" />

              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                onClick={logout}
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
