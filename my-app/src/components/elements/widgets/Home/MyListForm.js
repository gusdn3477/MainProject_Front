import { useState, useEffect } from "react";

export default function MyListForm({key, data, setMylist}) {

  const [myList, setMyList] = useState([]);

  return (
    <tr>
      <td>{data.jobsNo}</td>
      <td className="font-weight-bold">{data.corpNo}</td>
      <td>{data.jobsTitle}</td>
      <td>{data.createdAt}</td>
      <td>{data.employType}</td>
      <td>{data.jobLocation}</td>
      <td>{data.applyDatetime}</td>
      {/* <td className="font-weight-medium"><div className="badge badge-success">Completed</div></td>
      <td className="font-weight-medium"><div className="badge badge-success">Completed</div></td>
      <td className="font-weight-medium"><div className="badge badge-success">Completed</div></td>
      <td className="font-weight-medium"><div className="badge badge-success">Completed</div></td> */}
    </tr>
  );
}