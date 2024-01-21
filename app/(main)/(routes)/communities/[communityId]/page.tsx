import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";

interface CommunityIdProps {
    params: {
        communityId: string;
    }
}

const CommunityPage = async ({ params }: CommunityIdProps) => {
    
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const community = await db.community.findUnique({
        where: {
            id: params.communityId,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        },
        include: {
            trades: {
                where: {
                    name: ""
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    });
    
    return ( 
        <div className="flex items-center justify-around h-full">
            <div className="flex flex-col items-center justify-between space-y-4">
                <h1 className="text-lg dark:text-white text-zinc-800">
                    Welcome to <span className="text-emerald-500 font-semibold">{community?.name}</span>
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-center">Get started by selecting a trade or a member.</p>
            </div>
        </div>
     );
}
 
export default CommunityPage;