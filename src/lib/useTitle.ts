// OWNER: Claude. Keeps document.title in sync on client-side navigation
// (the prerendered HTML already has the right title for first load / link previews).
import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
