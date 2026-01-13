// Create a new file: TableOfContents.tsx
import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  markdownContent: string;
}

// Helper function to slugify text the same way rehypeSlug does
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ markdownContent }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headers from markdown
    const headerRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headerRegex.exec(markdownContent)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = generateSlug(text);
      items.push({ id, text, level });
    }

    setTocItems(items);
  }, [markdownContent]);

  useEffect(() => {
    // Track which section is currently visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="w-64 h-[80vh] overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sticky mr-5 top-17 self-start bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
      <nav>
        <ul className="space-y-2">
          {tocItems.map(({ id, text, level }) => (
            <li key={id} style={{ paddingLeft: `${(level - 1) * 12}px` }}>
              <button
                onClick={() => scrollToSection(id)}
                className={`text-left w-full text-sm hover:text-blue-400 transition-colors ${
                  activeId === id ? "text-blue-400 font-medium" : "text-gray-400"
                }`}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};