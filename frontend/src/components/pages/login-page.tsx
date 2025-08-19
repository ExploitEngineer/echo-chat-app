import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { MessageSquare, Mail, Lock, EyeOff, Eye, Loader2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthImagePattern from "../auth-image-pattern";

export default function LoginPage() {
  interface FormData {
    email: string;
    password: string;
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="group bg-primary/10 group-hover:bg-primary/20 mx-auto mb-2 flex size-12 items-center justify-center rounded-xl transition-colors">
              <MessageSquare className="text-primary size-6" />
            </div>
            <CardTitle className="mt-2 text-2xl font-bold">
              Create Account
            </CardTitle>
            <CardDescription>
              Get started with your free account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <span className="text-muted-foreground absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="size-5" />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <span className="text-muted-foreground absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="size-5" />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                    className="pr-10 pl-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="text-muted-foreground absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-primary">
                  Create account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
}
