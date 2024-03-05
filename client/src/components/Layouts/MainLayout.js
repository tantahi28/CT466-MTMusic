import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Sider from "../Common/Sider";
import Player from "../UI/Player"
import Home from "../../pages/Home";
export default function MainLayout() {
    return (
        <div className="row">
            <div className="col-lg-2 bg-secondary fixed-top vh-100">
                <Sider/>
            </div>
            <div className="col-lg-2"></div> 
            <div className="col-lg-10 p-0">
                <Header/>
                <Home/>
                <Footer/>
            </div>
            <Player/>
        </div>
    );
}
