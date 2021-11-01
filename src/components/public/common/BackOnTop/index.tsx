interface IProps {
    children: React.ReactNode
}

const BackOnTop: React.FC<IProps> = props =>
    <>
        <div id="back-on-top"></div>
        {props.children}
        <a href="#back-on-top">
            <div className="to-top">
                <i className="fas fa-chevron-up"></i>
            </div>
        </a>
    </>

export default BackOnTop
