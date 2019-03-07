import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../../config/constants'

import './style.css'

function getTileSprite(type) {
  switch(type) {
    case 0:
      return 'bush'
    case 3:
      return 'chest'     
    case 5:
      return 'tree'
    case 6:
      return 'trunk'  
  }
}
function MapTile(props) {
  return <div className={`tile ${getTileSprite(props.tile)}`}
              style={{
                height: SPRITE_SIZE,
                width: SPRITE_SIZE,
              }}
          >
  </div>
}

function MapRow(props) {
  return <div className='row'>
    {
      props.tiles.map( tile => <MapTile tile={tile} /> )
    }
  </div>
}
function Maps(props) {
  return (
    <div
    style={{
      position: 'relative',
      top: '0px',
      left: '0px',
      width: '800px',
      height: '600px',
      border: '4px solid white',
      background: `url('/tiles/sample-back.png')`,
    }}
    >
     {
       props.tiles.map( row => <MapRow tiles={row} /> )
      }
    </div>
  )
}

function msp(state) {
  return {
    tiles: state.map.tiles,
  }
}

export default connect(msp)(Maps)