import React, { useEffect, useState } from "react";
import { GET_ERRORS } from "../actions/types";
import { useSelector, useDispatch } from "react-redux";
import historyuser from "../outils/history";


function Notifications() {
const dispatch = useDispatch();
const [countnotif, setCountnotif] = useState(0);
const allnotif=useSelector(state=>state.notification.notifications)
let auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }, []);

  return (
    <>
   
    <div
        className="col l9 offset-l1 s12"
        style={{ marginTop: "20px", fontSize: 15, fontWeight: 800 }}
    ></div>

    <span>
      <table style={{marginBottom:10}}>
        <thead>
          <tr>
            <th className="center-align">Title</th>
            <th className="center-align">Content</th>
            <th className="center-align">Executed by</th>
            <th className="center-align">Created at</th>
          </tr>
        </thead>

            <tbody>
              {allnotif &&
                allnotif
                  .slice(0)
                  .reverse()
                  .slice(0, 10 + countnotif * 10)
                  .map((el) => {
                    return (
                      <tr
                        key={el._id}
                        className="center-align"
                      >
                        <td className="center-align" style={{ padding: 0 }}>
                          <span
                          >
                            {el.title}
                          </span>
                        </td>
                        <td className="center-align" style={{ padding: 0 }}>
                          <span className="center-align">
                            {el.content}
                          </span>
                        </td>
                        <td className="center-align" style={{ padding: 0 }}>
                          <span>{el.role}</span>
                        </td>
                        <td className="center-align" style={{ padding: 0 }}>
                          <span>
                            <i
                              className=" tiny material-icons"
                              style={{
                                transform: "translateY(2px)",
                                marginRight: 5,
                              }}
                            >
                              history
                            </i>
                            {historyuser(el.created_at)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          <p>
            {(countnotif + 1) * 10 < allnotif.length && (
           <div style={{
           marginBottom:"50px",
           cursor: "pointer",
           display: "flex",
           justifyContent:"center",
           alignItems:"center"}}
           id="loadMore" className="thb-gp-load-more"
           data-thb-gp-lm-type="event"
           data-org-text="MORE"
           onClick={() => {
                  setCountnotif(countnotif + 1);
                }}>SHOW MORE</div>)}
          </p>
        </span>
      
            


 







    </>
  );
}

export default Notifications;
