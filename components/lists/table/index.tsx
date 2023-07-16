export interface ITableHeader {
  title: string;
  key: string;
}

export interface ITableData {
  id: string;
  [key: string]: any;
}

export interface ITable {
  headers: ITableHeader[];
  data: ITableData[];
}

const Table = (props: ITable) => {
  const { headers, data } = props;

  return (
    <table className='min-w-full border border-[#E0E0E0]'>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key} scope='col' className='p-6 border border-[#E0E0E0] text-lg font-semibold'>
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className='hover:bg-[#F4F7FC]'>
            {headers.map((header) => (
              <td key={header.key} className='p-6 whitespace-nowrap border border-[#E0E0E0] text-center'>
                {row[header.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  headers: [],
  data: [],
};

export default Table;
