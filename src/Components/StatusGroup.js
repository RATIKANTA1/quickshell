import React from 'react';
import { getUserInfo } from './helpers'; // Ensure getUserInfo is imported
// import doneIcon from '../assets/icons_FEtask/Done.svg'
import CancelledIcon from '../assets/icons_FEtask/Cancelled.svg'
import TodoIcon from '../assets/icons_FEtask/To-do.svg'
// import progressIcon from '../assets/icons_FEtask/in-progress.svg'




function StatusGroup({ groupedTickets, users }) {
  const renderTicketCards = (tickets) => {
    return tickets.map((ticket) => {
      const userInfo = getUserInfo(ticket.userId, users); 

      return (
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
          <p className="ticket-description">{ticket.description}</p>
          <div className="ticket-meta">
            <span className="ticket-status">{ticket.status==="Todo"?<img src={TodoIcon} alt="Grouping Icon" width="16" height="16"/>:""}</span>
            <span className="ticket-feature">{ticket.tag[0]}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {Object.keys(groupedTickets)
        .filter((status) => status !== 'Backlog') 
        .map((status, index) => {
          return (
            <div key={index} className="kanban-column">
              <div className="kanban-column-header">
                <h2>{status}</h2>
                <span>{groupedTickets[status].length}</span>
              </div>
              {renderTicketCards(groupedTickets[status])}
            </div>
          );
        })}

     
      <div className="kanban-column">
        <div className="kanban-column-header">
          <h2>Done</h2>
           
        </div>
      </div>

      <div className="kanban-column">
        <div className="kanban-column-header more">
          <img src={CancelledIcon} alt="Icon" width="16" height="16" />
          <h2>Cancelled</h2>
          
        </div>
      </div>
    </>
  );
}

export default StatusGroup;
