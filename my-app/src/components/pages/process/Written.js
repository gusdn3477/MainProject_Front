import React, {useState} from 'react';
import Banner from '../../elements/ui/Banner';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import TopProducts from '../../elements/widgets/Home/TopProducts';
import ToDoList from '../../elements/widgets/Home/ToDoList';
import OrderDetails from '../../elements/widgets/Home/OrderDetails';
import Projects from '../../elements/widgets/Home/Projects';
import Charts from '../../elements/widgets/Home/Notifications';
import Notifications from '../../elements/widgets/Home/Charts';
import AdvancedTable from '../../elements/widgets/Home/AdvancedTable';
import WrittenTable from '../../elements/widgets/Home/WrittenTable';

export default function Written() {

  const [data, setData] = useState({
    title: "공고 리스트",
    name: "공고명",
    companyName: "회사명",
    period: "공고 기간",
    status: "공고 현황"
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
                <WrittenTable/>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>

  );
}