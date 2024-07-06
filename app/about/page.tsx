export const dynamic = 'force-static';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description: "We are a social media company.",
};

export default async function About() {
    return (
      <main>
          <h1>About</h1>
          <p>This is the about page</p>
      </main>
    );
  }