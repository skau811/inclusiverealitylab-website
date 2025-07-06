import { useState } from "react";
import CollapsiblePubContainer from "../components/CollapsiblePubContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import publications from "../sampleData/publications";

function PublicationsPage() {
  // take the code outside the return so we know which ones and can initialise the states correctly
  const yearlyPublications = [...new Set(publications.map((pub) => pub.year))]
    .sort((a, b) => b - a)
    .map((year) => {
      const items = publications.filter((pub) => pub.year === year);
      return { year, items };
    });

  const handleExpansion = (i) => {
    if(i===0){
      return true;
    }
  }

  return (
    <>
      <PublicationSectionWrapper headingContent="Publications">
        {yearlyPublications.map(({ year, items }, index) => (
          <CollapsiblePubContainer
            key={year}
            data={{ year, items }}
            isExpandedContainer={handleExpansion(index)} // this will soon be a calling a function to decide which gets opened or not
          />
        ))}
      </PublicationSectionWrapper>
    </>
  );
}

export default PublicationsPage;
