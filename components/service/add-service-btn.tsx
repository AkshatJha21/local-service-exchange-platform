"use client"

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const AddServiceButton = () => {

    const { onOpen } = useModal();

    return ( 
        <div>
            <Button onClick={() => onOpen("addService")} className="absolute bottom-4 right-4 bg-emerald-500 hover:bg-emerald-700 shadow-md">
                <Plus className="h-4 w-4 mr-2"/>
                Add New Service
            </Button>
        </div>
     );
}