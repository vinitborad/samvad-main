import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import { db } from "./db";




export const currentProfilePages = async (req: NextApiRequest) => {
    const { userId } = getAuth(req); //WHY: what is difference in this and another regular 

    if (!userId) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    });

    return profile;
}