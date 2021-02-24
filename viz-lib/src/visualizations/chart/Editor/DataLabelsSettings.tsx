import { includes } from "lodash";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, Checkbox, ContextHelp } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";

export default function DataLabelsSettings({
  options,
  onOptionsChange
}: any) {
  const isShowDataLabelsAvailable = includes(
    ["line", "area", "column", "scatter", "pie", "heatmap"],
    options.globalSeriesType
  );

  const [debouncedOnOptionsChange] = useDebouncedCallback(onOptionsChange, 200);

  return (
    <React.Fragment>
      {isShowDataLabelsAvailable && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        <Section>
          <Checkbox
            data-test="Chart.DataLabels.ShowDataLabels"
            defaultChecked={options.showDataLabels}
            onChange={event => onOptionsChange({ showDataLabels: event.target.checked })}>
            显示标注
          </Checkbox>
        </Section>
      )}

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label={
            <React.Fragment>
              数字格式
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          data-test="Chart.DataLabels.NumberFormat"
          defaultValue={options.numberFormat}
          onChange={(e: any) => debouncedOnOptionsChange({ numberFormat: e.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label={
            <React.Fragment>
              百分比格式
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          data-test="Chart.DataLabels.PercentFormat"
          defaultValue={options.percentFormat}
          onChange={(e: any) => debouncedOnOptionsChange({ percentFormat: e.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label={
            <React.Fragment>
              日期时间格式
              <ContextHelp.DateTimeFormatSpecs />
            </React.Fragment>
          }
          data-test="Chart.DataLabels.DateTimeFormat"
          defaultValue={options.dateTimeFormat}
          onChange={(e: any) => debouncedOnOptionsChange({ dateTimeFormat: e.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label={
            <React.Fragment>
              标注格式
              {/* @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message */}
              <ContextHelp placement="topRight" arrowPointAtCenter>
                <div style={{ paddingBottom: 5 }}>Use special names to access additional properties:</div>
                <div>
                  <code>{"{{ @@name }}"}</code> series name;
                </div>
                <div>
                  <code>{"{{ @@x }}"}</code> x-value;
                </div>
                <div>
                  <code>{"{{ @@y }}"}</code> y-value;
                </div>
                <div>
                  <code>{"{{ @@yPercent }}"}</code> relative y-value;
                </div>
                <div>
                  <code>{"{{ @@yError }}"}</code> y deviation;
                </div>
                <div>
                  <code>{"{{ @@size }}"}</code> bubble size;
                </div>
                <div style={{ paddingTop: 5 }}>
                  所有查询结果列都可关联使用
                  <br />
                  using
                  <code style={{ whiteSpace: "nowrap" }}>{"{{ column_name }}"}</code> syntax.
                </div>
              </ContextHelp>
            </React.Fragment>
          }
          data-test="Chart.DataLabels.TextFormat"
          placeholder="(auto)"
          defaultValue={options.textFormat}
          onChange={(e: any) => debouncedOnOptionsChange({ textFormat: e.target.value })}
        />
      </Section>
    </React.Fragment>
  );
}

DataLabelsSettings.propTypes = EditorPropTypes;
