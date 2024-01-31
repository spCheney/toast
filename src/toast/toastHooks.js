import { useEffect, useState } from "react"
import useToast from "./useToast"
import styles from "./toast.module.css"

/**
 * determines whether or not to display the toast
 * @param {boolean} initiateClose 
 * @param {boolean} initiateOpen 
 * @param {number} closeAnimationDuration 
 * @param {number} openAnimationDuration 
 * @returns boolean - false if toast is on the screen, true if it isn't
 */
function useIsClosed(initiateClose,  initiateOpen, closeAnimationDuration, openAnimationDuration) {
  const [isClosed, setIsClosed] = useState(true)
  const dispatch = useToast()

  useEffect(() => {
    //closes the toast
    if(initiateClose) {
      if(!isClosed) {
        //ensures the toast is closed/remove until animation is complete
        setTimeout(() => {
          setIsClosed(true)
          dispatch({ type: "resetContent" })
          dispatch({ type: "closeComplete" })
        }, closeAnimationDuration * 1000)
      }
      
    }

    //opens the toast
    if(initiateOpen) {
      if(isClosed) {
        setIsClosed(false)
        dispatch({ type: "openComplete" })
      } else {
        //if the toast is already open close/reset it so it better meets user's expecations
        setIsClosed(true)
        
        //if we instantly close and open the toast it doesn't register in the DOM so we need a short delay
        setTimeout(() => {
          setIsClosed(false)
          dispatch({ type: "openComplete" })
        }, openAnimationDuration * 1000)
      }
    }
  }, [initiateClose, initiateOpen,  closeAnimationDuration, openAnimationDuration])

  return isClosed
}

/**
 * controls the location of the toast
 * @param {css module  class} updatedLocation 
 * @param {boolean} isClosed 
 * @returns a css module class that set the location of the toast
 */
function useLocation(updatedLocation, isClosed) {
  const [location, setLocation] = useState(styles.topLeft)
  const dispatch = useToast()

  useEffect(() => {
    if(location != updatedLocation) {
      //if the toast is still open, close it so the toast doesn't instantly jump locations
      if(!isClosed) {
        dispatch({ type: "close" })
      } else {
        setLocation(updatedLocation)
      }
    }
  }, [updatedLocation, isClosed])

  return location
}

export { useIsClosed, useLocation }