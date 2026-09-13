export const Loader = ({ size = 24, className = "", style = {}, ...props }) => {
  return (
    <svg
      className={`animate-spin ${className}`}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      style={style}
      {...props}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#999"
        strokeWidth="5"
        opacity="0.2"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#555"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="90 150"
        strokeDashoffset="0"
      />
    </svg>
  );
};
