var ToastValues: ToastInterface = {
  content: <></>,
  status: "CLOSED"
}

interface ToastInterface {
  content: JSX.Element,
  status: "CLOSED" | "OPEN" | "INITIATE CLOSE"
}

export { ToastValues }
export type { ToastInterface }
