import React, { useCallback, useState } from 'react'
import { Box, createStyles, Divider, Paper, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Sorter from '../Sorter'
import Button from '@material-ui/core/Button'

const fakeWords: string[] = ['Hello', 'Danil']


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sorterContainer: {
      maxWidth: 692,
      width: '100%'
    },
    titleText: {
      fontWeight: 600,
      color: '#455A64',
      fontSize: 14
    },
    text: {
      fontWeight: 400,
      color: '#455A64',
      fontSize: 12
    }
  })
)

const SorterModal = ({ words }: { words: string[] }) => {
  const classes = useStyles()
  const [isShowExistsParsedWords, setShowExistsParsedWords] = useState(false)

  const toggleExistsParsedWords = useCallback(() => setShowExistsParsedWords(!isShowExistsParsedWords), [isShowExistsParsedWords])

  return (
    <Paper className={classes.sorterContainer}>
      <Box m={2}>
        <Typography className={classes.titleText}>
          Import Customers Base
        </Typography>
      </Box>

      <Divider/>

      <Box m={2}>
        <Typography className={classes.titleText}>
          Fields from uploaded CSV file
        </Typography>
      </Box>

      <Box m={2}>
        <Typography className={classes.text}>
          Please choose correct columns and click Show Table Preview to see your imported data.
          Send us your base file and we'll import it ourselves if you have any problems with that.
        </Typography>
      </Box>

      <Box m={2}>
        <Button
          onClick={toggleExistsParsedWords}>{`${isShowExistsParsedWords ? 'hide' : 'show'} exists parsed words`}</Button>
      </Box>
      <Sorter words={fakeWords}/>
    </Paper>

  )
}

export default SorterModal
