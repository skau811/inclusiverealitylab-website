import CollapsiblePubContainer from "../components/CollapsiblePubContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import publications from "../sampleData/publications";
import PublicationsContainer from "../components/PublicationsContainer";
import { useState, useRef, useEffect } from "react";

function PublicationsPage() {
  const uniqueYears = [...new Set(publications.map((pub) => pub.year))];
  const yearsSorted = [...uniqueYears].sort((a, b) => b - a);

  const yearlyPublications = [...yearsSorted].map((year) => {
    const items = publications.filter((pub) => pub.year === year);
    return { year, items };
  });

  const [yearsOpen, setYearsOpen] = useState([yearsSorted[0]]);
  const containerRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updatedOpenYears = new Set([yearsSorted[0]]);
        entries.forEach((entry) => {
          const year = entry.target.getAttribute("data-year");
          if (!year) {
            return;
          }
          if (entry.isIntersecting) {
            updatedOpenYears.add(parseInt(year));
          }
        });

        const newOpen = Array.from(updatedOpenYears);
        setYearsOpen((prev) => {
          const same =
            prev.length === newOpen.length &&
            prev.every((v) => newOpen.includes(v));
          return same ? prev : newOpen;
        });
      },
      {
        threshold: 0.,
        rootMargin: "0px 0px -100px 0px",
      }
    );
    yearsSorted.forEach((year) => {
      const ref = containerRefs.current[year];
      if (ref) {
        observer.observe(ref);
      }
    });
    return () => {
      Object.values(containerRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [yearsSorted]);

  return (
    <>
      <PublicationSectionWrapper headingContent="Publications">
        {yearlyPublications.map(({ year, items }, index) => (
          <CollapsiblePubContainer
            key={year}
            data={{ year, items }}
            isExpandedContainer={yearsOpen.includes(year)} // this will soon be a calling a function to decide which gets opened or not
            ref={(el) => (containerRefs.current[year] = el)}
          >
            <PublicationsContainer publications={items} year={year} />
          </CollapsiblePubContainer>
        ))}
      </PublicationSectionWrapper>
    </>
  );
}

export default PublicationsPage;
