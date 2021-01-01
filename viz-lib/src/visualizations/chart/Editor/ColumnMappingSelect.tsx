import { isString, map, uniq, flatten, filter, sortBy, keys } from "lodash";
import React from "react";
import { Section, Select } from "@/components/visualizations/editor";

const MappingTypes = {
  x: { label: "X轴" },
  y: { label: "Y轴", multiple: true },
  series: { label: "分组" },
  yError: { label: "Y轴误差" },
  size: { label: "气泡尺寸(Bubble Size)" },
  zVal: { label: "颜色" },
};

const SwappedMappingTypes = {
  ...MappingTypes,
  x: { label: "Y轴" },
  y: { label: "X轴", multiple: true },
};

type OwnProps = {
    value?: string | string[];
    availableColumns?: string[];
    type?: any; // TODO: PropTypes.oneOf(keys(MappingTypes))
    onChange?: (...args: any[]) => any;
};

type Props = OwnProps & typeof ColumnMappingSelect.defaultProps;

export default function ColumnMappingSelect({ value, availableColumns, type, onChange, areAxesSwapped }: Props) {
  const options = sortBy(filter(uniq(flatten([availableColumns, value])), v => isString(v) && v !== ""));

  // this swaps the ui, as the data will be swapped on render
  const { label, multiple } = !areAxesSwapped ? MappingTypes[type] : SwappedMappingTypes[type];

  return (
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    <Section>
      <Select
        label={label}
        data-test={`Chart.ColumnMapping.${type}`}
        mode={multiple ? "multiple" : "default"}
        allowClear
        showSearch
        placeholder={multiple ? "请选择列(多选)..." : "请选择列..."}
        value={value || undefined}
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        onChange={(column: any) => onChange(column || null, type)}>
        {map(options, c => (
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
          <Select.Option key={c} value={c} data-test={`Chart.ColumnMapping.${type}.${c}`}>
            {c}
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
          </Select.Option>
        ))}
      </Select>
    </Section>
  );
}

ColumnMappingSelect.defaultProps = {
  value: null,
  availableColumns: [],
  type: null,
  onChange: () => {},
};

ColumnMappingSelect.MappingTypes = MappingTypes;
