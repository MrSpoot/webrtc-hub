/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { useRegister } from "@/src/services/queries/auth-queries";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [formStep, setFormStep] = useState(0); // État pour l'étape actuelle

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const router = useRouter();
  const useRegisterMutation = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    useRegisterMutation.mutate(
      { username, password, email, firstname, lastname },
      {
        onSuccess: () => {
          router.push("/login");
        },
      }
    );
  };

  // Gérer le passage à l'étape suivante
  const nextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  // Gérer le retour à l'étape précédente
  const prevStep = () => {
    setFormStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            {formStep === 0
              ? "Enter your personals information"
              : "Enter your accounts information"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {formStep === 0 && (
              <div className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstname">Firstname</Label>
                  <Input
                    id="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastname">Lastname</Label>
                  <Input
                    id="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="your@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {formStep === 1 && (
              <div className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="pseudo">Username</Label>
                  <Input
                    id="pseudo"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                {!samePassword(password, confirmPassword) ? (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="confirm-password">
                        <p className=" text-red-400">Confirm password</p>
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="border-red-400"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-red-400">
                        Les mot de passe ne corresponde pas
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="confirm-password">
                        <p>Confirm password</p>
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="flex w-full">
            <div className="flex w-1/2">
              {formStep > 0 && (
                <Button variant="secondary" size={"icon"} onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex flex-row-reverse w-1/2">
              {formStep == 0 ? (
                <Button variant="secondary" size={"icon"} onClick={nextStep}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <LoadingButton
                  type="submit"
                  disabled={
                    useRegisterMutation.isPending ||
                    !samePassword(password, confirmPassword)
                  }
                  loading={useRegisterMutation.isPending}
                  onClick={handleSubmit}
                >
                  <div className="flex items-center gap-2">
                    <>
                      <Check className="h-4 w-4" />
                      Sign Up
                    </>
                  </div>
                </LoadingButton>
              )}
            </div>
          </div>
          <CardDescription>
            Already an account ?{" "}
            <a
              className="text-primary hover:text-primary/60 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Sign In
            </a>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

function samePassword(password: string, confirmPassword: string): boolean {
  return (
    password === confirmPassword ||
    password.length === 0 ||
    confirmPassword.length === 0
  );
}
