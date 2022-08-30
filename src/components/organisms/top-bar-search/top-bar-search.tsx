import { Close, Search } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import useGlobal from '../../../hooks/use-global';

const TopBarSearch = () => {
  const router = useRouter();
  const { coinPageNeedle, setCoinPageNeedle, setTab } = useGlobal();

  const updateNeedle = (needle: string) => {
    setCoinPageNeedle(needle);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!event.target.value.length) {
      return;
    }
    updateNeedle(event.target.value);
  };

  const onFocusHandler = () => {
    router.push('/buy/all');
    setTab(1);
  };

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        name="inputSearchCoins"
        placeholder="Type the coin name"
        fullWidth
        variant="outlined"
        value={coinPageNeedle}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {coinPageNeedle && (
                <IconButton
                  color="primary"
                  aria-label="Reset search results"
                  onClick={() => updateNeedle('')}
                >
                  <Close />
                </IconButton>
              )}
            </InputAdornment>
          )
        }}
      />
    </Stack>
  );
};

export default TopBarSearch;
