import ChatHeader from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";




interface Props {
    params: {
        serverId: string,
        memberId: string,
    }
}

const MemberIdPage = async ({
    params
}: Props) => {

    const profile = await currentProfile();
    if(!profile) {
        return redirectToSignIn();
    }

    const currentMember = await db.member.findFirst({
        where: {
            profileId: profile.id,
            serverId: params.serverId,
        },
        include:{
            profile: true,
        }
    });
    if(!currentMember) {
        return redirect("/");
    }

    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

    if(!conversation) {
        return redirect(`/servers/${params.serverId}`);
    }

    const {memberOne, memberTwo} = conversation;

    const otherMember = memberOne.profile.id === profile.id ? memberTwo : memberOne;


    return ( 
        <div>
            <ChatHeader 
              name={otherMember.profile.name}
              imageUrl={otherMember.profile.imageUrl}
              type="conversation"
              serverId={params.serverId}
            />
        </div>
     );
}
 
export default MemberIdPage;