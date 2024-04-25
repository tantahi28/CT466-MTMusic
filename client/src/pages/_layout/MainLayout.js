import Header from "../../components/Common/Header";
import SiderBar from "../../components/Common/Sider";
import Player from "../../components/UI/Player"
import SongList from "../../components/UI/SongList";
import SiderRight from "../../components/Common/SiderRight"

import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="container-fluid p-0">
            <div className="wrapper no-gutters row">
                <div className="col-lg-2 col-md-3 bg-secondary d-none d-md-block vh-100">
                    <SiderBar/>
                </div>
                <div className=" position-relative col-lg-10 col-md-9 overflow-scroll p-0 vh-100 ">
                    <Header/>
                    <div className="container row p-3">
                        <div className="col-8 m-0">
                            <Outlet/>
                        </div>
                        <div className="col-4 m-0">
                            <SiderRight></SiderRight>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Player/> */}
        </div>
    );
}
