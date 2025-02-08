import { ReactElement } from 'react';

declare module 'framer-motion' {
  interface AnimatePresenceBaseProps {
    children?: ReactElement | ReactElement[] | null;
    mode?: 'sync' | 'wait' | 'popLayout';
    initial?: boolean;
    onExitComplete?: () => void;
  }

  export interface AnimatePresenceProps extends AnimatePresenceBaseProps {}
}
