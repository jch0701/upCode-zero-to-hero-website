import { FieldGroup } from "@/component/shadcn/field";
import { useRef } from "react";

import { Button } from "./shadcn/button";


type ProjectFormProps = {
  onSubmit: (data: any) => void;
  onClose: () => void;
  children: React.ReactNode;
}

export const Form: React.FC<ProjectFormProps> = ({ onSubmit, onClose, children }) => {

  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit(fd);
  }

  return (
    <form id={"basic-form"} onSubmit={handleSubmit} ref={formRef} className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      {children}
      <FieldGroup className="mt-4 flex flex-col sm:flex-row sm:justify-end gap-3">
        <Button 
          type="button" 
          onClick={onClose} 
          variant="outline" 
          className="text-black w-full sm:w-fit cursor-pointer"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="w-full sm:w-fit bg-green-400 hover:bg-green-500 cursor-pointer"
        >
          Submit
        </Button>
      </FieldGroup>
    </form>
  )
}