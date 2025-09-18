import Add from "./Add"
import Remove from "./Remove"

const modals = {
  adding: Add,
  removing: Remove,
}

export default modalName => modals[modalName]
