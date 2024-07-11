import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "./ProflieForm";
import { prisma } from '@/lib/prisma';

export default async function Dashboard() {
    let session = await getServerSession(authOptions);

//FIXME
  const updatedUser = { ...session?.user, email: "amiershr@gmail.com" };
  session = { ...session, user: updatedUser, expires: "" };

    if (!session) {
        redirect('/api/auth/signin');
    }

    const currentUserEmail = session?.user?.email!;
    const user = await prisma.user.findUnique({
        where: { email: currentUserEmail },
    });

    return (
        <>
            <h1>Dashboard</h1>
            <ProfileForm user={user} />
        </>
    );
}