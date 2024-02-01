import { Dispatch, ReactNode } from "react"

type State = {
  location: string,
  content: ReactNode,
  initiateOpen: boolean,
  initiateClose: boolean,
}

type Action = {
  type: string, 
  location?: string, 
  content?: ReactNode
}

type Props = {
  values: State,
  dispatch: Dispatch<Action>
}

export type { State, Action, Props }