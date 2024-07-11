import { getServerSession } from 'next-auth';
import FollowClient from './FollowClient';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Props {
  targetUserId: string;
}

export default async function FollowButton({ targetUserId }: Props) {
  let session = await getServerSession( authOptions );



  //FIXME
  const updatedUser = { ...session?.user, email: "amiershr@gmail.com" };
  session = { ...session, user: updatedUser, expires: "" };

  //FIXME
  const currentUserEmail = session.user?.email!;

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  const isFollowing = await prisma.follows.findFirst({
    where: { followerId: currentUserId, followingId: targetUserId },
  });

  return (
    <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  );
}