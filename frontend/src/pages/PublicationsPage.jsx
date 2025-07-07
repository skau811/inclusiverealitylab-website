import { useEffect, useState } from "react";
import CollapsiblePubContainer from "../components/CollapsiblePubContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import publications from "../sampleData/publications";
import PublicationsContainer from "../components/PublicationsContainer";

function PublicationsPage() {
  // take the code outside the return so we know which ones and can initialise the states correctly
  const uniqueYears = [...new Set(publications.map((pub) => pub.year))];

  const yearlyPublications = [...uniqueYears]
    .sort((a, b) => b - a)
    .map((year) => {
      const items = publications.filter((pub) => pub.year === year);
      return { year, items };
    });

  const allSortedYears = [...uniqueYears].sort((a, b) => b - a);

  console.log(allSortedYears);

  // const handleExpansion = (i) => {
  //   if (i === 0) {
  //     return true;
  //   }
  // };

  const maxVisible = 20;

  const [itemsCountByYear, setItemsCountByYear] = useState({});

  const handleRenderCountChange = ({ year, count }) => {
    setItemsCountByYear((prev) => ({
      ...prev,
      [year]: count,
    }));
  };

  const [openYears, setOpenYears] = useState([allSortedYears[0]]);

  useEffect(() => {
    const totalVisible = Object.values(itemsCountByYear).reduce(
      (sum, current) => sum + current,
      0
    );
    console.log(totalVisible);
    if (totalVisible < maxVisible) {
      const lastOpenYear = openYears[openYears.length - 1];
      const lastOpenYearIndex = allSortedYears.findIndex(
        (year) => year == lastOpenYear
      );
      const nextYearToOpen = allSortedYears[lastOpenYearIndex + 1];
      if (!openYears.includes(nextYearToOpen)) {
       
        setOpenYears((prev) => [...prev, nextYearToOpen]);
        console.log(`OPENING NEXT YEAR: ${nextYearToOpen}, pls be a booleam : ${openYears.includes(nextYearToOpen)} `);
      }
    }
  }, [itemsCountByYear]);

  return (
    <>
      <PublicationSectionWrapper headingContent="Publications">
        {yearlyPublications.map(({ year, items }, index) => (
          <CollapsiblePubContainer
            key={year}
            data={{ year, items }}
            isExpandedContainer={openYears.includes(year)} // this will soon be a calling a function to decide which gets opened or not
          >
            <PublicationsContainer
              publications={items}
              maxItems={maxVisible}
              year={year}
              onRenderCount={handleRenderCountChange}
            />
          </CollapsiblePubContainer>
        ))}
      </PublicationSectionWrapper>
    </>
  );
}

export default PublicationsPage;
