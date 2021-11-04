import Main from './components/public/pages/Main'
import Gallery from './components/public/pages/Gallery'
import News from './components/public/pages/News'
import Profile from './components/public/pages/Profile'

const routes = [
    { path: '/', name: 'Main', Component: Main },
    { path: '/gallery', name: 'Gallery', Component: Gallery },
    { path: '/news', name: 'News', Component: News },
    { path: '/profile', name: 'Profile', Component: Profile },
]

export default routes
