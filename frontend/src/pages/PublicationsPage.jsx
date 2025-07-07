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
  let totalVisible;

  useEffect(() => {
    totalVisible = Object.values(itemsCountByYear).reduce(
      (sum, current) => sum + current,
      0
    );
    console.log(totalVisible);

    let lastOpenYear = openYears[openYears.length - 1];
    let lastOpenYearIndex = allSortedYears.findIndex(
      (year) => year == lastOpenYear
    );
    let updatedOpenYears = [...openYears];

    while (
      totalVisible < maxVisible &&
      lastOpenYearIndex + 1 < allSortedYears.length
    ) {
      let nextYearToOpen = allSortedYears[lastOpenYearIndex + 1];
      const nextCount = itemsCountByYear[nextYearToOpen];

      if (nextCount === undefined) {
        // Don't open this one yet — wait for its container to mount
        if (!updatedOpenYears.includes(nextYearToOpen)) {
          updatedOpenYears.push(nextYearToOpen);
        }
        break;
        break;
      }
      if (!updatedOpenYears.includes(nextYearToOpen)) {
        updatedOpenYears.push(nextYearToOpen);

        // setOpenYears((prev) => [...prev, nextYearToOpen]);
        // console.log(
        //   `OPENING NEXT YEAR: ${nextYearToOpen}, pls be a booleam : ${openYears.includes(
        //     nextYearToOpen
        //   )} `
        // );
      }
      lastOpenYearIndex += 1;
      totalVisible += itemsCountByYear[nextYearToOpen];
    }

    // Only update if there was any meaningful change
    if (
      updatedOpenYears.length !== openYears.length ||
      !updatedOpenYears.every((year, i) => year === openYears[i])
    ) {
      setOpenYears(updatedOpenYears);
    }
  }, [itemsCountByYear]);

  return (
    <>
      <PublicationSectionWrapper headingContent="Publications">
        <h3 className="heading3">Total rendered:{totalVisible} </h3>
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
