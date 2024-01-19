import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { communityId: string } }) {
    try {
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const community = await db.community.update({
            where: {
                id: params.communityId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        });

        return NextResponse.json(community);
    } catch (error) {
        console.log("[COMMUNITY_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}