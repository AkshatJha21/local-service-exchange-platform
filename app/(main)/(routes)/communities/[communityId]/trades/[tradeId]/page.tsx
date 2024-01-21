import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { Service } from "@prisma/client";
import { Plus } from "lucide-react";
import Image from "next/image";

interface TradeIdProps {
    params: {
        tradeId: string;
    },
    service: Service;
}

const TradeIdPage = async ({ service, params }: TradeIdProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const trade = await db.trade.findUnique({
        where: {
            id: params.tradeId,
        }
    });

    return (
        <div className="flex flex-col">
            <h1 className="text-xl font-semibold my-2 ml-4">{trade?.name}</h1>
            <div className="container px-5 py-14 mx-auto">
                <div className="flex flex-wrap gap-x-4 gap-y-4">
                    <div className="lg:w-[250px] md:w-3/5 p-4 w-full shadow-lg rounded-md border dark:border-zinc-700/20">
                        <a className="block relative h-40 rounded overflow-hidden">
                            {/* <Image alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260"> */}
                        </a>
                        <div className="mt-4 flex flex-col">
                            <h2 className="text-primary title-font text-lg font-medium">Responsive Web Design</h2>
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">By John Doe</h3>
                            <p className="mt-1">$16.00</p>
                            <Button className="mt-2 ml-auto bg-emerald-500 hover:bg-emerald-700">View</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Button className="absolute bottom-4 right-4 bg-emerald-500 hover:bg-emerald-700 shadow-md">
                <Plus className="h-4 w-4 mr-2"/>
                Add New Service
            </Button>
        </div>
    );
}

export default TradeIdPage;