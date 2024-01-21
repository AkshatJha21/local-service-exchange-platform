import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CommunityHeader } from "./comm-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunitySearch } from "./comm-search";
import { MemberRole } from "@prisma/client";
import { Crown, ShieldHalf, User, Wrench } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CommunitySection } from "./comm-section";
import { CommunityTrade } from "./comm-trade";
import { CommunityMember } from "./comm-member";

interface CommunitySidebarProps {
    communityId: string;
}

const roleIconMap = {
    [MemberRole.ADMIN]: <Crown className="h-4 w-4 mr-2 text-rose-500"/>,
    [MemberRole.TRADER]: <ShieldHalf className="h-4 w-4 mr-2 text-emerald-500"/>,
    [MemberRole.GUEST]: <User className="h-4 w-4 mr-2"/>
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
    const trades = community?.trades;

    if (!community) {
        return redirect("/");
    }

    const role = community.members.find((member) => member.profileId === profile.id)?.role;
    
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <CommunityHeader community={community} role={role}/>
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <CommunitySearch 
                        data={[
                            {
                                label: "Trades",
                                type: "trade",
                                data: trades?.map((trade) => ({
                                    id: trade.id,
                                    name: trade.name,
                                    icon: <Wrench className="h-4 w-4 mr-2"/>
                                }))
                            },
                            {
                                label: "Members",
                                type: "member",
                                data: members?.map((member) => ({
                                    id: member.id,
                                    name: member.profile.name,
                                    icon: roleIconMap[member.role]
                                }))
                            },
                        ]}
                    />
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
                {!!trades?.length && (
                    <div className="mb-2">
                        <CommunitySection sectionType="trades" role={role} label="Trades" />
                        <div className="space-y-[2px]">
                            {trades.map((trade) => (
                                <CommunityTrade key={trade.id} trade={trade} role={role} community={community} />
                                ))}
                        </div>
                    </div>
                )}
                {!!members?.length && (
                    <div className="mb-2">
                        <CommunitySection sectionType="members" role={role} label="Members" community={community}/>
                        <div className="space-y-[2px]">
                            {members.map((member) => (
                                <CommunityMember key={member.id} member={member} community={community}/>
                                ))}
                        </div>
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}