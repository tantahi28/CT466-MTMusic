import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import Sider from "../../components/Common/Sider";
import Player from "../../components/UI/Player"
import SongList from "../../components/UI/SongList";

export default function AdminLayout() {
    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-lg-2 col-md-3 bg-secondary d-none d-md-block vh-100">
                    <Sider/>
                </div>
                <div className=" position-relative col-lg-10 col-md-9 overflow-scroll vh-100 p-0">
                    <Header/>
                    <SongList/>
                    <Footer/>
                </div>
            </div>
            <Player/>
        </div>
    );
}
