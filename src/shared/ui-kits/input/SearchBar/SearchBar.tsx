import React, { FC, useState } from 'react';
import { BaseInput } from '@shared/ui-kits/input';
import { SimpleButton } from '@shared/ui-kits/buttons';
import { BaseForm } from '@shared/ui-kits/forms';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (text: string) => {
    setQuery(text);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <BaseForm onSubmit={handleSubmit}>
      <div className="relative">
        <BaseInput
          onChange={handleInputChange}
          inputDetails={{}}
        />
        <SimpleButton
          onClick={() => {}}
          buttonDetails={{ name: 'search' }}
        />
      </div>
    </BaseForm>
  );
};

export default SearchBar;
