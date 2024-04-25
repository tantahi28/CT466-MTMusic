import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import Sider from "../../components/Common/Sider";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="container-fluid p-0">
            <div className="row p-0">
                <div className="col-lg-2 col-md-3 bg-secondary d-none d-md-block vh-100">
                    <Sider/>
                </div>
                <div className=" position-relative col-lg-10 col-md-9 overflow-scroll p-0 vh-100 ">
                    <Header/>
                    <div className="container p-3">
                        <Outlet/>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}
