import React from 'react'

import { GrAdd, GrDocumentUpdate } from "react-icons/gr";
import { IoMdCreate } from "react-icons/io";
import { BiBook } from "react-icons/bi";
import { useEffect } from 'react';
import { useState } from 'react';
import { APIGetHistory } from '../../../api/actions';
import { dateFormat } from '../../../utils/dataFormat';

const BUTTON_TYPES = ["all", "note", "auth", "group", "player"];

const History = ({ token }) => {

  const [history, setHistory] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1)

  const iconForAction = (action) => {
    if (action === "update") return <GrDocumentUpdate />;
    if (action === "create") return <IoMdCreate />;
    if (action === "archive") return <BiBook />;
    if (action === "add") return <GrAdd />;
  };

  useEffect(() => {
    const getHistory = async () => {
      const { data, error } = await APIGetHistory(token, query, page);

      if (error) {
        console.warn(error);
        return;
      }

      setHistory(data.history);
    };

    getHistory();

  }, [query, token, page])

  const handlePageChange = (change) => {
    if(change < 0 && page === 1) return
    setPage(curr => curr + change)
  }

  return (
        <>
          <div className="admin__query-controls">
            {BUTTON_TYPES.map((label) => (
              <button
                key={label}
                onClick={() => setQuery(label === "all" ? "" : label)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="admin__history">
            <div className="admin__history__controls">
                <button disabled={page === 1} onClick={() => handlePageChange(-1)}>Back</button>
                <button disabled={!history.length} onClick={() => handlePageChange(1)}>Forward</button>
            </div>
            {!history.length && <div>No History Left</div>}
            {history.map((history, index) => {
              return (
                <div className="admin__history__row" key={index}>
                  <div className="admin__history__row__reference">
                    <div className="admin__history__row__reference__username">
                      <p>{history.username}</p>
                    </div>
                    <div className="admin__history__row__reference__type">
                      <p>{history.type}</p>
                    </div>
                    <div className="admin__history__row__reference__date">
                      <p>{dateFormat(history.time_stamp)}</p>
                    </div>
                    <div className="admin__history__row__reference__action">
                      <p>{history.action}</p>
                      {iconForAction(history.action)}
                    </div>
                  </div>
                  <div className="admin__history__row__body">
                    {history.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </>
  )
}

export default History

/*

        // <>
        //   <div className="admin__query-controls">
        //     {BUTTON_TYPES.map((label) => (
        //       <button
        //         key={label}
        //         onClick={() => setQuery(label === "all" ? "" : label)}
        //       >
        //         {label}
        //       </button>
        //     ))}
        //   </div>
        //   <div className="admin__history">
        //     {history.map((history, index) => {
        //       return (
        //         <div className="admin__history__row" key={index}>
        //           <div className="admin__history__row__reference">
        //             <div className="admin__history__row__reference__username">
        //               <p>{history.username}</p>
        //             </div>
        //             <div className="admin__history__row__reference__type">
        //               <p>{history.type}</p>
        //             </div>
        //             <div className="admin__history__row__reference__date">
        //               <p>{dateFormat(history.time_stamp)}</p>
        //             </div>
        //             <div className="admin__history__row__reference__action">
        //               <p>{history.action}</p>
        //               {iconForAction(history.action)}
        //             </div>
        //           </div>
        //           <div className="admin__history__row__body">
        //             {history.detail}
        //           </div>
        //         </div>
        //       );
        //     })}
        //   </div>
        // </>

*/