"use client"

import { cn } from "@/lib/utils";
import { Community, Member, MemberRole, Profile } from "@prisma/client"
import { Crown, ShieldHalf, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";

interface CommunityMemberProps {
    member: Member & { profile: Profile };
    community: Community;
}

const roleIconMap = {
    [MemberRole.ADMIN]: <Crown className="h-4 w-4 ml-2 text-rose-500"/>,
    [MemberRole.TRADER]: <ShieldHalf className="h-4 w-4 ml-2 text-emerald-500"/>,
    [MemberRole.GUEST]: <User className="h-4 w-4 ml-2"/>
}

export const CommunityMember = ({ member, community }: CommunityMemberProps) => {
    
    const params = useParams();
    const router = useRouter();

    const icon = roleIconMap[member.role];

    const onClick = () => {
        router.push(`/communities/${params?.communityId}/dms/${member.id}`);
    }

    return (
        <button onClick={onClick} className={cn("group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
            params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700")}>
            {icon}
            <UserAvatar src={member.profile.imageUrl} className="h-8 w-8 md:h-8 md:w-8"/>
            <p className={cn("font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white")}>
                {member.profile.name}
            </p>
        </button>
    )
}