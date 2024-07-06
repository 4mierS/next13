import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import UserCard from '@/components/UserCard/UserCard';
import styles from '../page.module.css';
import { redirect } from 'next/navigation';

export default async function Users() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('You need to be authenticated to access this page');
  }

  const users = await prisma.user.findMany();

  return (
    <div className={styles.grid}>
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}