"use client"

import { cn } from "@/lib/utils";
import { Community, MemberRole, Trade } from "@prisma/client"
import { Edit, Trash, Wrench } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface CommunityTradeProps {
    trade: Trade;
    community: Community;
    role?: MemberRole;
}

export const CommunityTrade = ({ trade, community, role }: CommunityTradeProps) => {
    
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/communities/${params?.communityId}/trades/${trade.id}`)
    }
    
    const onAction = (e: React.MouseEvent, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, { community, trade });
    }
    
    return (
        <button onClick={onClick} className={cn("group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
            params?.tradeId === trade.id && "bg-zinc-700/20 dark:bg-zinc-700")}>
            <Wrench className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
            <p className={cn("line-clamp-1 font-semibold text-xs text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition", 
                params?.tradeId === trade.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white")}>
                {trade.name}
            </p>
            {role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit">
                        <Edit onClick={(e) => onAction(e, "editTrade")} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"/>
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <Trash onClick={(e) => onAction(e, "deleteTrade")} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"/>
                    </ActionTooltip>
                </div>
            )}
        </button>
    )
}