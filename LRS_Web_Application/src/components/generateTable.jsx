/*
Author: John Paul Carney
*/
// chatgpt
function generateTable(titleString, handleCellClick) {
  // Define the rows and columns based on the desired structure
  const rows = ['A', 'B', 'C'];
  const cols = Array.from({ length: 23 }, (_, i) => i + 1);

  // Function to generate the title based on the input string
  const generateTitle = (row, col) => `${row}${String(col).padStart(2, '0')}${titleString}`;

  // Function to generate buttons for a row
  const generateRowButtons = (row) => {
    return cols.map((col) => {
      const value = `${row}${String(col).padStart(2, '0')}`;
      const title = generateTitle(row, col);
      if (col === 7 || col === 17) {
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