//@flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Painter from '../Painter'
import existCoords from '../../pages/testCoords'
import { Box } from '@material-ui/core'
import type { coordinateType } from '../Painter'

const styles = theme => ({
  root: {
    margin: 0,
    padding: '17px 24px',
    fontSize: 14,
    color: '#455A64',
    fontWeight: '600'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: 24
  }
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions)

const PainterBox = withStyles(theme => ({
  root: {
    border: '1px solid #CED4DA',
    boxSizing: 'border-box',
    borderRadius: '4px'
  }
}))(Box)

export default function PainterModal() {
  const [open, setOpen] = React.useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateSignature = (coords: coordinateType[]) => console.log('Signature"s coordinates: ',coords)

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} maxWidth={'lg'} open={open}>
        <DialogTitle onClose={handleClose}>
          Add graphical signature
        </DialogTitle>
        <DialogContent dividers>
          <PainterBox>
            <Painter handleCreateSignature={handleCreateSignature} width={752} height={298} existsCoords={existCoords}/>
          </PainterBox>
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} onClick={handleClose} color="primary">
            Add Signature
          </Button>
          <Button variant={'contained'} onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
