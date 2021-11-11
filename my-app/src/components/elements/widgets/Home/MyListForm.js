import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MyListForm({ idx, key, data }) {
  const [written, setWritten] = useState([]);
  const [interview, setInterview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyInfo, setApplyInfo] = useState([]);

  useEffect(() => {
    fetch(
      `/process-service/process/written/${data.jobsNo}/${localStorage.getItem("userId")}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWritten(data);
        return data;
      })
      .then(
        res => {
          fetch(`/process-service/process/interview/${data.jobsNo}/${localStorage.getItem("userId")}`)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setInterview(data);
              console.log('data', interview);
              return data;
            })
        }
        ).then(res => {
          // 지원내역 가져오는 부분
          fetch(`/user-service/users/apply/${localStorage.getItem("userId")}/${data.jobsNo}`)
          .then((res) => {
            return res.json();
          })
          .then(res => {
            setApplyInfo(res);
            setLoading(false);
          });
        });
  }, [interview]);  

  // 이걸로 결과 얻기
  if (loading)
    return (
      <div className="spinner-border text-primary" role="status">
        잠시만 기다려 주세요
      </div>
    );

  return (
    <tr>
      <td>{idx}</td>
      <td>
        <Link to={`/jobs/${data.jobsNo}`}>{data.jobsTitle}</Link>
      </td>
      <td className="font-weight-bold">{data.corpName}</td>
      <td>{data.employType}</td>

      {/* <td>{data.createdAt}</td> */}

      <td>{data.jobLocation}</td>
      <td>
        {/* <MyApplyListForm data2={data} /> */}
        <div>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#exampleModal` + idx}
          >
            내 지원서 보기
          </button>
        </div>
        <div
          className="modal fade"
          id={`exampleModal` + idx}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  내 지원서
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" value={data}>
                <h3>최종 지원이 완료되었습니다.</h3>
                <br></br> 이름 : {applyInfo.applyName} <br></br>
                <br></br> 이메일 : {applyInfo.applyEmail} <br></br>
                <br></br> 전화번호 : {applyInfo.applyContact} <br></br>
                <br></br> 지원날짜 : {(applyInfo.applyDateTime).substring(0, 10)} <br></br>
                {/* <br></br> data.jobsNo : {data.jobsNo} <br></br> */}
                <br></br> 지원번호 : {applyInfo.jobsNo} <br></br>
              </div>
              {/* <div>{applyList}</div> */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal">
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>
        {written.writtenResult ? (
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModalTwo`+idx}>
            확인하기
          </button>
        ) : (
          "미정"
        )}
      </td>

      {/* 잠시 대기 */}
      <div
        className="modal fade"
        id={`exampleModalTwo`+idx}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                지원 결과
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {written?.writtenResult === 'P' ? "1차 합격" : "대기"}
              {interview?.secondInterviewResult}
              
              </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </tr>
  );
}
