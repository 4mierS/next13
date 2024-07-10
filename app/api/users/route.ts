import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  console.log(users);

  return NextResponse.json(users);
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      console.error('No valid session found.');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const currentUserEmail = session.user.email;

    const data = await req.json();
    console.log('Received data:', data);

    if (typeof data.age !== 'number' || isNaN(data.age)) {
      console.error('Invalid age received:', data.age);
      return NextResponse.json({ error: 'Invalid age' }, { status: 400 });
    }

    // Check if the user exists before updating
    const existingUser = await prisma.user.findUnique({
      where: { email: currentUserEmail },
    });

    if (!existingUser) {
      console.error(`No user found with email: ${currentUserEmail}`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = await prisma.user.update({
      where: { email: currentUserEmail },
      data,
    });

    console.log('User updated:', user);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
