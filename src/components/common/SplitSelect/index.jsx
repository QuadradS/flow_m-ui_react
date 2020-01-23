import React from 'react'
import { makeStyles, withStyles } from '@material-ui/styles'
import { Button, createStyles, Grid, Menu, MenuItem, TextField, Theme } from '@material-ui/core'


const CustomTextField = withStyles({
  root: {
    width: '100%',
    '& .MuiInput-underline:before': {
      display: 'none'
    },
    '& .MuiInput-underline:after': {
      display: 'none'
    },
    '& input': {
      width: '100%',
      color: '#455A64',
      borderRadius: '4px 0px 0px 4px',
      border: '1px solid #CED4DA',
      borderRight: 'none',
      fontSize: 14,
      boxSizing: 'border-box',
      padding: 16,
      height: 48
    }
  }
})(TextField)

const CustomButton = withStyles({
  root: {
    border: '1px solid #A3D2FC',
    boxSizing: 'border-box',
    borderRadius: '0px 4px 4px 0px',
    width: '100%',
    height: 48,
    '& .MuiButton-label': {
      padding: '4px 8px',
      color: '#1E88E5',
      fontWeight: '600',
      fontSize: 14,
      textTransform: 'none'
    }
  }
})(Button)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fw: {
      width: '100%'
    },
    inputWrap: {
      maxWidth: '70%',
      width: '100%'
    },
    selectWrap: {
      maxWidth: '30%',
      width: '100%'
    }
  })
)

interface SplitSelectPropsType {
  word: string,
  handleSelect: (name: string) => void,
  selectedValues: string[]
}

const variants: string[] = ['name', 'surname', 'email', 'phone']

export default function SplitSelect({ word, handleSelect, selectedValues = [] }: SplitSelectPropsType) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedValue, setValue] = React.useState('Select item')

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (v: string) => () => {
    setAnchorEl(null)
    handleSelect(v)
    setValue(v)
  }
  return (
    <Grid GridWrap={'nowrap'} className={classes.fw} container alignItems={'center'}>
      <Grid className={classes.inputWrap} item>
        <CustomTextField disabled placeholder={'Select type'} value={word}/>
      </Grid>
      <Grid item className={classes.selectWrap}>
        <CustomButton onClick={handleClick}>
          {selectedValue}
        </CustomButton>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
          {variants
            .filter((v: string) => !!selectedValues.every((sv: string) => sv !== v) )
            .map((v: string) => (
              <MenuItem onClick={handleClose(v)} key={v}>{v}</MenuItem>
            ))}
        </Menu>
      </Grid>
    </Grid>
  )
}
