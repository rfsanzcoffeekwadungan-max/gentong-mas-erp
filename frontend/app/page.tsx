// frontend/app/page.tsx
// Root route: redirect to login if unauthenticated, or dashboard if authenticated.

import { redirect } from 'next/navigation';

export default function RootPage() {
  // The middleware handles the actual redirect logic based on the cookie.
  // This component is only reached if middleware passes through,
  // so we redirect to dashboard by default.
  redirect('/dashboard');
}
