"use client"

import { CreateCommunityModal } from "@/components/modals/create-community-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditCommunityModal } from "@/components/modals/edit-comm-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { AddTradeModal } from "@/components/modals/add-trade-modal";
import { LeaveCommunityModal } from "../modals/leave-comm-modal";
import { DeleteCommunityModal } from "../modals/delete-comm-modal";

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
        </>
    )
}