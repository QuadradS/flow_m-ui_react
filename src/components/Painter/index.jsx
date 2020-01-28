// @flow
import React from 'react'

export interface offsetType {
  offsetX: number,
  offsetY: number
}

export interface coordinateType {
  prevPos: offsetType,
  offSetData: offsetType,
  userStrokeStyle: string
}

interface lineCoordsType {
  start: offsetType,
  stop: offsetType,
}

interface PainterProps {
  handleCreateSignature: (coords: coordinateType[]) => void,
  width?: number,
  height?: number,
  existsCoords?: coordinateType[],
  userStrokeStyle?: string,
  background?: string,
}

class Painter extends React.Component <PainterProps, void> {
  canvas: HTMLCanvasElement | null = null
  ctx: CanvasRenderingContext2D
  isPainting: boolean = false
  userStrokeStyle: string = this.props.userStrokeStyle || '#36444C'
  line: lineCoordsType = {
    start: { offsetX: 0, offsetY: 0 },
    stop: { offsetX: 0, offsetY: 0 }
  }
  prevPos: offsetType = { offsetX: 0, offsetY: 0 }
  savedCoords: coordinateType[] = []

  onMouseDown = ({ nativeEvent }: { nativeEvent: Object }) => {
    this.isPainting = true
    this.prevPos = { offsetX: nativeEvent.offsetX, offsetY: nativeEvent.offsetY }
  }

  onMouseMove = ({ nativeEvent }: { nativeEvent: Object }) => {
    if (this.isPainting) {
      const offSetData = { offsetX: nativeEvent.offsetX, offsetY: nativeEvent.offsetY }
      const positionData = { start: this.prevPos, stop: offSetData }

      this.line = Object.assign({}, positionData, this.line)
      this.savedCoords.push({ prevPos: this.prevPos, offSetData, userStrokeStyle: this.userStrokeStyle })
      this.paint(this.prevPos, offSetData, this.userStrokeStyle)
    }
  }

  endPaintEvent = () => {
    if (this.isPainting) {
      this.isPainting = false
      this.props.handleCreateSignature(this.savedCoords)
    }
  }

  paint = (prevPos: offsetType, currPos: offsetType, strokeStyle: string) => {
    const { offsetX, offsetY } = currPos
    const { offsetX: x, offsetY: y } = prevPos

    this.ctx.beginPath()
    this.ctx.strokeStyle = strokeStyle
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(offsetX, offsetY)
    this.ctx.stroke()
    this.prevPos = { offsetX, offsetY }
  }

  componentDidMount() {
    if (this.canvas) {
      this.canvas.width = this.props.width || 100
      this.canvas.height = this.props.height || 100
      this.ctx = this.canvas.getContext('2d')
      this.ctx.lineJoin = 'round'
      this.ctx.lineCap = 'round'
      this.ctx.lineWidth = 5

      if (!!this.props.existsCoords) {
        this.props.existsCoords.forEach((l: coordinateType) => this.paint(l.prevPos, l.offSetData, l.userStrokeStyle))
      }
    }
  }

  render() {
    return (
      <canvas
        ref={(ref) => (this.canvas = ref)}
        style={{ background: this.props.background }}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
      />
    )
  }
}

export default Painter
