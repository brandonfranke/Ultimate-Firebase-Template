import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppError({ error }: { error: unknown }) {
  const navigate = useNavigate();

  const sendErrorReport = async () => {
    // Simulate sending error data
    console.log("Sending error report:", error);
    // In a real application, you would send this to your error reporting service
    alert("Error report sent. Thank you!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertCircle className="mr-2" />
            An error occurred
          </CardTitle>
          <CardDescription>
            We apologize for the inconvenience. An unexpected error has
            occurred.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
          <Button
            variant="default"
            onClick={sendErrorReport}
            className="w-full sm:w-auto"
          >
            Send Error Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
