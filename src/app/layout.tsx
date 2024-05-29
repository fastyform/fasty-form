import { ReactNode } from 'react';
import './globals.css';

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
const RootLayout = ({ children }: { children: ReactNode }) => children;

export default RootLayout;
