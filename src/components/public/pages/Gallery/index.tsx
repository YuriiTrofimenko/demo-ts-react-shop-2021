import Navbar from '../PartsGallery/GalleryNavbar'
import MainContent from '../PartsGallery/GalleryMainContent'
import Footer from '../PartsGallery/GalleryFooter'
import BackOnTop from '../../common/BackOnTop'
import SubscriptionModal from '../../common/Modal'
import Header from '../../base/Header'

const Gallery: React.FC = () => (
    <BackOnTop>
        <SubscriptionModal/>
        <Header/>
        <main>
            <div className="container">
                <Navbar/>
                <MainContent/>
                <Footer/>
            </div>
        </main>
    </BackOnTop>
)

export default Gallery
