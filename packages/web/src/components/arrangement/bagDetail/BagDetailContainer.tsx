import AttachmentsTab from "./tabContainer/attachmentsTab/AttachmentsTab";
import ContentsTab from "./tabContainer/contentsTab/ContentsTab";
import TabContainer from "./tabContainer/TabContainer";

/**
 * 主にバッグの持つグッズを一覧表示するコンテナ
 * @returns
 */
const BagDetailContainer = () => {
  return (
    <>
      <div className="h-full rounded-t-[30px] glass-white">
        <TabContainer
          contents={[
            {
              id: 0,
              tabTitle: "Contents",
              tabContent: (
                <ContentsTab />
              ),
            },
            {
              id: 1,
              tabTitle: "Attachments",
              tabContent: (
                <AttachmentsTab />
              ),
            },
            {
              id: 2,
              tabTitle: "Other",
              tabContent: <></>,
            },
          ]}
        />
      </div>
    </>
  );
};

export default BagDetailContainer;
