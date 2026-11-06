import { CalendarRange } from "lucide-react";
import { RANGE_PRESETS, type RangePreset } from "../utils/dates";
import { SelectInput, TextInput } from "./FormControls";

interface RangePickerProps {
  preset: RangePreset;
  from?: string;
  to?: string;
  onChange: (next: { preset: RangePreset; from?: string; to?: string }) => void;
}

/**
 * Date range selector shared by the overview, invoices, expenses and reports
 * pages so every screen reports on exactly the same window.
 */
const RangePicker = ({ preset, from, to, onChange }: RangePickerProps) => {
  const handlePresetChange = (nextPreset: RangePreset) => {
    if (nextPreset === "custom") {
      onChange({ preset: "custom", from, to });
      return;
    }
    onChange({ preset: nextPreset });
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-sm">
        <CalendarRange className="w-4 h-4 text-yellow-500" />
        <SelectInput
          aria-label="Select reporting period"
          value={preset}
          onChange={(event) => handlePresetChange(event.target.value as RangePreset)}
          className="!w-auto !py-1.5 !px-3 !bg-transparent !border-none !text-[10px] !font-black !uppercase !tracking-widest focus:!ring-0"
        >
          {RANGE_PRESETS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </div>

      {(preset === "custom" || from || to) && (
        <div className="flex items-center gap-2">
          <TextInput
            type="date"
            aria-label="From date"
            value={from || ""}
            onChange={(event) => onChange({ preset: "custom", from: event.target.value, to })}
            className="!w-auto !py-2.5 text-[11px] font-bold"
          />
          <span className="text-gray-300 text-xs font-black">TO</span>
          <TextInput
            type="date"
            aria-label="To date"
            value={to || ""}
            onChange={(event) => onChange({ preset: "custom", from, to: event.target.value })}
            className="!w-auto !py-2.5 text-[11px] font-bold"
          />
        </div>
      )}
    </div>
  );
};

export default RangePicker;
