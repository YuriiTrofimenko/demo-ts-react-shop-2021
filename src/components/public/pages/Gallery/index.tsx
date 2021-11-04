import Navbar from '../PartsGallery/GalleryNavbar'
import MainContent from '../PartsGallery/GalleryMainContent'
import Footer from '../PartsGallery/GalleryFooter'

const Gallery: React.FC = () => (
    <main>
        <div className="container">
            <Navbar/>
            <MainContent/>
            <Footer/>
        </div>
    </main>
)

export default Gallery
