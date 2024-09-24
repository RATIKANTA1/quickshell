import React from 'react';
import { getUserInfo } from './helpers'; 

import urgentIcon from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg'
import mediumIcon from '../assets/icons_FEtask/Img - Medium Priority.svg'
// import highIcon   from '../assets/icons_FEtask/SVG - Urgent Priority grey.svg'
import lowIcon   from '../assets/icons_FEtask/Img - Low Priority.svg'
import noIcon    from '../assets/icons_FEtask/No-priority.svg'




function PriorityGroup({ groupedTickets, priorityLabels, users }) {
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
            {/* <span className="ticket-status">{ticket.status}</span> */}
            <span className="ticket-feature">{ticket.tag[0]}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {Object.keys(groupedTickets).map((priority, index) => {
        const priorityTitle = priorityLabels[priority];
        return (
          <div key={index} className="kanban-column">
            <div className="kanban-column-header">
            <h2>
  {priorityTitle === "No priority" ? (
    <img className='img' src={noIcon} alt="Grouping Icon" width="16" height="16" />
  ) : priorityTitle === "Low" ? (
    <img className='img' src={lowIcon} alt="Grouping Icon" width="16" height="16" />
  ) : priorityTitle === "Urgent" ? (
    <img className='img' src={urgentIcon} alt="Grouping Icon" width="16" height="16" />
  ) : priorityTitle === "Medium" ? (
    <img className='img' src={mediumIcon} alt="Grouping Icon" width="16" height="16" />
  ) : ""}
  {priorityTitle}
</h2>

              <span>{groupedTickets[priority].length}</span>
            </div>
            {renderTicketCards(groupedTickets[priority])}
          </div>
        );
      })}
    </>
  );
}

export default PriorityGroup;
