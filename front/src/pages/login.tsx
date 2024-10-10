import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useUserStore } from "../hooks/use-userStore";
import { AuthResponse } from "../services";
import { useLogin } from "../services/queries/auth-queries";

export default function LoginPage() {
  const { setUser } = useUserStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const useLoginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    useLoginMutation.mutate(
      { username, password },
      {
        onSuccess: (response: AuthResponse) => {
          setUser({
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
          });
          navigate("/app");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  placeholder="Username"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            type="submit"
            onClick={handleSubmit}
            disabled={useLoginMutation.isPending}
          >
            Sign In
          </Button>
          <CardDescription>
            No account ?{" "}
            <a
              className="text-primary hover:text-primary/60 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </a>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
