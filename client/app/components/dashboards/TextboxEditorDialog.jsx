/**
 * @Author: shitao
 * @Date: 2022-01-05 11:19:05
 * @LastEditTime: 2022-01-05 17:09:17
 * @LastEditors: shitao
 * @Description: 
 * @FilePath: \redash_cn\client\app\components\dashboards\TextboxEditorDialog.jsx
 * @无锡四维时空信息科技有限公司
 */
import { DialogPropType, wrap as wrapDialog } from "@/components/DialogWrapper";
import Link from "@/components/Link";
import Tooltip from "@/components/Tooltip";
import notification from "@/services/notification";
import Modal from "antd/lib/modal";
import Checkbox from "antd/lib/checkbox";
import { toString } from "lodash";
import MarkdownIt from 'markdown-it';
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import MdEditor from 'react-markdown-editor-lite';
// import style manually 
import 'react-markdown-editor-lite/lib/index.css';
import "./TextboxDialog.less";


function TextboxDialog({ dialog, isNew, ...props }) {
  const [text, setText] = useState(toString(props.text));
  const [options, setOptions] = useState(props.options)

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

  const handleEditorChange = useCallback(
    ({ text }) => {
      setText(text);
    },
    []
  );


  const handleOptionsChange = useCallback(
    e => {
      setOptions({...options,bkTransparent:e.target.checked});
    },
    [options]
  );


  const saveWidget = useCallback(() => {
    dialog.close({text,options}).catch(() => {
      notification.error(isNew ? "部件将不会新增。" : "部件将不会保存。");
    });
  }, [dialog, isNew,options,text]);

  const confirmDialogDismiss = useCallback(() => {
    const originalText = props.text;
    if (text !== originalText) {
      Modal.confirm({
        title: "退出编辑?",
        content: "更改内容将不会保存，确定退出吗?",
        okText: "不保存退出",
        cancelText: "取消",
        okType: "danger",
        onOk: () => dialog.dismiss(),
        maskClosable: true,
        autoFocusButton: null,
        style: { top: 170 },
      });
    } else {
      dialog.dismiss();
    }
  }, [dialog, text, props.text]);

  const mdParser = new MarkdownIt();

  return (
    <Modal
      {...dialog.props}
      title={isNew ? "新增文本" : "编辑文本"}
      onOk={saveWidget}
      okText={isNew ? "添加至报表" : "保存"}
      cancelText="取消"
      onCancel={confirmDialogDismiss}
      width={'calc(100% - 300px)'}
      wrapProps={{ "data-test": "TextboxDialog" }}>
      <div className="textbox-dialog">
        <MdEditor style={{ height: '500px' }} value={text} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
        <Checkbox  checked={options.bkTransparent}  onChange={handleOptionsChange}>背景透明</Checkbox>
        <small>
          支持基本的{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.markdownguide.org/cheat-sheet/#basic-syntax">
            <Tooltip title="在新窗口打开Markdown标记指南">Markdown标记(英文)</Tooltip>
          </Link>
          ；
          <Link target="_blank" rel="noopener noreferrer" href="https://www.runoob.com/markdown/md-tutorial.html">
            <Tooltip title="在新窗口打开Markdown菜鸟教程">Markdown菜鸟教程(中文)</Tooltip>
          </Link>
          。
        </small>
      </div>
    </Modal>
  );
}

TextboxDialog.propTypes = {
  dialog: DialogPropType.isRequired,
  isNew: PropTypes.bool,
  text: PropTypes.string,
};

TextboxDialog.defaultProps = {
  isNew: false,
  text: "",
};

export default wrapDialog(TextboxDialog);
