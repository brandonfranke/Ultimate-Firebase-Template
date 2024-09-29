import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, Frown, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Four0Four() {
  const [showJoke, setShowJoke] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowJoke(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-9xl font-bold text-primary mb-8"
      >
        404
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl text-foreground mb-8 text-center"
      >
        Oops! Looks like this page took an unexpected vacation.
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="text-primary-foreground bg-primary hover:bg-primary/90"
        >
          Go Back
        </Button>
      </motion.div>

      <AnimatePresence>
        {showJoke && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground text-center"
          >
            <p className="mb-4">
              <Lightbulb className="inline-block mr-2" />
              Did you know? 404 is also the number of times the average
              developer questions their career choice... daily.
            </p>
            <Frown className="inline-block text-primary" size={32} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-sm text-muted-foreground"
      >
        <AlertCircle className="inline-block mr-2" />
        If you believe this page should exist, please contact our support team.
        They're probably lost too.
      </motion.div>
    </div>
  );
}
