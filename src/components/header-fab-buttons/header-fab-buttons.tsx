import { Close, Search } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { Fragment, useState } from 'react';
import useGlobal from '../../hooks/use-global';
import CoinSearchModal from '../coin-search-modal';
import useStyles from './use-styles';

type Props = {
  loading?: boolean;
};

const HeaderfabButtons = (props: Props) => {
  const classes = useStyles();
  const { coinPageNeedle, setCoinPageNeedle, setTab } = useGlobal();
  const [modalOpen, setModalOpen] = useState(false);
  const { loading } = props;

  const updateNeedle = (needle: string) => {
    setCoinPageNeedle(needle);
  };

  const handleModalOpen = () => {
    setTab(1);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {coinPageNeedle && (
            <Tooltip title="Reset search results">
              <Button
                color="primary"
                size="small"
                aria-label="Reset search results"
                disabled={loading}
                onClick={() => updateNeedle('')}
                startIcon={<Close />}
                className={classes.fabButtons}
              >
                Close Results
              </Button>
            </Tooltip>
          )}

          <Tooltip title="Find a coin">
            <Button
              color="primary"
              size="small"
              aria-label="Find a coin"
              onClick={handleModalOpen}
              startIcon={<Search />}
              className={classes.fabButtons}
            >
              Search
            </Button>
          </Tooltip>

          {/* <Tooltip title="Retrieve an updated list">
            <Button
              variant="contained"
              color="primary"
              size="small"
              aria-label="Retrieve an updated list"
              disabled={loading}
              onClick={() => updateNeedle('')}
              startIcon={<Refresh />}
              className={classes.fabButtons}
            >
              Refresh
              {loading && (
                <CircularProgress size={24} className={classes.fabProgress} />
              )}
            </Button>
          </Tooltip> */}
        </Box>

        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          {coinPageNeedle && (
            <IconButton
              color="primary"
              aria-label="Reset search results"
              disabled={loading}
              onClick={() => updateNeedle('')}
            >
              <Close />
            </IconButton>
          )}

          <IconButton
            color="primary"
            aria-label="Find a coin"
            onClick={handleModalOpen}
          >
            <Search />
          </IconButton>
        </Box>
      </div>
      <CoinSearchModal
        open={modalOpen}
        handleClose={handleModalClose}
        updateNeedle={updateNeedle}
      />
    </Fragment>
  );
};

export default HeaderfabButtons;
