import styles from "./toast.module.css"

export default function toastReducer(values, action) {
  switch (action.type) {
    //updates the location, typical set to where the most whitespace is
    case "updateLocation": {
      if(action.location == "topLeft") {
        return {
          ...values,
          location: styles.topLeft
        } 
      }  else if(action.location == "bottomLeft") {
        return {
          ...values,
          location: styles.bottomLeft
        }
      }
    }
    //opens the toast
    case "open": {
      return {
        ...values,
        content: action.content,
        initiateOpen: true
      }
    }
    //used to time animation
    case "openComplete": {
      return {
        ...values,
        initiateOpen: false
      }
    }
    //closes the toast
    case "close": {
      return {
        ...values,
        initiateClose: true
      }
    }
    //used to time animation
    case "closeComplete": {
      return {
        ...values,
        initiateClose: false
      }
    }
    //used when closing the toast to guarentee content matches what is expected
    case "resetContent": {
      return {
        ...values,
        content: <></>
      }
    }
  }
}