import { map } from "lodash";
import React from "react";
import { Section, Select } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";

const CohortTimeIntervals = {
  daily: "每日",
  weekly: "每周",
  monthly: "每月",
};

const CohortModes = {
  diagonal: "空值用0代替",
  simple: "原样显示",
};

export default function OptionsSettings({ options, onOptionsChange }: any) {
  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          layout="horizontal"
          label="时间周期"
          data-test="Cohort.TimeInterval"
          value={options.timeInterval}
          onChange={(timeInterval: any) => onOptionsChange({ timeInterval })}>
          {map(CohortTimeIntervals, (name, value) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            <Select.Option key={value} data-test={"Cohort.TimeInterval." + value}>
              {name}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
            </Select.Option>
          ))}
        </Select>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          layout="horizontal"
          label="模式"
          data-test="Cohort.Mode"
          value={options.mode}
          onChange={(mode: any) => onOptionsChange({ mode })}>
          {map(CohortModes, (name, value) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            <Select.Option key={value} data-test={"Cohort.Mode." + value}>
              {name}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
            </Select.Option>
          ))}
        </Select>
      </Section>
    </React.Fragment>
  );
}

OptionsSettings.propTypes = EditorPropTypes;
