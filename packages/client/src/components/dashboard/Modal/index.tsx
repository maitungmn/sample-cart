import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Fade,
  Modal, Backdrop,
} from '@material-ui/core';
import Cart from './Cart';

export interface IRefObject {
  handleOpen: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    minWidth: '300px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
  title: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const TransitionsModal = React.forwardRef((props, ref) => {
  React.useImperativeHandle<unknown, IRefObject>(ref,
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleOpen,
    }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      onClose={handleClose}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Cart />
        </div>
      </Fade>
    </Modal>
  );
});

export default TransitionsModal;
