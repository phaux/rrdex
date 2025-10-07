interface TodoFiltersProps {
  sortBy: string;
  filterDone: string | null;
  onSortChange: (sort: string) => void;
  onFilterChange: (filter: string) => void;
}

export function TodoFilters({
  sortBy,
  filterDone,
  onSortChange,
  onFilterChange,
}: TodoFiltersProps) {
  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <FilterGroup title="Sort">
        <FilterButton
          label="Date"
          isActive={sortBy === "date"}
          onClick={() => onSortChange("date")}
        />
        <FilterButton
          label="Title"
          isActive={sortBy === "title"}
          onClick={() => onSortChange("title")}
        />
      </FilterGroup>

      <FilterGroup title="Filter">
        <FilterButton
          label="All"
          isActive={!filterDone}
          onClick={() => onFilterChange("all")}
        />
        <FilterButton
          label="Active"
          isActive={filterDone === "active"}
          onClick={() => onFilterChange("active")}
        />
        <FilterButton
          label="Done"
          isActive={filterDone === "done"}
          onClick={() => onFilterChange("done")}
        />
      </FilterGroup>
    </div>
  );
}

const FilterButton = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded text-sm transition-colors ${
      isActive ? "bg-blue-600 text-white" : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    {label}
  </button>
);

const FilterGroup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex gap-2 flex-wrap">
    <span className="text-sm text-zinc-400 self-center">{title}:</span>
    {children}
  </div>
);
