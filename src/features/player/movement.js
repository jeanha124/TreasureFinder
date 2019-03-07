import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'
import { getTileSprite } from '../map/index'


export default function handleMovement(player) {

  let score = 0;
  function getNewPosition(oldPos, direction) {
    switch(direction) {
      case 'WEST':
      return [ oldPos[0] - SPRITE_SIZE, oldPos[1] ]
      case 'EAST':
      return [ oldPos[0] + SPRITE_SIZE, oldPos[1] ]
      case 'NORTH':
      return [ oldPos[0], oldPos[1] - SPRITE_SIZE ]
      case 'SOUTH':
      return [ oldPos[0], oldPos[1] + SPRITE_SIZE ]
    }
  }
  
  function withinBounds(oldPos, newPos) {
    return ((newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
    (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)) 
  } 
  
  
  function moveDirection(direction, newPos) {
    const walkIndex = getWalkIndex()
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex),
      }
    })
    
  }
  
  function isPassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles
    const y = newPos[1] / SPRITE_SIZE
    const x = newPos[0] / SPRITE_SIZE
    const nextTile = tiles[y][x]
    // if (nextTile === 3 && handleKeyDown(e => e.keycode === 32)){
    //   score += 1;
    // }
    return nextTile < 5
  }

  function attemptMove(direction) {
    const oldPos = store.getState().player.position
    const newPos = getNewPosition(oldPos, direction)

    if (withinBounds(oldPos, newPos) && isPassable(oldPos, newPos)) {
      moveDirection(direction, newPos)
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex
    return walkIndex >= 3 ? 0 : walkIndex + 1
  }
  function getSpriteLocation(direction, walkIndex) {
    switch(direction) {
      case 'SOUTH':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`
      case 'NORTH':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`
      case 'EAST':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`
      case 'WEST':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`
    }
  }

  function handleKeyDown(e) {
    e.preventDefault()
    
    // const tiles = store.getState().map.tiles;
    switch(e.keyCode) {
      case 32:
        return alert("You have found a treasure.")
      case 37:
        return attemptMove('WEST')
      case 38:
        return attemptMove('NORTH')
      case 39:
        return attemptMove('EAST')
      case 40:
        return attemptMove('SOUTH')

      default:
        console.log(e.keyCode)
    }
  }

  window.addEventListener('keydown', (e)=> {
    handleKeyDown(e)
  })
  return player
}