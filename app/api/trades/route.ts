import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const profile = await currentProfile();
        const { name } = await req.json();
        const { searchParams } = new URL(req.url);

        const communityId = searchParams.get("communityId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!communityId) {
            return new NextResponse("Community ID not found", { status: 400 });
        }

        const community = await db.community.update({
            where: {
                id: communityId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.TRADER]
                        }
                    }
                }
            },
            data: {
                trades: {
                    create: {
                        profileId: profile.id,
                        name
                    }
                }
            }
        });

        return NextResponse.json(community);
    } catch (error) {
        console.log("[TRADE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}