import React, { useCallback, useState } from 'react'
import { Box } from '@material-ui/core'
import SplitButton from '../common/SplitSelect'
import Typography from '@material-ui/core/Typography'


const Sorter = ({ words }: { words: string }) => {

  const [sortedObj: { [key: string]: number }, setSortedObject] = useState({})

  const setValue = useCallback((key: number) => (name: string) => {

    if (!Object.keys(sortedObj).length) {
      setSortedObject({ ...sortedObj, [name]: key })
    }

    for (const k in sortedObj) {
      if (sortedObj[k] === key) {
        delete sortedObj[k]
        setSortedObject({ ...sortedObj, [name]: key })
      } else {
        setSortedObject({ ...sortedObj, [name]: key })
      }
    }
  })

  return (
    <>
      {words.map((w: string, k: number) => (
        <Box key={k} m={2}>
          <SplitButton id={k} word={w} handleSelect={setValue(k)} selectedValues={Object.keys(sortedObj)}/>
        </Box>
      ))}
      <Typography>
        {JSON.stringify(sortedObj, true)}
      </Typography>
    </>
  )
}

export default Sorter
