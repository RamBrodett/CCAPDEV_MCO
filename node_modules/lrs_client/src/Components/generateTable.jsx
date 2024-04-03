import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom' if you're using React Router

function generateTable(handleCellClick, bookedCells = [], emptyCells = [], rowCount = 3, colCount = 23, userData = []) {
  // Define the rows and columns based on the specified rowCount and colCount
  const rows = Array.from({ length: rowCount }, (_, i) => String.fromCharCode(65 + i)); // Generates rows from A to rowCount
  const cols = Array.from({ length: colCount }, (_, i) => i + 1); // Generates columns from 1 to colCount

  // Function to generate the title based on the input string
  const generateTitle = (row, col) => `${row}${String(col).padStart(2, '0')}`;

  // Function to check if a cell is booked
  const isBooked = (row, col) => bookedCells.includes(`${row}${String(col).padStart(2, '0')}`);

  // Function to check if a cell is empty
  const isEmpty = (row, col) => emptyCells.includes(`${row}${String(col).padStart(2, '0')}`);

  // Function to get the username for a specific cell
  const getUserFirstname = (rowIndex, colIndex) => {
    const index = rowIndex * colCount + colIndex;
    if (index < userData.length) {
      const user = userData[index];
      return user.firstname;
    }
    return null;
  };

  const getUserLastname = (rowIndex, colIndex) => {
    const index = rowIndex * colCount + colIndex;
    if (index < userData.length) {
      const user = userData[index];
      return user.lastname;
    }
    return null;
  };

  const getUserID = (rowIndex, colIndex) => {
    const index = rowIndex * colCount + colIndex;
    if (index < userData.length) {
      const user = userData[index];
      return user.userID;
    }
    return null;
  };

  const getReservedAnon = (rowIndex, colIndex) => {
    const index = rowIndex * colCount + colIndex;
    if (index < userData.length) {
      const user = userData[index];
      return user.reservedAnon;
    }
    return null;
  };
  
  // Function to generate buttons for a row
  const generateRowButtons = (row) => {
    return cols.map((col) => {
      const value = `${row}${String(col).padStart(2, '0')}`;
      const title = generateTitle(row, col);
      if (isBooked(row, col)) {
        const userFirstname = getUserFirstname(rows.indexOf(row), col - 1);
        const userLastname = getUserLastname(rows.indexOf(row), col - 1);
        const userID = getUserID(rows.indexOf(row), col - 1);
        const reservedAnon = getReservedAnon(rows.indexOf(row), col - 1);
        if (reservedAnon) {
          return (
            <td key={col}>
              <button className="booked" title="This was reserved anonymously" disabled></button>
            </td>
          );
        } else {
          return (
            <td key={col}>
              <Link to={`/profile/${userFirstname}-${userLastname}+${userID}`} title={`Booked by ${userFirstname} ${userLastname}`} >
                <button className="booked" style={{ cursor: 'pointer' }}></button>
              </Link>
            </td>
          );
        }
      } else if (isEmpty(row, col)) {
        return (
          <td key={col}>
            <button className="blank" disabled></button>
          </td>
        );
      } else {
        return (
          <td key={col}>
            <button className="btn" value={value} title={title} onClick={handleCellClick}></button>
          </td>
        );
      }
    });
  };

  // Generate the table rows
  const tableRows = rows.map((row) => (
    <tr key={row}>
      {generateRowButtons(row)}
    </tr>
  ));

  // Return the generated table
  return (
    <table>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
}

export default generateTable;
