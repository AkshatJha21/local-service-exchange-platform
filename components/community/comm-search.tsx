"use client"

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";

interface CommunitySearchProps {
    data: {
        label: string,
        type: "member" | "trade",
        data: {
            icon?: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined
    }[]
}

export const CommunitySearch = ({ data }: CommunitySearchProps) => {

    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if(e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    });

    const onClick = ({ id, type }: { id: string, type: "trade" | "member" }) => {
        setOpen(false);

        if (type === "member") {
            return router.push(`/communities/${params?.communityId}/dms/${id}`);
        }

        if (type === "trade") {
            return router.push(`/communities/${params?.communityId}/trades/${id}`);
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                <Search className="h-4 w-4 mr-2 text-zinc-500 dark:text-zinc-400"/>
                <p className="font-semibold text-sm text-zinc-500 dark:to-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    Search
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Find trades and members"/>
                <CommandList>
                    <CommandEmpty>
                        No results found
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if(!data?.length) return null;

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, name, icon }) => {
                                    return (
                                        <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}