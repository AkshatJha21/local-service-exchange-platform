import { AddServiceButton } from "@/components/service/add-service-btn";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface TradeIdProps {
    params: {
        tradeId: string;
        serviceId: string;
        profileId: string;
        communityId: string;
    };
}

const TradeIdPage = async ({ params }: TradeIdProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const trade = await db.trade.findUnique({
        where: {
            id: params.tradeId,
        }
    });

    const services = await db.service.findMany({
        where: {
            id: params.serviceId,
            tradeId: trade?.id
        }
    });

    return (
        <div className="flex flex-col">
            <h1 className="text-xl font-semibold my-2 ml-4">{trade?.name}</h1>
            <div className="container px-5 py-14 mx-auto">
                <div className="flex flex-wrap gap-x-4 gap-y-4">
                {services.map((service) => (
                    <div className="lg:w-[250px] md:w-3/5 p-2 w-full shadow-lg rounded-md border dark:border-zinc-700/20">
                        <div className="block relative h-40 rounded overflow-hidden">
                            <Image fill src={service.imageUrl} alt="service"/>
                        </div>
                        <div className="mt-4 flex flex-col">
                            <h2 className="text-primary title-font text-lg font-medium">{service.name}</h2>
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">By {profile.name}</h3>
                            <p className="mt-1">
                                <Currency value={service?.price}/>
                            </p>
                            <Button className="mt-2 ml-auto bg-emerald-500 hover:bg-emerald-700">
                                <Link href={`/communities/${params?.communityId}/trades/${trade?.id}/services/${service?.id}`}>
                                    View
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <AddServiceButton />
        </div>
    );
}

export default TradeIdPage;