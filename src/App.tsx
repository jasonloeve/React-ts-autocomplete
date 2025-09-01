import './App.css';
import {Autocomplete} from "./components/Autocomplete";
import {languages} from "./data/languages";

type Language = {name: string};

export function App() {
  // example simulate async fetch
  const fetchLanguages = async (query: string): Promise<Language[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = languages
          .filter((lang) => lang.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5) // @NOTE - Currently limit to 5 results, depending on usage don't limit
          .map((name) => ({ name }));

        // console.log(results) dev log results in console
        resolve(results);
      }, 500); // simulate 500ms network delay
    });
  };

  return (
    <>
      <Autocomplete<Language>
        label="Autocomplete"
        value={null}
        onChange={(val) => console.log("Selected:", val)}
        fetchOptions={fetchLanguages}
        getOptionLabel={(o) => o.name}
        placeholder="Type to search..."
      />
    </>
  );
}
