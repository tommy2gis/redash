import * as React from "react";
import * as PropTypes from "prop-types";
import Button from "antd/lib/button";
import BigMessage from "@/components/BigMessage";
import NoTaggedObjectsFound from "@/components/NoTaggedObjectsFound";
import EmptyState, { EmptyStateHelpMessage } from "@/components/empty-state/EmptyState";
import DynamicComponent from "@/components/DynamicComponent";
import CreateDashboardDialog from "@/components/dashboards/CreateDashboardDialog";
import { currentUser } from "@/services/auth";
import HelpTrigger from "@/components/HelpTrigger";

export interface DashboardListEmptyStateProps {
  page: string;
  searchTerm: string;
  selectedTags: string[];
}

export default function DashboardListEmptyState({ page, searchTerm, selectedTags }: DashboardListEmptyStateProps) {
  if (searchTerm !== "") {
    return <BigMessage message="没有查询到任何记录。" icon="fa-search" />;
  }
  if (selectedTags.length > 0) {
    return <NoTaggedObjectsFound objectType="dashboards" tags={selectedTags} />;
  }
  switch (page) {
    case "favorites":
      return <BigMessage message="显示我关注的报表。" icon="fa-star" />;
    case "my":
      const my_msg = currentUser.hasPermission("create_dashboard") ? (
        <span>
          <Button type="primary" size="small" onClick={() => CreateDashboardDialog.showModal()}>
            创建第一张报表
          </Button>{" "}
          <HelpTrigger className="f-14" type="DASHBOARDS" showTooltip={false}>
            需要帮助?
          </HelpTrigger>
        </span>
      ) : (
        <span>没有内容。</span>
      );
      return <BigMessage icon="fa-search">{my_msg}</BigMessage>;
    default:
      return (
        <DynamicComponent name="DashboardList.EmptyState">
          <EmptyState
            icon="zmdi zmdi-view-quilt"
            description="看见大数据"
            illustration="dashboard"
            helpMessage={<EmptyStateHelpMessage helpTriggerType="DASHBOARDS" />}
            showDashboardStep
          />
        </DynamicComponent>
      );
  }
}

DashboardListEmptyState.propTypes = {
  page: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  selectedTags: PropTypes.array.isRequired,
};
