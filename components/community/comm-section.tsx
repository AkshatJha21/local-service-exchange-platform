"use client"

import { CommunityWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { ActionTooltip } from "@/components/action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface CommunitySectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "trades" | "members";
    community?: CommunityWithMembersWithProfiles;
}

export const CommunitySection = ({ label, role, sectionType, community }: CommunitySectionProps) => {
    
    const { onOpen } = useModal();
    
    return (
        <div className="flex itc justify-between py-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === "trades" && (
                <ActionTooltip label="Add Trade" side="top">
                    <button onClick={() => onOpen("addTrade")} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Plus className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip label="Manage Members">
                    <button onClick={() => onOpen("members", { community })} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Settings className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}