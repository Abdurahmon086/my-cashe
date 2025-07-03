import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { IncomeForm } from "../forms/income-form";

export function AddIncomeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon />
          <span className="hidden lg:inline">Daromat qo&apos;shing</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Daromat qo&apos;shing.</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mt-2">
          <IncomeForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
