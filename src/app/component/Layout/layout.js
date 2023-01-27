import Footer from "../../shared/Footer";
import Navbar from "../../shared/Navbar";
import Sidebar from "../../shared/Sidebar";

const Layout = ({children}) => {
    return(
        <>
        <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
        <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div>
              {children}
              </div>
            
            {/* <SettingsPanel /> */}
              </div>
            <Footer />
          </div>
        </div>
      </div>
        </>
    )
}

export default Layout;