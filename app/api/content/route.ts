// Dummy data
const posts = [
    {
      title: 'Understanding JavaScript Closures',
      slug: 'understanding-javascript-closures',
      content:
        'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).',
    },
    {
      title: 'A Guide to Responsive Web Design',
      slug: 'guide-to-responsive-web-design',
      content:
        'Responsive web design makes your web page look good on all devices (desktops, tablets, and phones). It uses only HTML and CSS.',
    },
    {
      title: 'Exploring the New Features in ES6',
      slug: 'exploring-new-features-in-es6',
      content:
        'ECMAScript 6 brought many new features to JavaScript, including let and const, arrow functions, template literals, and destructuring.',
    },
    {
      title: 'CSS Grid Layout: A Practical Guide',
      slug: 'css-grid-layout-guide',
      content:
        'CSS Grid Layout is a two-dimensional layout system for the web. It lets you layout items in rows and columns, and has many features that make building complex layouts simple.',
    },
    {
      title: 'Introduction to React Hooks',
      slug: 'introduction-to-react-hooks',
      content:
        'React Hooks let you use state and other React features without writing a class. Hooks are functions that let you “hook into” React state and lifecycle features from function components.',
    },
  ];


import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
  
export async function GET() {
  const session = await getServerSession();

  return NextResponse.json(posts);
}