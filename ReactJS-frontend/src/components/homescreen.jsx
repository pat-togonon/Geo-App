import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserIP, searchForIp } from "../service/ip"
import IpDetails from "./ipdetails"
import { useErrorStore } from "../store/errorStore"
import Error from "./error"


const HomeScreen = () => {
  const [userIp, setUserIp] = useState('')
  const [searchIp, setSearchIp] = useState('')
  const [error, setError] = useState(null)
  const [searchHistory, setSearchHistory] = useState([])
  const setErrorMessage = useErrorStore(state => state.setErrorMessage)
  const clearErrorMessage = useErrorStore(state => state.clearErrorMessage)
  const [hide, setHide] = useState(false)
  const [showChecks, setShowChecks] = useState(false)
  const [searchItemsToDelete, setsearchItemsToDelete] = useState([])

  const navigate = useNavigate()
  const isUserLoggedIn = localStorage.getItem("loggedIn")

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/login')
    }
  }, [isUserLoggedIn])

  useEffect(() => {
    fetchUserIp()
  },[])

  const fetchUserIp = async () => {

    try {
      const userIpTofetch = await getUserIP()
      setUserIp(userIpTofetch)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        clearErrorMessage()
      }, 5000)
    }
  }

  const handleSearchIp = (event) => {
    event.preventDefault()

    if (!searchIp) {
      console.log('Please enter valid IP address.')
      return
    }
    
    setSearchHistory([...searchHistory].concat(searchIp))
    ipSearch(searchIp)
    setSearchIp('')
  }

  const ipSearch = async (ip) => {
    clearErrorMessage()

    try {
      const ipInfo = await searchForIp(ip)
      setUserIp(ipInfo)
      setError(null)
    } catch (error) {
      setError(error.response.data.error)
      setErrorMessage(error.response.data.error)
    }

  }

  const handleDeleteHistory = (event) => {
    setSearchHistory([])
    fetchUserIp()
  }

  const handleSearchSelectDeletion = () => {
    setHide(!hide)
    setShowChecks(!showChecks)
  }

  const historyDivStyle = {
    display: hide ? 'none' : ''
  }

  const checkHistoryDivStyle = {
    display: showChecks ? '' : 'none'
  }

  const handleSelectedDeletion = (event) => {
    let updatedSearchHistory = []

    for (const history of searchHistory) {
      if (!searchItemsToDelete.includes(history)) {
        updatedSearchHistory.push(history)
      }
    }

    setSearchHistory(updatedSearchHistory)
    setHide(!hide)
    setShowChecks(!showChecks)
  }

  const handleHistorySelection = (searchItem) => {
    setsearchItemsToDelete([...searchItemsToDelete].concat(searchItem))
  }

  const handleSelectedCancel = (event) => {
    setHide(!hide)
    setShowChecks(!showChecks)
  }

  return (
    <>    
      <h2>IP Address & Geolocation Info</h2>
      <div>
        <form onSubmit={handleSearchIp}>
          <input type="text" value={searchIp} onChange={({ target }) => setSearchIp(target.value)} placeholder="Enter IP to search..."/>
          <button type="submit" className="searchIpButton">Search IP info</button>
        </form>
        {error && <div className="errorComponent errorDiv">
          <Error />
        </div>}
        <IpDetails ip={userIp} error={error} />
      </div>
      <div>
        {searchHistory.length > 0 && <h2>Your search history</h2>}
        <div style={historyDivStyle}>
          {searchHistory.map((s, i) => <li key={`search-${i}`} onClick={() => ipSearch(s)} className="searchListItem">{s}</li>)}
        </div>
        <div style={checkHistoryDivStyle}>
          {searchHistory.map((s, i) => 
            <label key={`search-check-${i}`} className="checkbox"><input type="checkbox" value={s} onChange={() => handleHistorySelection(s)}/>{s}</label>
          )}
        </div>
      </div>
      <div style={historyDivStyle}>
        {searchHistory.length > 0 && <button type="button" onClick={handleSearchSelectDeletion} className="selectSearchButton">Select search history to delete</button>}

        {searchHistory.length > 0 && <button type="button" onClick={handleDeleteHistory} className="deleteAllButton">Delete all</button>}
      </div>
      <button type="button" style={checkHistoryDivStyle} onClick={handleSelectedDeletion} className="selectSearchButton">Delete selected</button>
      <button type="button" style={checkHistoryDivStyle} onClick={handleSelectedCancel} className="deleteAllButton">Cancel</button>

    </>
  )

}

export default HomeScreen