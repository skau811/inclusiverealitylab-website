import CollapsiblePubContainer from "../components/CollapsiblePubContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import publications from "../sampleData/publications";
import PublicationsContainer from "../components/PublicationsContainer";
import loading from "../assets/icons/loading.svg";
import { useState, useRef, useEffect, useMemo,useCallback } from "react";

function PublicationsPage() {
  const [loadedPublications, setLoadedPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sort all publications chronologically (newest first)
  const sortedPublications = [...publications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Group loaded publications by year
  const yearlyPublications = useMemo(() => {
    const uniqueYears = [...new Set(loadedPublications.map((pub) => pub.year))];
    const yearsSorted = [...uniqueYears].sort((a, b) => b - a);

    return yearsSorted.map((year) => {
      const items = loadedPublications.filter((pub) => pub.year === year);
      return { year, items };
    });
  }, [loadedPublications]);

  useEffect(() => {
    const initialLoad = sortedPublications.slice(0, 20);
    setLoadedPublications(initialLoad);
  }, []);

  

  
  const loadMoreRef = useRef(null);

  const loadMorePublications = useCallback(() => {
    if (isLoading || loadedPublications.length >= sortedPublications.length)
      return;

    setIsLoading(true);

    // Simulate loading delay (remove in production)
    setTimeout(() => {
      const currentCount = loadedPublications.length;
      const nextBatch = sortedPublications.slice(
        currentCount,
        currentCount + 20
      );
      setLoadedPublications((prev) => [...prev, ...nextBatch]);
      setIsLoading(false);
    }, 500);
  }, [loadedPublications.length, sortedPublications.length, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePublications();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadMorePublications]);

  const yearsOpen = useMemo(() => {
    return yearlyPublications.map(({ year }) => year);
  }, [yearlyPublications]);

  // Add the load more trigger at the bottom
  return (
    <>
      <PublicationSectionWrapper headingContent="Publications">
        {yearlyPublications.map(({ year, items }) => (
          <CollapsiblePubContainer
            key={year}
            data={{ year, items }}
            isExpandedContainer={yearsOpen.includes(year)}
            // Remove the ref since we're not watching these anymore
          >
            <PublicationsContainer publications={items} year={year} />
          </CollapsiblePubContainer>
        ))}

        {/* Load more trigger */}
        {loadedPublications.length < sortedPublications.length && (
          <div
            ref={loadMoreRef}
            className="h-20 flex items-center justify-center"
          >
            {isLoading ? <div><img src={loading}/></div> : <div>Load More</div>}
          </div>
        )}
      </PublicationSectionWrapper>
    </>
  );
}

export default PublicationsPage;
