'use client'; // This directive is required to mark this component as a client component

import InitTooltips from '@/components/Generic/Tooltip/InitTooltips';
import { useEffect } from 'react';

const ClientLayout = ({ children }) => {
  useEffect(() => {
    InitTooltips();
  }, []);

  return <>{children}</>;
};

export default ClientLayout;
