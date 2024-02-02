import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

interface ServiceIdProps {
    params: {
        serviceId: string;
    }
}

const ServiceIdPage = async ({ params }: ServiceIdProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const service = await db.service.findUnique({
        where: {
            id: params.serviceId,
        }
    })

    return ( 
        <div>
            <Button className="dark:hover:bg-zinc-700 text-center m-2 transition" variant="ghost">
                <ChevronLeft className="h-4 w-4 mr-2"/>
                Back
            </Button>
            {/* Header */}
            <div>
                <h1 className="text-xl font-semibold my-2 ml-4">{service?.name}</h1>
                <p>Offered by {profile.name}</p>
            </div>
            {/* Service Details */}
            <div>
                <h1 className="text-xl font-medium">Description</h1>
                <p>{service?.details}</p>
                <h1>Price</h1>
                <Currency value={service?.price}/>
            </div>
            {/* Service Image */}
            <div>
                <Image height={240} width={240} src={service?.imageUrl} alt="service"/>
            </div>
            {/* Bottom Hire bar */}
            <div>
                <h1 className="font-semibold my-2 ml-4">{service?.name}</h1>
                <p>By {profile.name}</p>
                <p>at <Currency value={service?.price}/></p>
                <Button>Hire Now</Button>
            </div>
        </div>
     );
}
 
export default ServiceIdPage;