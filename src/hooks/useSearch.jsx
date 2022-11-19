import { useState, useEffect } from 'react'
import { APIGetPlayers } from '../api/actions'
import { PLAYER_SEARCH_TYPE } from '../utils/constants'
import useDebounce from './useDebounce'

const useSearch = (token, type, selectedGroupId) => {
  const [searchInput, setSearchInput] = useState("")
  const [searchError, setSearchError] = useState()
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  const { debouncedValue } = useDebounce(searchInput)

  useEffect(() => {
    // TODO: Add logic here if there was no result for the previous search
    const search = async () => {
      const { success, error } = await searchByType()
      error ? setSearchError(error) : setSearchResults(success.data)
      setSearchLoading(false)
    }
    
    const searchByType = async () => {
      if(type === PLAYER_SEARCH_TYPE) return await APIGetPlayers(token, selectedGroupId, debouncedValue)
    }
    
    if(debouncedValue) search() 
  }, [debouncedValue, token, selectedGroupId, type])
  
  useEffect(() => {
    if(searchInput) setSearchLoading(true)
  }, [searchInput])

  const updateSearch = (e) => setSearchInput(e.target.value)

  return { searchInput, updateSearch, searchResults, searchError, searchLoading }
}

export default useSearch