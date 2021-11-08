import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useEffect, useRef, useState} from 'react'

interface IProps {
    children: React.ReactNode
}

const BackOnTop: React.FC<IProps> = props => {
    const [visibilityStyle, setVisibilityStyle] = useState('')
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    const anchorRef = useRef<HTMLDivElement>(null)
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setVisibilityStyle('to-top__show')
        } else if (window.scrollY < 100) {
            setVisibilityStyle('')
        }
    }
    const handleClick = () => {
        anchorRef.current?.scrollIntoView({
            behavior: "smooth"
        })
    }
    return (
        <>
            <div id = "back-on-top" ref={anchorRef}/>
            {props.children}
            <div onClick={handleClick}>
                <div className={['to-top', visibilityStyle].join(' ')}>
                    <FontAwesomeIcon icon={['fas', 'chevron-up']}/>
                </div>
            </div>
        </>
    )
}

export default BackOnTop
