import { toast } from "@/hooks/use-toast";

const TestComponent = () => {
  const handleClick = () => {
    toast({
      itemID: "test-toast",
      title: "Ceci est un test de toast",
      variant: "info",
    });
  };

  return <button onClick={handleClick}>Afficher un toast</button>;
};

export default TestComponent;
