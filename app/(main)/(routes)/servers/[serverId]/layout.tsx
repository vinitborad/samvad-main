import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";





const ServerIdLayout = async ({
    children,
    params,  //WHY: Direct 
}:{
    children: React.ReactNode;
    params: {serverId: string};
}) => {

    const profile = await currentProfile();
    if(!profile){
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    if(!server){
        return redirect("/");
    }

    return ( 
        <div className="h-full">
            <div className="hidden md:flex w-60 z-20 fixed inset-y-0">
            {/* WHY: uperna amuk class test by remove it & see what happends */}
                <ServerSidebar
                  serverId={params.serverId}
                />
            </div>
            <main>
                {children}
            </main>
        </div>
     );
}
 
export default ServerIdLayout;