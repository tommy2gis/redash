import React from "react";
import Link from "@/components/Link";
import { clientConfig, currentUser } from "@/services/auth";
import frontendVersion from "@/version.json";

export default function VersionInfo() {
  return (
    <React.Fragment>
      <div>
        版本: {clientConfig.version}
        {frontendVersion !== clientConfig.version && ` (${frontendVersion.substring(0, 8)})`}
      </div>
      {clientConfig.newVersionAvailable && currentUser.hasPermission("super_admin") && (
        <div className="m-t-10">
          {/* eslint-disable react/jsx-no-target-blank */}
          <Link href="https://version.redash.io/" className="update-available" target="_blank" rel="noopener">
            Update Available
            <i className="fa fa-external-link m-l-5" />
          </Link>
        </div>
      )}
    </React.Fragment>
  );
}