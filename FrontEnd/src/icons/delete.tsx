interface params {
    stroke: string;
    className: string;
    onClick: () => void;
}


const DeleteIcon: React.FC<params> = ({ stroke, className, onClick}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" className={className} onClick={onClick}>
        <path fill="none" stroke={ stroke } strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 5v6m4-6v6"></path>
    </svg>
)

export default DeleteIcon