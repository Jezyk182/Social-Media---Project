interface params {
    stroke: string;
    className: string;
    onClick: () => void;
}

const Heart: React.FC<params> = ({ stroke, className, onClick }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 14 14" className={ className } onClick={ onClick }>
        <path fill="none" stroke={ stroke } strokeLinecap="round" strokeLinejoin="round" d="M8.266 11.908a1.773 1.773 0 0 1-2.527 0L1.49 7.7c-2.84-2.842.87-9.12 5.511-4.478c4.634-4.633 8.344 1.644 5.511 4.478z"></path>
    </svg>
)

export default Heart