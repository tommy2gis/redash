/**
 * @Author: shitao
 * @Date: 2021-12-30 19:50:37
 * @LastEditTime: 2022-01-05 17:11:08
 * @LastEditors: shitao
 * @Description: 
 * @FilePath: \redash_cn\client\app\components\dashboards\dashboard-widget\TextboxWidget.jsx
 * @无锡四维时空信息科技有限公司
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import MarkdownIt from 'markdown-it';
import Menu from "antd/lib/menu";
import HtmlContent from "@redash/viz/lib/components/HtmlContent";
import TextboxDialog from "@/components/dashboards/TextboxEditorDialog";
import Widget from "./Widget";
const mdParser = new MarkdownIt();
function TextboxWidget(props) {
  const { widget, canEdit } = props;
  const [text, setText] = useState(widget.text);
  const [options, setOptions] = useState(widget.options);
  const editTextBox = () => {
    TextboxDialog.showModal({
      text: widget.text,
      options:widget.options
    }).onClose(data => {
      widget.text = data.text;
      widget.options = data.options;
      setText(data.text);
      setOptions(data.options)
      return widget.save("options",data.options);
    });
  };

  const TextboxMenuOptions = [
    <Menu.Item key="edit" onClick={editTextBox}>
      编辑
    </Menu.Item>,
  ];

  if (!widget.width) {
    return null;
  }

  return (
    <Widget {...props} menuOptions={canEdit ? TextboxMenuOptions : null} className={`widget-text ${options.bkTransparent?"background_transparent":""}`}>
      <HtmlContent className="body-row-auto scrollbox t-body p-15 custom-html-style markdown">{mdParser.render(text||"")}</HtmlContent>
    </Widget>
  );
}

TextboxWidget.propTypes = {
  widget: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  canEdit: PropTypes.bool,
};

TextboxWidget.defaultProps = {
  canEdit: false,
};

export default TextboxWidget;
