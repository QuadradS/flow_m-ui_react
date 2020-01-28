//@flow
import React from 'react'
import { Container, createStyles, Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import PainterModal from '../components/PainterModal'

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

  return (
    <Container maxWidth={'lg'}>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
        <PainterModal/>
      </Grid>
    </Container>
  )
}

export default Home
