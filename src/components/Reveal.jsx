import { useInViewAnimation } from "./useInViewAnimaton";

function Reveal({ children, className = "" }) {
  const [ref, isVisible] = useInViewAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform 
        ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"}
        ${className}`}
    >
      {children}
    </div>
  );
}

export default Reveal;
