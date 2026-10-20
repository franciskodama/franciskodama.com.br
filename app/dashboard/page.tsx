import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export const metadata = {
  title: 'Mission Control | Francis Kodama',
  description: 'Private Command Center & Developer Operations Hub',
};

export const instant = false;

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  const allowedEmails = (process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = session.user.email.toLowerCase();

  if (allowedEmails.length > 0 && !allowedEmails.includes(userEmail)) {
    redirect('/unauthorized');
  }

  return (
    <DashboardClient
      userEmail={session.user.email}
      userName={session.user.name}
      userImage={session.user.image}
    />
  );
}
