import ChatHeader from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";





interface Props {
    params: {
        channelId: string;
        serverId: string;
    }
}

const ChannelIdPage = async ({
    params
}: Props) => {

    const profile = await currentProfile();
    if(!profile) {
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        }
    });

    const member = await db.member.findFirst({
        where:{
            serverId: params.serverId,
            profileId: profile.id,
        }
    });

    if (!channel || !member) {
        redirect("/");
    }

    return ( 
        <div className="text-white">
            <ChatHeader
              name={channel.name}
              type="channel"
              serverId={channel.serverId}
            />
        </div>
     );
}
 
export default ChannelIdPage;