import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './KanbanBoard.css';
import StatusGroup from './StatusGroup';
import UserGroup from './UserGroup';
import PriorityGroup from './PriorityGroup';
// import { getUserInfo } from './helpers'; // Helper for fetching user info
import displayIcon from '../assets/icons_FEtask/Display.svg'

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [groupedTickets, setGroupedTickets] = useState({});
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

  // Fetch tickets and users on mount
  useEffect(() => {
    const savedGroupBy = localStorage.getItem('groupBy');
    const savedSortBy = localStorage.getItem('sortBy');

    if (savedGroupBy) setGroupBy(savedGroupBy);
    if (savedSortBy) setSortBy(savedSortBy);

    // Fetch tickets and users data using Axios
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Group and sort tickets when groupBy or sortBy changes
  useEffect(() => {
    // Save the current grouping and sorting preferences to localStorage
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);

    let sortedTickets = [...tickets];

    // Sorting logic
    if (sortBy === 'priority') {
      sortedTickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Grouping logic
    const grouped = sortedTickets.reduce((acc, ticket) => {
      const key = groupBy === 'status' ? ticket.status :
                  groupBy === 'user' ? ticket.userId :
                  groupBy === 'priority' ? ticket.priority : '';

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ticket);
      return acc;
    }, {});

    setGroupedTickets(grouped);
  }, [tickets, groupBy, sortBy]);

  // Toggle dropdown visibility
  const handleLabelClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="kanban-container">
      <div className="kanban-controls">
        <div className="display-control">
          <label onClick={handleLabelClick}>
            <img src={displayIcon} alt="Grouping Icon" width="16" height="16" /> Display
          </label>
          {isDropdownVisible && (
            <div className="dropdown">
              <div className="inner">
                <label htmlFor="grouping">Grouping </label>
                <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} id="grouping">
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <div className="inner">
                <label htmlFor="order">Ordering </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} id="order">
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="kanban-board">
        {groupBy === 'status' && (
          <StatusGroup groupedTickets={groupedTickets} priorityLabels={priorityLabels} users={users} />
        )}

        {groupBy === 'user' && (
          <UserGroup groupedTickets={groupedTickets} users={users} />
        )}

        {groupBy === 'priority' && (
          <PriorityGroup groupedTickets={groupedTickets} priorityLabels={priorityLabels} users={users} />
        )}
      </div>
    </div>
  );
}

export default KanbanBoard;
