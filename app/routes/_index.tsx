import "@reach/combobox/styles.css";
import { Form } from "@remix-run/react";
import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

export default function Index() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center p-4 sm:px-0">
      <h2 className="mb-4 text-2xl">Add something</h2>
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Multi Select: </span>
            <CustomCombobox />
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 self-end rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Add
        </button>
      </Form>
    </div>
  );
}

const CustomCombobox = () => {
  const fetcher = {
    data: [
      { id: "1", name: "alpha" },
      { id: "2", name: "bravo" },
      { id: "3", name: "charlie" },
    ],
  };

  const [selected, setSelected] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleChange = (event: any) => {
    setInput(event.target.value);
  };

  const handleSelect = (value: string) => {
    setInput("");
    setSelected([...selected, value]);
  };

  // maybe proceed with out deleting interests?
  const deleteInterest = (interest: string) => {
    const filtered = selected.filter((item) => item !== interest);
    setSelected(filtered);
  };

  return (
    <div>
      <div className="mb-2 flex gap-2">
        {selected.map((item) => (
          <button
            type="button"
            className="rounded bg-blue-200 p-2"
            onClick={() => deleteInterest(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <Combobox aria-label="Items" onSelect={handleSelect}>
        <div>
          <ComboboxInput
            value={input}
            onChange={handleChange}
            className="w-full rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </div>

        {fetcher.data ? (
          <ComboboxPopover className="shadow-popup">
            {/* @ts-ignore */}
            {fetcher.data.error ? (
              <p>Failed to load items :(</p>
            ) : fetcher.data.length ? (
              <ComboboxList>
                {fetcher.data.map((item) => (
                  <ComboboxOption key={item.id} value={item.name} />
                ))}
              </ComboboxList>
            ) : (
              <ComboboxOption value={`Add ${input}`} />
            )}
          </ComboboxPopover>
        ) : null}
      </Combobox>
    </div>
  );
};
