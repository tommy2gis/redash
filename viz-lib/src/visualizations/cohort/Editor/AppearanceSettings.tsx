import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, Checkbox, ContextHelp } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";

export default function AppearanceSettings({ options, onOptionsChange }: any) {
  const [debouncedOnOptionsChange] = useDebouncedCallback(onOptionsChange, 200);

  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label="时间标题"
          defaultValue={options.timeColumnTitle}
          onChange={(e: any) => debouncedOnOptionsChange({ timeColumnTitle: e.target.value })}
        />
      </Section>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label="统计值标题"
          defaultValue={options.peopleColumnTitle}
          onChange={(e: any) => debouncedOnOptionsChange({ peopleColumnTitle: e.target.value })}
        />
      </Section>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={
            <React.Fragment>
              层级标题格式
              <ContextHelp placement="topRight" arrowPointAtCenter>
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message */}
                <div>
                  Use <code>{"{{ @ }}"}</code> to insert a stage number
                </div>
              </ContextHelp>
            </React.Fragment>
          }
          defaultValue={options.stageColumnTitle}
          onChange={(e: any) => debouncedOnOptionsChange({ stageColumnTitle: e.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={
            <React.Fragment>
              数字格式
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          defaultValue={options.numberFormat}
          onChange={(e: any) => debouncedOnOptionsChange({ numberFormat: e.target.value })}
        />
      </Section>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={
            <React.Fragment>
              百分比格式
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          defaultValue={options.percentFormat}
          onChange={(e: any) => debouncedOnOptionsChange({ percentFormat: e.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label="无值提示符"
          defaultValue={options.noValuePlaceholder}
          onChange={(e: any) => debouncedOnOptionsChange({ noValuePlaceholder: e.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          defaultChecked={options.showTooltips}
          onChange={event => onOptionsChange({ showTooltips: event.target.checked })}>
          显示提示信息
        </Checkbox>
      </Section>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          defaultChecked={options.percentValues}
          onChange={event => onOptionsChange({ percentValues: event.target.checked })}>
          转换为百分比
        </Checkbox>
      </Section>
    </React.Fragment>
  );
}

AppearanceSettings.propTypes = EditorPropTypes;
