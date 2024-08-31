interface params {
    stroke: string;
    className: string;
    onClick: () => void;
}

const EditIcon: React.FC<params> = ({ stroke, className, onClick}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" className={className} onClick={onClick}>
    <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1l1-4l9.5-9.5z"></path>
    </g>
  </svg>
);

export default EditIcon;
