import { useCallback, useMemo, useState } from "react";
import { dishes ,headers,IDish} from '../dishes';
import Dropdown from "../ui/DropDown";
import SearchBox from "../ui/SearchBox";

const PAGE_SIZE = 20;

const DishesList = () => {
  const [page, setPage] = useState(1);
  const [sortCol, setSortCol] = useState('name' as keyof IDish);
  const [sortDesc, setSortDesc] = useState(false);
  const [diet, setDiet] = useState('');
  const [flavor, setFlavor] = useState('');
  const [state, setState] = useState('');
  const [search, setSearch] = useState('');

  const dietOptions = [ '', 'vegetarian', 'non vegetarian' ];
  const flavorOptions = [ '', ...Array.from(new Set(dishes.map(d => d.flavor_profile))) ];
  const stateOptions = [ '', ...Array.from(new Set(dishes.map(d => d.state))) ];

  const filtered = useMemo(() => {
    return dishes.filter(d =>
      (!diet || d.diet === diet) &&
      (!flavor || d.flavor_profile === flavor) &&
      (!state || d.state === state) &&
      (search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.ingredients.toLowerCase().includes(search.toLowerCase()))
    );
  }, [diet, flavor, state, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a[sortCol] < b[sortCol]) return sortDesc ? 1 : -1;
      if (a[sortCol] > b[sortCol]) return sortDesc ? -1 : 1;
      return 0;
    });
  }, [filtered, sortCol, sortDesc]);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  const handleSort = useCallback((col: keyof IDish) => {
    if (col === sortCol) {
      setSortDesc(!sortDesc);
    } else {
      setSortCol(col);
      setSortDesc(false);
    }
  }, [sortCol, sortDesc]);

  return (
    <div className="p-6 h-full flex flex-col w-full">
      <h3 className="text-2xl font-bold mb-4 inline">Dishes List 


      (<a href="/suggest" className="underline text-blue">Dish Suggester</a>)

      </h3>
      <div className="flex flex-wrap gap-4 mb-4">
          <Dropdown options={dietOptions} value={diet} setValue={setDiet} label="Diet"/>
          <Dropdown options={flavorOptions} value={flavor} setValue={setFlavor} label="Flavor"/>
          <Dropdown options={stateOptions} value={state} setValue={setState} label="State"/>
        <div>
          <SearchBox value={search} setValue={setSearch} label="Search"/>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
             { headers.map(col => (
                <th
                  key={col.key}
                  className="p-2 cursor-pointer text-left"
                  onClick={() => handleSort(col.key)}
                >
                  {col.name} {sortCol === col.key && (sortDesc ? '▼' : '▲')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map(dish => (
              <tr key={dish.id} className="border-t hover:bg-gray-50">
                <td className="p-2 text-blue-600 underline cursor-pointer"><a href={`/dish/${dish.id}`}>{dish.name}</a></td>
                <td className="p-2">{dish.diet}</td>
                <td className="p-2">{dish.course}</td>
                <td className="p-2">{dish.cook_time}</td>
                <td className="p-2">{dish.flavor_profile}</td>
                <td className="p-2">{dish.state}</td>
                <td className="p-2">{dish.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(sorted.length / PAGE_SIZE) }, (_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded ${page === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DishesList;
