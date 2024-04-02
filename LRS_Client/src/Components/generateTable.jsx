function generateTable(titleString, handleCellClick, bookedCells = [], emptyCells = [], rowCount = 3, colCount = 23) {
  // Define the rows and columns based on the specified rowCount and colCount
  const rows = Array.from({ length: rowCount }, (_, i) => String.fromCharCode(65 + i)); // Generates rows from A to rowCount
  const cols = Array.from({ length: colCount }, (_, i) => i + 1); // Generates columns from 1 to colCount

  // Function to generate the title based on the input string
  const generateTitle = (row, col) => `${row}${String(col).padStart(2, '0')}`;

  // Function to check if a cell is booked
  const isBooked = (row, col) => bookedCells.includes(`${row}${String(col).padStart(2, '0')}`);

  // Function to check if a cell is empty
  const isEmpty = (row, col) => emptyCells.includes(`${row}${String(col).padStart(2, '0')}`);

  // Function to generate buttons for a row
  const generateRowButtons = (row) => {
    return cols.map((col) => {
      const value = `${row}${String(col).padStart(2, '0')}`;
      const title = generateTitle(row, col);
      if (isBooked(row, col)) {
        return (
          <td key={col}>
            <button className="booked" title="View who booked this seat.."></button>
          </td>
        );
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