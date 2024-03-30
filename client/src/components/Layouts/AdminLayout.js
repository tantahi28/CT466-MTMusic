import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Sider from "../Common/Sider";
import Player from "../UI/Player"
import Home from "../../pages/Home";
import SongList from "../UI/SongList";

export default function MainLayout() {
    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-lg-2 col-md-3 bg-secondary d-none d-md-block vh-100">
                    <Sider/>
                </div>
                <div className=" position-relative col-lg-10 col-md-9 overflow-scroll vh-100 p-0">
                    <Header/>
                    <Home/>
                    <SongList/>
                    <Footer/>
                </div>
            </div>
            <Player/>
        </div>
    );
}
