import React from 'react'
import { connect } from 'react-redux'
import trainerSprite from './trainer.png'
import handleMovement from './movement'


function Player(props) {
  return (
    <div 
      style={{
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${trainerSprite}')`,
        backgroundPosition: props.spriteLocation,
        width: '40px',
        height: '40px',
      }}
    />
  )
}

function msp(state) {
  return {
    ...state.player,
    
  }
} 

export default connect(msp)(handleMovement(Player))