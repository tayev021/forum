import styled from 'styled-components';
import { options, type Option } from '../model/types/Options';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useOutsideClick } from '../../../shared/lib/hooks/useOutsideClick';
import { useDebounce } from '../../../shared/lib/hooks/useDebounce';
import { useSearchedItems } from '../lib/hooks/useSearchedItems';
import { Spinner } from '../../../shared/ui/Spinner';
import { Posts } from './Posts';
import { Authors } from './Authors';
import { Threads } from './Threads';
import { useLocation } from 'react-router';

interface IsOpenProp {
  $isOpen: boolean;
}

const SearchContainer = styled.div`
  width: 100%;
  height: 2rem;
  position: relative;
  line-height: 1;
  z-index: 100;
`;

const SearchWindow = styled.div<IsOpenProp>`
  width: 50%;
  height: 0;
  position: absolute;
  top: 1rem;
  left: 25%;
  border-radius: 0.6rem;
  background-color: var(--color-bg);
  box-shadow: var(--shadow-medium);
  transition: all 0.3s ease;
  z-index: 101;

  ${(props) =>
    props.$isOpen &&
    ` width: calc(140% + 2rem);
      height: auto;
      top: -0.5rem;
      left: calc(-20% - 1rem);
      padding: 5rem 1rem 1rem 1rem;
    `}
`;

const InputRow = styled.div<IsOpenProp>`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.2s ease;
  z-index: 102;

  ${(props) =>
    props.$isOpen &&
    ` width: 140%;
      left: -20%;
    `}
`;

const SearchIcon = styled(HiOutlineMagnifyingGlass)<IsOpenProp>`
  width: 1.6rem;
  height: 1.6rem;
  position: absolute;
  top: 0.2rem;
  left: 0.4rem;
  color: var(--color-primary);
  transition: all 0.2s ease;

  ${(props) =>
    props.$isOpen &&
    ` width: 2.6rem;
      height: 2.6rem;
    `}
`;

const Options = styled.ul<IsOpenProp>`
  width: 0;
  height: 0;
  position: absolute;
  top: 0.2rem;
  left: 3.5rem;
  padding: 0.1rem 0.2rem 0.2rem 0.2rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  color: var(--color-primary);
  background-color: var(--color-white);
  transition: all 0.2s ease;
  overflow: hidden;

  ${(props) =>
    props.$isOpen &&
    ` width: auto;
      height: 2.5rem;

      &:hover {
        height: max-content;
        border: 1px solid var(--color-primary);
        box-shadow: var(--shadow-medium);
      }
    `}
`;

const StyledOption = styled.li`
  &:first-child {
    padding: 0.3rem 0.3rem 0.5rem 0.3rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-primary);
    border-radius: 0;
    font-weight: 500;
    cursor: default;
  }

  &:not(:first-child) {
    padding: 0.3rem;
    border-radius: 0.6rem;
    cursor: pointer;

    &:hover {
      color: var(--color-white);
      background-color: var(--color-primary);
    }
  }
`;

const Input = styled.input<IsOpenProp>`
  width: 100%;
  height: 2rem;
  padding: 0.1rem 1rem 0.3rem 4rem;
  border: 0.1rem solid transparent;
  outline: none;
  border-radius: 4rem;
  font-size: 1.4rem;
  color: var(--color-primary);
  transition: all 0.2s ease;

  ${(props) =>
    props.$isOpen &&
    ` height: 3rem;
      padding: 0.5rem 1rem 0.5rem 11rem;
      border-color: var(--color-primary);
      font-size: 1.8rem;
    `}
`;

const SearchWelcome = styled.div`
  padding: 2rem 0;
  font-style: italic;
  text-align: center;
  color: var(--color-grey-500);
`;

const StyledSpinner = styled(Spinner)`
  margin: 0 auto;
`;

const Results = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  & li {
    border-radius: 0.6rem;

    &:hover {
      background-color: var(--color-grey-300);
    }
  }
`;

const NoResults = styled.div`
  padding: 2rem 0;
  font-style: italic;
  text-align: center;
  color: var(--color-rose-500);
`;

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState<Option>(options[0]);
  const debouncedQuery = useDebounce(query, 500);
  const { searchedItems, isLoading } = useSearchedItems(option, debouncedQuery);
  const refSearch = useOutsideClick<HTMLDivElement>(handleOutsideClick);
  const refInput = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) {
      refInput.current?.blur();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 0) {
      setQuery('');
    }
  }, [option]);

  useEffect(() => {
    handleOutsideClick();
  }, [location]);

  function handleOutsideClick() {
    setIsOpen(false);
    setQuery('');
    setOption(options[0]);
  }

  function handleChangeOption(newOption: Option) {
    if (newOption !== option) {
      setOption(newOption);
    }
  }

  function handleChangeQuery(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <SearchContainer ref={refSearch}>
      <InputRow $isOpen={isOpen}>
        <SearchIcon $isOpen={isOpen} />
        <Options $isOpen={isOpen}>
          <StyledOption key={option}>{option}</StyledOption>
          {options.map(
            (currentOption) =>
              option !== currentOption && (
                <StyledOption
                  key={currentOption}
                  onClick={() => handleChangeOption(currentOption)}
                >
                  {currentOption}
                </StyledOption>
              )
          )}
        </Options>
        <Input
          ref={refInput}
          type="text"
          placeholder="type to search..."
          value={query}
          $isOpen={isOpen}
          onChange={handleChangeQuery}
          onFocus={() => setIsOpen(true)}
        />
      </InputRow>
      <SearchWindow $isOpen={isOpen}>
        {isOpen && (
          <>
            {debouncedQuery.length <= 0 ? (
              <SearchWelcome>enter a query to start searching</SearchWelcome>
            ) : isLoading ? (
              <StyledSpinner />
            ) : searchedItems.length > 0 ? (
              <Results>
                {option === 'posts' && <Posts posts={searchedItems} />}
                {option === 'authors' && <Authors authors={searchedItems} />}
                {option === 'threads' && <Threads threads={searchedItems} />}
              </Results>
            ) : (
              <NoResults>
                nothing matched your search, try a different query or category
              </NoResults>
            )}
          </>
        )}
      </SearchWindow>
    </SearchContainer>
  );
}
