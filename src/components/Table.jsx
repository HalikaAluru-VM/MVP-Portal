import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="w-full rounded-lg shadow-lg border border-gray-700">
      <table className="w-full table-auto border-collapse">
        {/* Table Head */}
        <thead className="bg-gray-800">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-[10px] md:text-xs lg:text-sm font-semibold tracking-wide text-gray-300 uppercase border-b border-gray-700 text-left"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-700">
          {data.map((row, i) => (
            <tr
              key={i}
              className={`transition-colors duration-200 ${
                i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              } hover:bg-gray-700`}
            >
              {columns.map((col) => {
                const value = row[col.key];

                let cellContent = value;


                if (col.key === "mode") {
                  cellContent = (
                    <span className="px-2 py-0.5 text-[10px] md:text-xs font-medium rounded-full text-gray-300 break-words">
                      {value}
                    </span>
                  );
                }
                if (col.key === "ecCoach") {
                  cellContent = (
                    <span className=" break-words">
                      {value}
                    </span>
                  );
                }
                if (col.key === "sessionName") {
                  cellContent = (
                    <span className=" text-gray-300 break-words">
                      {value}
                    </span>
                  );
                }
                if (col.key === "date") {
                  cellContent = (
                    <span className="text-gray-300 break-words">{value}</span>
                  );
                }

                return (
                  <td
                    key={col.key}
                    className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-[10px] md:text-sm text-gray-300 text-left align-top break-words max-w-[120px] sm:max-w-[180px] md:max-w-[240px]"
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
