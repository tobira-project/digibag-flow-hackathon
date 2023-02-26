import TabContainer from "./tabContainer/TabContainer"

/**
 * 主にバッグの持つグッズを一覧表示するコンテナ
 * @returns 
 */
const BagDetailContainer = () => {
  return <>
    <div className="h-full bg-gray-300 rounded-t-[30px]">
      <TabContainer
        contents={[
          {
            id: 0,
            tabTitle: 'Contents',
            tabContent: <></>
          },
          {
            id: 1,
            tabTitle: 'Attachments',
            tabContent: <></>
          },
          {
            id: 2,
            tabTitle: 'Other',
            tabContent: <></>
          }
        ]}
      />
    </div>
  </>
}

export default BagDetailContainer