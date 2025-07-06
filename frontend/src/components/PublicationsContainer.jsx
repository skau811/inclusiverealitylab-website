import PublicationListItem from "./PublicationListItem";
import { useEffect } from "react";

function PublicationsContainer({ publications,maxItems }) {
  const visibleItems = publications.slice(0,maxItems);
  useEffect(() => {});

  return (
    <>
      <div className="xl:flex xl:flex-col xl:items-start xl:gap-2 grid gap-x-1.5 gap-y-2.5 w-full grid-cols-[repeat(auto-fit,minmax(272px,1fr))] ">
        {visibleItems &&
          visibleItems.map((pub) => (
            <PublicationListItem key={pub.id} publication={pub} />
          ))}
      </div>
    </>
  );
}

export default PublicationsContainer;
