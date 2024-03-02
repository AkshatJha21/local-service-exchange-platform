import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceIdProps {
    params: {
        tradeId: string;
        serviceId: string;
        profileId: string;
        communityId: string;
    }
}

const ServiceIdPage = async ({ params }: ServiceIdProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const trade = await db.trade.findUnique({
        where: {
            id: params.tradeId,
        }
    });

    const service = await db.service.findUnique({
        where: {
            id: params.serviceId,
        }
    })

    const img = service?.imageUrl;

    return ( 
        <div>
            <Button className="dark:hover:bg-zinc-700 text-center m-2 transition" variant="ghost">
                <ChevronLeft className="h-4 w-4 mr-2"/>
                <Link href={`/communities/${params?.communityId}/trades/${trade?.id}`}>
                    Back
                </Link>
            </Button>
            {/* Header */}
            <div className="my-2 ml-4">
                <h1 className="text-xl font-semibold">{service?.name}</h1>
                <p>Offered by {profile.name}</p>
            </div>
            {/* Service Details */}
            <div className="my-6 ml-4 flex justify-between">
                <div>
                    <h1 className="text-md font-medium mb-2">Service Details</h1>
                    <p>{service?.details}</p>
                    <h1 className="text-md font-medium mt-2">Price</h1>
                    <Currency value={service?.price}/>
                </div>
            {/* Service Image */}   
                <div className="m-4">
                    <Image height={350} width={350} src={img} alt="service"/>
                </div>
            </div>
            {/* Bottom Hire bar */}
            <div className="absolute bottom-2 m-4 w-8/12">
                <hr className="w-full bg-slate-400 mb-2"/> 
                <div className="flex justify-between">
                    <div>
                        <h1 className="font-semibold text-xl">{service?.name}</h1>
                        <p className="text-sm">By {profile.name}</p>
                        <p className="flex gap-x-2">at <Currency value={service?.price}/></p>
                    </div>
                    <Button className="my-auto bg-emerald-500 hover:bg-emerald-700">
                        Hire Now
                    </Button>
                </div>
            </div>
        </div>
     );
}
 
export default ServiceIdPage;