import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Home</h1>
      <Button variant={"default"}>Click me</Button>
      <Button variant={"destructive"}>Click me</Button>
      <Button variant={"ghost"}>Click me</Button>
      <Button variant={"link"}>Click me</Button>
      <Button variant={"outline"}>Click me</Button>
      <Button variant={"secondary"}>Click me</Button>
    </div>
  );
}
