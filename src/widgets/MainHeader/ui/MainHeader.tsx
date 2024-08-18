import React from 'react';
import { SimpleButton } from '@/shared/ui-kits/buttons';
import { useNavigate } from 'react-router-dom';

const MainHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex min-h-20 w-full flex-col justify-center gap-5 px-4 py-2 md:px-10">
      <SimpleButton
        onClick={() => navigate('/')}
        buttonDetails={{ name: 'To Main' }}
      />
      <SimpleButton
        onClick={() => navigate('/react-hook-form')}
        buttonDetails={{ name: 'To React Hook Forms' }}
      />
      <SimpleButton
        onClick={() => navigate('/')}
        buttonDetails={{ name: 'To Simple Form' }}
      />
    </header>
  );
};

export default MainHeader;
