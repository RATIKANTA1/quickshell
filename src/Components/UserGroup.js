import React from 'react';
import { getUserInfo } from './helpers';
import TodoIcon from '../assets/icons_FEtask/To-do.svg'
import progressIcon from '../assets/icons_FEtask/in-progress.svg'
import BacklogIcon from '../assets/icons_FEtask/Backlog.svg'

function UserGroup({ groupedTickets, users }) {
  return (
    <>
      {Object.keys(groupedTickets).map((group, index) => {
        const userInfo = getUserInfo(group, users); 

        return (
          <div key={index} className="kanban-column">
            <div className="kanban-column-header">
              <h2>{userInfo.name}</h2>
              <span>{groupedTickets[group].length}</span>
            </div>
            {groupedTickets[group].map((ticket) => (
              <div key={ticket.id} className="kanban-card">
                <div className="kanban-card-header">
                  <span className="ticket-id">{ticket.id}</span>
                  <img 
                        src={userInfo.avatar || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'} 
                        alt={userInfo.name} 
                        className="user-avatar" 
                      />
                </div>
                <h3 className="ticket-title">{ticket.title}</h3>
                 <div className='userp'>
                 {ticket.status==="Todo"?<img  className="img" src={TodoIcon} alt="Grouping Icon" width="16" height="16"/>:(ticket.status==="In progress"?<img className='img' src={progressIcon} alt="Grouping Icon" width="16" height="16" />:<img className='img' src={BacklogIcon} alt="Grouping Icon" width="16" height="16" />)}
                <p className="ticket-description">{ticket.description}</p>
                 </div>
                <div className="ticket-meta">
                  
                  <span className="ticket-feature">{ticket.tag[0]}</span>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

export default UserGroup;
