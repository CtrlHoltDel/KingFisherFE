import { useState } from 'react'
import { APIAddNote, APIGetNotes, APIUpdateType } from '../api/actions';
import { NOTE_TYPE } from '../utils/constants';
import { formatNotes } from '../utils/dataFormat';

const usePlayer = (user, currentlySelectedGroup) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [loadingPlayer, setLoadingPlayer] = useState(false)
    const [loadingUpdatingPlayer, setLoadingUpdatingPlayer] = useState(false)


    const selectPlayer = async (value) => {
        setLoadingPlayer(true);
        const { success, error } = await APIGetNotes(user.token, value.id);
    
        if (error) {
          console.log("handle error");
          return;
        }
    
        setSelectedPlayer({ ...success, ...formatNotes(success.notes) });
        setLoadingPlayer(false);
      };

      const addNoteToPlayer = async (type, note, playerId) => {
        setLoadingUpdatingPlayer(true)
        setSelectedPlayer(curr => {
          curr[type === NOTE_TYPE ? 'notes' : 'tendencies'].push({ note, created_time: new Date().toISOString().slice(0, 19).replace('T', ' '), created_by: user.username, type })
          return curr;
        })
    
        await APIAddNote(user.token, playerId, { note, type })
        setLoadingUpdatingPlayer(false)
      }

      const updateType = async (newType) => {
        setLoadingUpdatingPlayer(true)
        let playerId;
        setSelectedPlayer(curr => {
          playerId = curr.player.id
          return { ...curr, player: { ...curr.player, type: newType }}
        })
    
        await APIUpdateType(user.token, currentlySelectedGroup.id, playerId ,newType)
        setLoadingUpdatingPlayer(false)
      }
    

    return { selectedPlayer, loadingPlayer, selectPlayer, addNoteToPlayer, updateType, loadingUpdatingPlayer }

}

export default usePlayer