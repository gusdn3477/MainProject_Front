import React, {useState} from 'react';
import Banner from '../../elements/ui/Banner';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import ToDoList from '../../elements/widgets/Home/ToDoList';
import OrderDetails from '../../elements/widgets/Home/OrderDetails';
import Projects from '../../elements/widgets/Home/Projects';
import Charts from '../../elements/widgets/Home/Notifications';
import Notifications from '../../elements/widgets/Home/Charts';
import AdvancedTable from '../../elements/widgets/Home/AdvancedTable';
import IntervieweeForm from '../../elements/widgets/Form/IntervieweeListForm';
// import HRListForm from './IntervieweeListForm';

export default function IntervieweeList() {

  const [data, setData] = useState({
    title: "면접자 리스트",
    name: "이름",
    companyName: "필기 점수",
    period: "면접 날짜",
    status: "상태(합격, 불합격)"
  });

  return (
    <div id="wrap">
      <Header />
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          {/* Banner는 왼쪽에 있는 리스트 형식의 메뉴 */}
          <Banner />
          {/* 여기부터 프사 누르면 나오는 메뉴 */}
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <IntervieweeForm data={data}/>
                {/* <ToDoList/> */}
              </div>
              <div className="row">
                {/* <Projects/> */}
                {/* <Charts/> */}
                {/* <Notifications/> */}
              </div>
              <div className="row">
                {/* <AdvancedTable/> */}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>

  );
}