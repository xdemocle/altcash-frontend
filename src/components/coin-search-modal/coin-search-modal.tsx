import { Close, Search } from '@mui/icons-material';
import { Button, InputAdornment, Modal, TextField } from '@mui/material';
import useStyles from './use-styles';

type Props = {
  handleClose: () => void;
  updateNeedle: (needle: string) => void;
  open: boolean;
};

const CoinsSearchModal = (props: Props) => {
  const classes = useStyles();
  const { open, handleClose, updateNeedle } = props;

  const textFieldHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!event.target.value.length) {
      return;
    }
    updateNeedle(event.target.value);
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div className={classes.root}>
        <Button
          color="primary"
          className={classes.fabButton}
          aria-label="Close search coins popup"
          onClick={handleClose}
          disableRipple
        >
          <Close />
        </Button>
        <div className={classes.input}>
          <TextField
            name="inputSearchCoins"
            placeholder="Type the coin name"
            fullWidth
            autoFocus
            onChange={textFieldHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CoinsSearchModal;
