import React from "react";
import PropTypes from "prop-types";
import WarningTwoTone from "@ant-design/icons/WarningTwoTone";
import TimeAgo from "@/components/TimeAgo";
import Tooltip from "@/components/Tooltip";
import useAddToDashboardDialog from "../hooks/useAddToDashboardDialog";
import useEmbedDialog from "../hooks/useEmbedDialog";
import QueryControlDropdown from "@/components/EditVisualizationButton/QueryControlDropdown";
import EditVisualizationButton from "@/components/EditVisualizationButton";
import useQueryResultData from "@/lib/useQueryResultData";
import { durationHumanize, pluralize, prettySize } from "@/lib/utils";

import "./QueryExecutionMetadata.less";

export default function QueryExecutionMetadata({
  query,
  queryResult,
  isQueryExecuting,
  selectedVisualization,
  showEditVisualizationButton,
  onEditVisualization,
  extraActions,
}) {
  const queryResultData = useQueryResultData(queryResult);
  const openAddToDashboardDialog = useAddToDashboardDialog(query);
  const openEmbedDialog = useEmbedDialog(query);
  return (
    <div className="query-execution-metadata">
      <span className="m-r-5">
        <QueryControlDropdown
          query={query}
          queryResult={queryResult}
          queryExecuting={isQueryExecuting}
          showEmbedDialog={openEmbedDialog}
          embed={false}
          apiKey={query.api_key}
          selectedTab={selectedVisualization}
          openAddToDashboardForm={openAddToDashboardDialog}
        />
      </span>
      {extraActions}
      {showEditVisualizationButton && (
        <EditVisualizationButton openVisualizationEditor={onEditVisualization} selectedTab={selectedVisualization} />
      )}
      <span className="m-l-5 m-r-10">
        <span>
          {queryResultData.truncated === true && (
            <span className="m-r-5">
              <Tooltip
                title={
                  "Result truncated to " +
                  queryResultData.rows.length +
                  " 条记录。当查询结果集超大时，Redash将会截断查询结果集。"
                }>
                <WarningTwoTone twoToneColor="#FF9800" />
              </Tooltip>
            </span>
          )}
          <strong>{queryResultData.rows.length}</strong> {pluralize("row", queryResultData.rows.length)}
        </span>
        <span className="m-l-5">
          {!isQueryExecuting && (
            <React.Fragment>
              <strong>{durationHumanize(queryResultData.runtime)}</strong>
              <span className="hidden-xs"> 耗时</span>
            </React.Fragment>
          )}
          {isQueryExecuting && <span>运行中&hellip;</span>}
        </span>
        {queryResultData.metadata.data_scanned && (
          <span className="m-l-5">
            Data Scanned
            <strong>{prettySize(queryResultData.metadata.data_scanned)}</strong>
          </span>
        )}
      </span>
      <div>
        <span className="m-r-10">
          <span className="hidden-xs">刷新时间：</span>
          <strong>
            <TimeAgo date={queryResultData.retrievedAt} placeholder="-" />
          </strong>
        </span>
      </div>
    </div>
  );
}

QueryExecutionMetadata.propTypes = {
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  queryResult: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isQueryExecuting: PropTypes.bool,
  selectedVisualization: PropTypes.number,
  showEditVisualizationButton: PropTypes.bool,
  onEditVisualization: PropTypes.func,
  extraActions: PropTypes.node,
};

QueryExecutionMetadata.defaultProps = {
  isQueryExecuting: false,
  selectedVisualization: null,
  showEditVisualizationButton: false,
  onEditVisualization: () => {},
  extraActions: null,
};
