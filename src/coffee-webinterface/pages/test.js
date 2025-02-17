import React from 'react'
import AppFrame from '../components/AppFrame'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'

import 'isomorphic-fetch'

import { LogViewer } from '../components/LogViewer'
import { PacketViewer } from '../components/PacketViewer'
import { init, delonghi } from '../lib/delonghi'

import {
  PREGROUND
} from '../lib/delonghi/const/grind-modes'

import { observer } from 'mobx-react'

// initialize delonghi with default transport and protocol
init()

const styles = {
  grid: {
    height: '100%'
  }
}

@observer
class TestPage extends React.Component {
  state = {
    counter: 0
  }

  constructor () {
    super()

    this.delonghi = delonghi
  }

  componentDidMount () {
    // poll the current device state
    this.delonghi.sendData('p')
  }

  handleClick = () => {
    this.delonghi.sendData('r')
  }

  render () {
    const {
      counter,
      history,
      lcdOrHex,
      lcdAndHex
    } = this.state

    this.state.counter = counter + 1

    return (
      <AppFrame title='Develop'>
        <Typography>Rendercount: {counter}</Typography>
        <Grid container direction='row' style={styles.grid}>
          <Grid item xs={6}>
            <Grid container direction='column'>
              <Grid item>
                <Button raised color='accent' onClick={this.handleClick}>
                  Reset Machine
                </Button>
                <Button raised color='accent' onClick={() => this.delonghi.resetFilters()}>
                  Reset Filters
                </Button>
                <Button raised color='accent' onClick={() => this.delonghi.sendData('b00FFFF00000000FF00t3bFFFFFFFFFFFFFFFFFFt8')}>
                  Enable Log
                </Button>
                <Button raised color='accent' onClick={() => this.delonghi.sendData('b000000000000000000t3b000000000000000000t8')}>
                  Disable Log
                </Button>
                <br />
                <Button raised color='accent' onClick={() => this.delonghi.setGrindMode(PREGROUND)}>
                  PreGround
                </Button>
                <Button raised color='accent' onClick={() => this.delonghi.setGrindMode('other')}>
                  Other
                </Button>
                <Button raised color='accent' onClick={() => this.delonghi.sendData('p')}>
                  Poll
                </Button>
              </Grid>

              <Grid container direction='row'>
                <Grid item xs={6}>
                  <PacketViewer type='lcd' delonghi={this.delonghi} />
                </Grid>
                <Grid item xs={6}>
                  <PacketViewer type='pb' delonghi={this.delonghi} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <LogViewer delonghi={this.delonghi} />
          </Grid>
        </Grid>
      </AppFrame>
    )
  }
}

export default TestPage
