import { useErrorStore } from "../store/errorStore"

const Error = () => {

  const error = useErrorStore(state => state.errorMessage)

  if (!error) {
    return null
  }

  return (
    <>
      <div>
        {error}
      </div>
    </>
  )
}

export default Error