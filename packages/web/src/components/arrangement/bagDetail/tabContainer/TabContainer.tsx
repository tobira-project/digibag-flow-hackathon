import { ReactNode, useState } from "react";
import TabTitle from "./TabTitle";

type Props = {
  contents: {
    id: number;
    tabTitle: string;
    tabContent: ReactNode;
  }[]
}

/**
 * バッグ詳細画面。引数contentsに要素を追加することで、
 * タブで一覧する内容を切り替えられるコンテナ。
 * @param param0 
 * @returns 
 */
const TabContainer = ({ contents }: Props) => {
  const [selectedTabId, setSelectedTabId] = useState<number>(0)

  const handleTabClick = (tabId: number) => {
    setSelectedTabId(tabId);
  }

  return <>
    <div className="h-full flex flex-col overflow-hidden">
      <div className="">
        <div className="flex mx-6">
          {contents.map(v => <>
            <TabTitle title={v.tabTitle} tabId={v.id} onClick={handleTabClick} isSelected={v.id === selectedTabId} />
          </>)}
        </div>
      </div>
      <div className="grow">
        {contents[selectedTabId].tabContent}
      </div>
    </div>
  </>
}

export default TabContainer