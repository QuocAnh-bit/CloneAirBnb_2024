import ChevronIcon from "@/app/components/icons/ChevronIcon";
import { Pagination, PaginationItemType } from "@nextui-org/react";

export default function Paginate({
  total,
  page,
  filter,
  setFilter,
  setProperties,
  count,
}) {
  return (
    <div
      onClick={() => {
        setFilter({ ...filter, page: page + 1 });
      }}
      className="mx-auto w-full flex justify-center"
    >
      <button className="bg-black/5 hover:bg-black/10 py-2 px-4 rounded-full font-medium">
        Show {count} more
      </button>
    </div>
  );
}
