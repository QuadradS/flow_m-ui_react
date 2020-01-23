//@flow
import React, { useCallback, useState } from 'react'
import { Button, Container, createStyles, Dialog, Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SorterModal from '../components/SorterModal'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100vh'
    }
  })
)

function Home() {


  const classes = useStyles()
  const [isModalOpen: boolean, setModal: (state: boolean) => void] = useState(true)

  const openModal = useCallback(() => setModal(true), [isModalOpen])
  const closeModal = useCallback(() => setModal(false), [isModalOpen])

  return (


    <Container maxWidth={'lg'}>
      <>
        <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
          <Button variant="outlined" color="primary" onClick={openModal}>
            Open simple dialog
          </Button>
        </Grid>

        <Dialog onClose={closeModal} aria-labelledby="simple-dialog-title" open={isModalOpen}>
          <SorterModal/>
        </Dialog>
      </>


    </Container>
  )
}

export default Home
