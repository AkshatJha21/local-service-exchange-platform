"use client"

import { CreateCommunityModal } from "@/components/modals/create-community-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditCommunityModal } from "@/components/modals/edit-comm-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { AddTradeModal } from "@/components/modals/add-trade-modal";
import { LeaveCommunityModal } from "@/components/modals/leave-comm-modal";
import { DeleteCommunityModal } from "@/components/modals/delete-comm-modal";
import { DeleteTradeModal } from "@/components/modals/delete-trade-modal";
import { EditTradeModal } from "@/components/modals/edit-trade-modal";

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <CreateCommunityModal />
            <InviteModal />
            <EditCommunityModal />
            <MembersModal />
            <AddTradeModal />
            <LeaveCommunityModal />
            <DeleteCommunityModal />
            <DeleteTradeModal />
            <EditTradeModal />
        </>
    )
}