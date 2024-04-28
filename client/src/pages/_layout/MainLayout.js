import { SongProvider } from '../../provider/SongProvider';
import Header from "../../components/Common/Header";
import SiderBar from "../../components/Common/Sider";
import SiderRight from "../../components/Common/SiderRight"

import { Outlet } from "react-router-dom";


export default function MainLayout() {

    return (
        <SongProvider>
            <div className="container-fluid p-0" style={{backgroundColor: 'var(--layout-bg)'}}>
                <div className="wrapper no-gutters row">
                    <div className="col-lg-2 col-md-3 d-none d-md-block vh-100" style={{backgroundColor: 'var(--sidebar-bg)'}}>
                        <SiderBar/>
                    </div>
                    <div className=" position-relative col-lg-10 col-md-9 overflow-scroll p-0 vh-100 ">
                        <Header/>
                        <div className="container row">
                            <div className="col-8">
                               <div className='m-3'> <Outlet/></div>
                            </div>
                            <div className="col-4 m-0">
                                <SiderRight></SiderRight>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Player/> */}
            </div>
        </SongProvider>
    );
}
