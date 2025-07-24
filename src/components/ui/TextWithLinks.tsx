import React from 'react';

interface TextWithLinksProps {
  text: string;
}

const TextWithLinks: React.FC<TextWithLinksProps> = ({ text }) => {
  const parseTextWithLinks = (input: string): React.ReactNode[] => {
    const linkRegex = /<a href="([^"]*)"[^>]*>([^<]*)<\/a>/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(input)) !== null) {
      if (match.index > lastIndex) {
        parts.push(input.slice(lastIndex, match.index));
      }
      
      parts.push(
        <a key={match.index} href={match[1]}>
          {match[2]}
        </a>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < input.length) {
      parts.push(input.slice(lastIndex));
    }
    
    return parts.length > 0 ? parts : [input];
  };

  return <>{parseTextWithLinks(text)}</>;
};

export default TextWithLinks;