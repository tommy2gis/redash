import { uniqueId } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import Alert from "antd/lib/alert";
import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox";
import Form from "antd/lib/form";
import InputNumber from "antd/lib/input-number";
import Modal from "antd/lib/modal";
import { wrap as wrapDialog, DialogPropType } from "@/components/DialogWrapper";
import { clientConfig } from "@/services/auth";
import CodeBlock from "@/components/CodeBlock";

import "./EmbedQueryDialog.less";

class EmbedQueryDialog extends React.Component {
  static propTypes = {
    dialog: DialogPropType.isRequired,
    query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    visualization: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    enableChangeIframeSize: false,
    iframeWidth: 720,
    iframeHeight: 391,
  };

  constructor(props) {
    super(props);
    const { query, visualization } = props;
    this.embedUrl = `${clientConfig.basePath}embed/query/${query.id}/visualization/${visualization.id}?api_key=${
      query.api_key
    }&${query.getParameters().toUrlParams()}`;

    if (window.snapshotUrlBuilder) {
      this.snapshotUrl = window.snapshotUrlBuilder(query, visualization);
    }
  }

  urlEmbedLabelId = uniqueId("url-embed-label");
  iframeEmbedLabelId = uniqueId("iframe-embed-label");

  render() {
    const { query, dialog } = this.props;
    const { enableChangeIframeSize, iframeWidth, iframeHeight } = this.state;

    return (
      <Modal
        {...dialog.props}
        className="embed-query-dialog"
        title="嵌入查询"
        footer={<Button onClick={dialog.dismiss}>关闭</Button>}>
        {query.is_safe ? (
          <React.Fragment>
            <h5 id={this.urlEmbedLabelId} className="m-t-0">
              公开的连接URL
            </h5>
            <div className="m-b-30">
              <CodeBlock aria-labelledby={this.urlEmbedLabelId} data-test="EmbedIframe" copyable>
                {this.embedUrl}
              </CodeBlock>
            </div>
            <h5 id={this.iframeEmbedLabelId} className="m-t-0">
              IFrame嵌入
            </h5>
            <div>
              <CodeBlock aria-labelledby={this.iframeEmbedLabelId} copyable>
                {`<iframe src="${this.embedUrl}" width="${iframeWidth}" height="${iframeHeight}"></iframe>`}
              </CodeBlock>
              <Form className="m-t-10" layout="inline">
                <Form.Item>
                  <Checkbox
                    checked={enableChangeIframeSize}
                    onChange={e => this.setState({ enableChangeIframeSize: e.target.checked })}
                  />
                </Form.Item>
                <Form.Item label="Width">
                  <InputNumber
                    className="size-input"
                    value={iframeWidth}
                    onChange={value => this.setState({ iframeWidth: value })}
                    size="small"
                    disabled={!enableChangeIframeSize}
                  />
                </Form.Item>
                <Form.Item label="Height">
                  <InputNumber
                    className="size-input"
                    value={iframeHeight}
                    onChange={value => this.setState({ iframeHeight: value })}
                    size="small"
                    disabled={!enableChangeIframeSize}
                  />
                </Form.Item>
              </Form>
            </div>
            {this.snapshotUrl && (
              <React.Fragment>
                <h5>嵌入图片</h5>
                <CodeBlock copyable>{this.snapshotUrl}</CodeBlock>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <Alert
            message="不能嵌入带有文本型参数的查询！"
            type="error"
            data-test="EmbedErrorAlert"
          />
        )}
      </Modal>
    );
  }
}

export default wrapDialog(EmbedQueryDialog);
