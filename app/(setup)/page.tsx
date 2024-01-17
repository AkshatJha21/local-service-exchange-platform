import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {

    const profile = await initialProfile();

    const community = await db.community.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        }
    });

    if (community) {
        return redirect(`/communities/${community.id}`);
    }

    return <InitialModal />;
}
 
export default SetupPage;