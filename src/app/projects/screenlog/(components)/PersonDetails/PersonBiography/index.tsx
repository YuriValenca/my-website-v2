import { useEffect, useRef, useState } from "react";
import { BiographyText, BiographyWrapper, ReadMoreButton } from "./style";

interface PersonBiographyProps {
  biography: string;
}

const PersonBiography = ({ biography }: PersonBiographyProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const text = textRef.current;
    if (!text || isExpanded) return;

    const observer = new ResizeObserver(() => setIsTruncated(text.scrollHeight > text.clientHeight));
    observer.observe(text);
    return () => observer.disconnect();
  }, [isExpanded]);

  return (
    <BiographyWrapper>
      <BiographyText ref={textRef} isExpanded={isExpanded}>{biography}</BiographyText>
      {isTruncated &&
        <ReadMoreButton type="button" aria-expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show less" : "Read more"}
        </ReadMoreButton>
      }
    </BiographyWrapper>
  );
};

export default PersonBiography;
