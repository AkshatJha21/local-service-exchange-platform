import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CommunityHeader } from "./comm-header";

interface CommunitySidebarProps {
    communityId: string;
}

export const CommunitySidebar = async ({ communityId }: CommunitySidebarProps) => {
    
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const community = await db.community.findUnique({
        where: {
            id: communityId,
        },
        include: {
            trades: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    const members = community?.members.filter((member) => member.profileId !== profile.id);

    if (!community) {
        return redirect("/");
    }

    const role = community.members.find((member) => member.profileId === profile.id)?.role;
    
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <CommunityHeader community={community} role={role}/>
        </div>
    )
}