import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { tradeId: string } }) {
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

        if (!params?.tradeId) {
            return new NextResponse("Trade ID not found", { status: 400 });
        }

        const community = await db.community.update({
            where: {
                id: communityId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.TRADER],
                        }
                    }
                }
            },
            data: {
                trades: {
                    update: {
                        where: {
                            id: params?.tradeId
                        },
                        data: {
                            name,
                        }
                    }
                }
            }
        });

        return NextResponse.json(community);
    } catch (error) {
        console.log("[TRADE_ID_PATCH]",error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { tradeId: string } }) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const communityId = searchParams.get("communityId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!communityId) {
            return new NextResponse("Community ID not found", { status: 400 });
        }

        if (!params?.tradeId) {
            return new NextResponse("Trade ID not found", { status: 400 });
        }

        const community = await db.community.update({
            where: {
                id: communityId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.TRADER],
                        }
                    }
                }
            },
            data: {
                trades: {
                    delete: {
                        id: params.tradeId,
                    }
                }
            }
        });

        return NextResponse.json(community);
    } catch (error) {
        console.log("[TRADE_ID_DELETE]",error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}