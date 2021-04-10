import { extend, trim } from "lodash";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, Checkbox, ContextHelp } from "@/components/visualizations/editor";
import { formatSimpleTemplate } from "@/lib/value-format";

type Props = {
  column: {
    name: string;
    linkUrlTemplate?: string;
    linkTextTemplate?: string;
    linkTitleTemplate?: string;
    linkOpenInNewTab?: boolean;
  };
  onChange: (...args: any[]) => any;
};

function Editor({ column, onChange }: Props) {
  const [onChangeDebounced] = useDebouncedCallback(onChange, 200);

  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label="URL模板"
          data-test="Table.ColumnEditor.Link.UrlTemplate"
          defaultValue={column.linkUrlTemplate}
          onChange={(event: any) => onChangeDebounced({ linkUrlTemplate: event.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label="文本模板"
          data-test="Table.ColumnEditor.Link.TextTemplate"
          defaultValue={column.linkTextTemplate}
          onChange={(event: any) => onChangeDebounced({ linkTextTemplate: event.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label="标题模板"
          data-test="Table.ColumnEditor.Link.TitleTemplate"
          defaultValue={column.linkTitleTemplate}
          onChange={(event: any) => onChangeDebounced({ linkTitleTemplate: event.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          data-test="Table.ColumnEditor.Link.OpenInNewTab"
          checked={column.linkOpenInNewTab}
          onChange={event => onChange({ linkOpenInNewTab: event.target.checked })}>
          在新标签页打开
        </Checkbox>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message */}
        <ContextHelp
          placement="topLeft"
          arrowPointAtCenter
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
          icon={<span style={{ cursor: "default" }}>Format specs {ContextHelp.defaultIcon}</span>}>
          <div>
          所有列都可以关联使用，请按 <code>{"{{ column_name }}"}</code> 表达形式。.
          </div>
          <div>
          使用 <code>{"{{ @ }}"}</code> 关联当前列。
          </div>
          <div>该表达形式也适用于URL、文本和标题设置。</div>
        </ContextHelp>
      </Section>
    </React.Fragment>
  );
}

export default function initLinkColumn(column: any) {
  function prepareData(row: any) {
    row = extend({ "@": row[column.name] }, row);

    const href = trim(formatSimpleTemplate(column.linkUrlTemplate, row));
    if (href === "") {
      return {};
    }

    const title = trim(formatSimpleTemplate(column.linkTitleTemplate, row));
    const text = trim(formatSimpleTemplate(column.linkTextTemplate, row));

    const result = {
      href,
      text: text !== "" ? text : href,
    };

    if (title !== "") {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ href: s... Remove this comment to see the full error message
      result.title = title;
    }
    if (column.linkOpenInNewTab) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type '{ href: ... Remove this comment to see the full error message
      result.target = "_blank";
    }

    return result;
  }

  function LinkColumn({ row }: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{}'.
    // eslint-disable-line react/prop-types
    const { text, ...props } = prepareData(row);
    return <a {...props}>{text}</a>;
  }

  LinkColumn.prepareData = prepareData;

  return LinkColumn;
}

initLinkColumn.friendlyName = "链接";
initLinkColumn.Editor = Editor;
